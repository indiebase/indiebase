import { OCTOKIT_OPTIONS } from './octokit.constants';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { OctokitOptions } from './octokit.interface';
import { Octokit } from 'octokit';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class OctokitService {
  public octokit: Octokit;
  public request: Octokit['request'];
  public graphql: Octokit['graphql'];
  public log: Octokit['log'];
  public hook: Octokit['hook'];
  public auth: Octokit['auth'];
  public paginate: Octokit['paginate'];
  public rest: Octokit['rest'];
  public retry: Octokit['retry'];

  constructor(
    @Inject(OCTOKIT_OPTIONS)
    private options: OctokitOptions,
    @Inject(REQUEST)
    private readonly req,
  ) {
    let InnerOctokit = Octokit;

    let config = options.optionsFactory(req);

    if (options.plugins) {
      InnerOctokit = Octokit.plugin(...options.plugins);
    }

    const octokit = new InnerOctokit(config);

    this.request = octokit.request;
    this.graphql = octokit.graphql;
    this.log = octokit.log;
    this.hook = octokit.hook;
    this.auth = octokit.auth;
    this.paginate = octokit.paginate;
    this.rest = octokit.rest;
    this.retry = octokit.retry;
  }
}
