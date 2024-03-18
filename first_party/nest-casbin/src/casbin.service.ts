import type {
  OnModuleDestroy,
  OnModuleInit} from '@nestjs/common';
import {
  Inject,
  Injectable
} from '@nestjs/common';
import type { Enforcer} from 'casbin';
import { newEnforcer } from 'casbin';

import { CASBIN_OPTIONS } from './casbin.constants';
import type { CasbinOptions } from './casbin.interface';

@Injectable()
export class CasbinService implements OnModuleInit, OnModuleDestroy {
  #enforcer: Enforcer;

  constructor(
    @Inject(CASBIN_OPTIONS)
    private readonly options?: CasbinOptions,
  ) {}

  async onModuleInit() {
    const adapter =
      this.options.adapter === 'string'
        ? this.options.adapter
        : await this.options.adapter;

    this.#enforcer = await newEnforcer(this.options.model, adapter);
  }

  async onModuleDestroy() {
    this.#enforcer = null;
  }

  public get e() {
    return this.#enforcer;
  }
}
