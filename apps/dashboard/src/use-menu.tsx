import { IconFileCode, IconSettings } from '@tabler/icons-react';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { navMenuAtom } from './components/DashboardLayout';

export const useMenu = () => {
  const { org, project, user } = useParams();
  // const [{ d: profile }] = useAtom(userProfileQueryAtom[0]);
  const { t, i18n } = useTranslation(['common', 'setting']);
  const location = useLocation();

  const [menu, setMenu] = useAtom(navMenuAtom);

  useEffect(() => {
    let prefix;

    if (org) {
      prefix = ['orgs', org, project].filter(Boolean).join('/');
    } else {
      // prefix = ['users', user ?? profile.username, project]
      //   .filter(Boolean)
      //   .join('/');
    }

    // // Project
    // if (project) {
    //   setMenu([
    //     {
    //       label: t('Preference'),
    //       icon: <IconSettings size={16} />,
    //       color: 'violet',
    //       type: 'node',
    //       children: [
    //         {
    //           label: t('General'),
    //           to: `${prefix}/settings/general`,
    //         },
    //         {
    //           label: t('Access'),
    //           to: `${prefix}/settings/access`,
    //         },
    //       ],
    //     },
    //   ]);
    // }

    // // Organization
    // if (org) {
    //   setMenu([
    //     {
    //       label: t('Project'),
    //       icon: <IconFileCode size={16} />,
    //       color: 'blue',
    //       to: prefix,
    //     },
    //     {
    //       label: t('Preference'),
    //       icon: <IconSettings size={16} />,
    //       color: 'violet',
    //       type: 'node',
    //       children: [
    //         {
    //           label: t('General'),
    //           to: `${prefix}/settings/general`,
    //         },
    //         {
    //           label: t('Member'),
    //           to: `${prefix}/settings/member`,
    //         },
    //         {
    //           label: t('Access'),
    //           to: `${prefix}/settings/access`,
    //         },
    //       ],
    //     },
    //   ]);
    // }

    // // My
    // if (user || location.pathname === '/') {
    //   setMenu([
    //     {
    //       label: t('Preference'),
    //       icon: <IconSettings size={16} />,
    //       color: 'violet',
    //       type: 'node',
    //       children: [
    //         {
    //           label: t('Profile'),
    //           to: `${prefix}/settings/profile`,
    //         },
    //         {
    //           label: t('Organizations'),
    //           to: `${prefix}/settings/organizations`,
    //         },
    //         {
    //           label: t('Two-factor auth'),
    //           to: `${prefix}/settings/2fa`,
    //         },
    //       ],
    //     },
    //   ]);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org, project, user, i18n.language]);

  return menu;
};
