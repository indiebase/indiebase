import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ACCESS_CONTROL_OPTIONS } from './access.constants';
import { AccessOptions } from './access.interface';
import { AccessControl } from 'accesscontrol';

@Injectable()
export class AccessService implements OnModuleInit, OnModuleDestroy {
  #accessMap = new Map<string, AccessControl>();

  constructor(
    @Inject(ACCESS_CONTROL_OPTIONS)
    private readonly options?: AccessOptions,
  ) {}

  async onModuleInit() {}

  async onModuleDestroy() {
    this.#accessMap.clear();
    this.#accessMap = null;
  }

  public setNamespace(name: string, model: any = []) {
    this.#accessMap.set(name, new AccessControl(model));
    return this.#accessMap.get(name);
  }

  public getNamespace(name: string) {
    return this.#accessMap.get(name);
  }
}
