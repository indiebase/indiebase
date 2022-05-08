import {
  QuickPickItem,
  Uri,
  window,
  workspace,
  ConfigurationTarget,
  FileType,
} from 'vscode';
import { getWorkspaces, WorkspaceInfo } from '@deskbtm/workspace-tools';
import {
  randomColorPair,
  getExtensionConfig,
  getExtensionCwd,
  matchEmoji,
} from '../utils';
import { CollectionItem } from '../interface';
import * as path from 'path';

type WorkspaceItem = WorkspaceInfo extends (infer T)[] ? T : [];

interface ModuleItem extends QuickPickItem, WorkspaceItem {
  isRootWorkspace: boolean;
  relative: string;
  uri: Uri;
  packageName?: string;
  directoryAsWorkspace?: boolean;
}

interface GetAllPackagesOptions {
  cwd?: string;
  includeRoot?: boolean;
}

export const uri2ModuleItem = function (
  uri: Uri,
  pkgMap?: Map<string, ModuleItem>,
): ModuleItem | undefined {
  if (!pkgMap) {
    pkgMap = getAllPackages().packagesMap;
  }

  return pkgMap.get(uri.fsPath);
};

export const collection2Modules = function (
  collection: CollectionItem[],
  pkgMap?: Map<string, ModuleItem>,
): ModuleItem[] {
  if (!pkgMap) {
    pkgMap = getAllPackages().packagesMap;
  }

  const modules: ModuleItem[] = [];

  for (const c of collection) {
    const p = uri2ModuleItem(Uri.file(c.path), pkgMap);
    if (p) {
      modules.push(p);
    }
  }

  return modules;
};

export const getAllPackages = function (options: GetAllPackagesOptions = {}) {
  let {
    cwd = getExtensionCwd(),
    includeRoot = getExtensionConfig().get<boolean>('includeRoot') ?? true,
  } = options;

  let allPackages: ModuleItem[] = [];
  const packagesMap = new Map<string, ModuleItem>();

  if (cwd) {
    let packages = getWorkspaces(cwd, { includeRoot });

    for (const pkg of packages) {
      const isRootWorkspace = cwd === pkg.path;
      const relative = path.relative(cwd, pkg.path);
      const desc = pkg.packageJson['description'];
      const label = `${matchEmoji(relative, isRootWorkspace)} ${pkg.name}`;

      const item = {
        label,
        description: `${relative} ${desc ? ' | ' + desc : ''}`,
        uri: Uri.file(pkg.path),
        relative,
        packageName: pkg.name,
        isRootWorkspace,
        ...pkg,
        name: label,
      };

      allPackages.push(item);

      packagesMap.set(pkg.path, item);
    }
  }

  return { packagesMap, allPackages };
};

const add2DurableCollection = function (
  p: ModuleItem,
  collection: CollectionItem[],
) {
  let { foreground, background } = randomColorPair();

  collection.push({
    path: p.path,
    packageName: p.packageName,
    label: p.label,
    directoryAsWorkspace: p.directoryAsWorkspace,
    foreground,
    background,
  });
};

export const syncFolders2Durable = async function () {
  const config = getExtensionConfig('ColorfulMonorepo.workspaces');
  let collection: CollectionItem[] = [];
  const { packagesMap } = getAllPackages();

  const folders = workspace.workspaceFolders;
  if (folders) {
    for (const f of folders) {
      const p = uri2ModuleItem(f.uri, packagesMap);
      !!p && add2DurableCollection(p, collection);
    }
  }

  await config.update('collection', collection, ConfigurationTarget.Workspace);
};

export const updateWorkspace = async function (packages: ModuleItem[] = []) {
  const config = getExtensionConfig('ColorfulMonorepo.workspaces');
  const rollback = config.get('collection');

  const folders = workspace.workspaceFolders;
  const collection: CollectionItem[] = [];
  for (const p of packages) {
    add2DurableCollection(p, collection);
  }

  // due to DrawerProvider will refresh TreeView before config update,
  // So need to update first.
  await config.update('collection', collection, ConfigurationTarget.Workspace);

  const r = workspace.updateWorkspaceFolders(0, folders?.length, ...packages);

  // fail will rollback
  if (!r) {
    await config.update('collection', rollback, ConfigurationTarget.Workspace);
  }
};

export const selectWorkspacePackages = async function () {
  const { allPackages, packagesMap } = getAllPackages();
  const config = getExtensionConfig('ColorfulMonorepo.workspaces');
  let collection = (config.get('collection') as CollectionItem[]) ?? [];

  const folders = workspace.workspaceFolders;
  const directoryWorkspaceCollection = [];

  for (const c of collection) {
    c.directoryAsWorkspace && directoryWorkspaceCollection.push(c);
  }

  if (folders) {
    start: for (const f of folders) {
      for (const p of allPackages) {
        if (p.path === f.uri.fsPath) {
          p.picked = true;
          continue start;
        }
      }
    }
  }

  const picked = await window.showQuickPick<ModuleItem>(allPackages, {
    canPickMany: true,
    matchOnDescription: true,
  });
  const m = collection2Modules(directoryWorkspaceCollection, packagesMap);

  picked?.length && updateWorkspace(picked.concat(m));
};

export const directoryAsWorkspace = async function (_: any, items: Uri[]) {
  const { packagesMap } = getAllPackages();
  const cwd = getExtensionCwd();
  if (!cwd) {
    return;
  }
  let m: ModuleItem[] = [];

  const config = getExtensionConfig('ColorfulMonorepo.workspaces');
  let collection = (config.get('collection') as CollectionItem[]) ?? [];

  for await (const item of items) {
    const stat = await workspace.fs.stat(item);
    if (packagesMap.get(item.fsPath)) {
      window.showWarningMessage(
        `Can't add node project ${item.fsPath} as workspace`,
      );
      continue;
    }

    if (stat.type === FileType.Directory) {
      const mi = uri2ModuleItem(item);
      if (mi) {
        m.push({ ...mi, ...{ directoryAsWorkspace: true } });
      }
    }
  }

  const m2 = collection2Modules(collection, packagesMap);

  return updateWorkspace(m2.concat(m));
};

export const removeWorkspace = async function (_: any, items: Uri[]) {
  for (const item of items) {
    // const c = convertUri2CollectionItem(item);
  }
};

import {
  QuickPickItem,
  Uri,
  window,
  workspace,
  ConfigurationTarget,
  FileType,
} from 'vscode';
import { getWorkspaces, WorkspaceInfo } from '@deskbtm/workspace-tools';
import {
  randomColorPair,
  getExtensionConfig,
  getExtensionCwd,
  matchEmoji,
} from '../utils';
import { CollectionItem } from '../interface';
import * as path from 'path';

type WorkspaceItem = WorkspaceInfo extends (infer T)[] ? T : [];

interface ModuleItem extends QuickPickItem, WorkspaceItem {
  isRootWorkspace: boolean;
  relative: string;
  uri: Uri;
  packageName?: string;
  directoryAsWorkspace?: boolean;
}

interface GetAllPackagesOptions {
  cwd?: string;
  includeRoot?: boolean;
}

export const collection2Module = function (collection: CollectionItem[]) {
  const pkg: ModuleItem[] = [];
  const cwd = getExtensionCwd();
  for (const c of collection) {
    const isRootWorkspace = cwd === c.path;
    const relative = path.relative(cwd!, c.path);
    pkg.push({
      ...c,
      name: c.label,
      uri: Uri.file(c.path),
      relative,
      isRootWorkspace,
      packageJson: {} as any,
    });
  }
  return pkg;
};

export const uri2CollectionItem = function (
  uri: Uri,
  fallback?: any,
): ModuleItem {
  const cwd = getExtensionCwd();
  return {
    label: path.basename(uri.fsPath),
    uri: uri,
    isRootWorkspace: false,
    relative: path.relative(cwd!, uri.fsPath),
    packageName: path.basename(uri.fsPath),
    name: path.basename(uri.fsPath),
    path: uri.fsPath,
    packageJson: {} as any,
    ...fallback,
  };
};

export const getAllPackages = function (options: GetAllPackagesOptions = {}) {
  let {
    cwd = getExtensionCwd(),
    includeRoot = getExtensionConfig().get<boolean>('includeRoot') ?? true,
  } = options;

  let allPackages: ModuleItem[] = [];
  const packagesMap = new Map<string, ModuleItem>();

  if (cwd) {
    let packages = getWorkspaces(cwd, { includeRoot });

    for (const pkg of packages) {
      const isRootWorkspace = cwd === pkg.path;
      const relative = path.relative(cwd, pkg.path);
      const desc = pkg.packageJson['description'];
      const label = `${matchEmoji(relative, isRootWorkspace)} ${pkg.name}`;

      const item = {
        label,
        description: `${relative} ${desc ? ' | ' + desc : ''}`,
        uri: Uri.file(pkg.path),
        relative,
        packageName: pkg.name,
        isRootWorkspace,
        ...pkg,
        name: label,
      };

      allPackages.push(item);

      packagesMap.set(pkg.path, item);
    }
  }

  return { packagesMap, allPackages };
};

const createDurableCollection = function (
  p: ModuleItem,
  collection: CollectionItem[],
) {
  let { foreground, background } = randomColorPair();

  collection.push({
    path: p.path,
    packageName: p.packageName,
    label: p.label,
    directoryAsWorkspace: p.directoryAsWorkspace,
    foreground,
    background,
  });
};

export const syncFolders2Durable = async function () {
  const config = getExtensionConfig('ColorfulMonorepo.workspaces');
  let collection: CollectionItem[] = [];
  const { packagesMap } = getAllPackages();

  const folders = workspace.workspaceFolders;
  if (folders) {
    for (const f of folders) {
      const p = packagesMap.get(f.uri.fsPath);
      const c = uri2CollectionItem(f.uri, p);
      createDurableCollection(c, collection);
    }
  }

  await config.update('collection', collection, ConfigurationTarget.Workspace);
};

export const updateWorkspace = async function (packages: ModuleItem[] = []) {
  const config = getExtensionConfig('ColorfulMonorepo.workspaces');
  const rollback = config.get('collection');

  const folders = workspace.workspaceFolders;
  const durableWorkspaceConfigs: CollectionItem[] = [];
  for (const p of packages) {
    createDurableCollection(p, durableWorkspaceConfigs);
  }

  // due to DrawerProvider will refresh TreeView before config update,
  // So need to update first.
  await config.update(
    'collection',
    durableWorkspaceConfigs,
    ConfigurationTarget.Workspace,
  );

  const r = workspace.updateWorkspaceFolders(0, folders?.length, ...packages);

  // fail will rollback
  if (!r) {
    await config.update('collection', rollback, ConfigurationTarget.Workspace);
  }
};

export const selectWorkspacePackages = async function () {
  const { allPackages } = getAllPackages();
  const config = getExtensionConfig('ColorfulMonorepo.workspaces');
  let collection = (config.get('collection') as CollectionItem[]) ?? [];

  const folders = workspace.workspaceFolders;
  const dirCollection = [];

  for (const c of collection) {
    c.directoryAsWorkspace && dirCollection.push(c);
  }

  if (folders) {
    start: for (const f of folders) {
      for (const p of allPackages) {
        if (p.path === f.uri.fsPath) {
          p.picked = true;
          continue start;
        }
      }
    }
  }

  const picked = await window.showQuickPick<ModuleItem>(allPackages, {
    canPickMany: true,
    matchOnDescription: true,
  });
  const c1 = collection2Module(dirCollection);

  picked?.length && updateWorkspace(picked.concat(c1));
};

export const directoryAsWorkspace = async function (_: any, items: Uri[]) {
  const { packagesMap } = getAllPackages();
  const cwd = getExtensionCwd();
  if (!cwd) {
    return;
  }
  let pkg: ModuleItem[] = [];
  const config = getExtensionConfig('ColorfulMonorepo.workspaces');
  let collection = (config.get('collection') as CollectionItem[]) ?? [];
  for await (const item of items) {
    const stat = await workspace.fs.stat(item);
    if (packagesMap.get(item.fsPath)) {
      window.showWarningMessage(
        `Can't add node project ${item.fsPath} as workspace`,
      );
      continue;
    }

    if (stat.type === FileType.Directory) {
      pkg.push(uri2CollectionItem(item, { directoryAsWorkspace: true }));
    }
  }

  const pkg2 = collection2Module(collection);

  return updateWorkspace(pkg2.concat(pkg));
};

export const removeWorkspace = async function (_: any, items: Uri[]) {
  for (const item of items) {
    const c = uri2CollectionItem(item);
  }
};
