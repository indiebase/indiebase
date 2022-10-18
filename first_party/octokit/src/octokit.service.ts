import { OCTOKIT_OPTIONS } from './octokit.constants';
import { HttpAdapterHost, Inject, Injectable, Scope } from '@nestjs/common';
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
    private readonly options: OctokitOptions,
    @Inject(REQUEST)
    private readonly req,
  ) {
    let InnerOctokit = Octokit;

    console.log(req);

    if (options.plugins) {
      InnerOctokit = Octokit.plugin(...options.plugins);
    }
    (options as any)?.demo();
    this.octokit = new InnerOctokit(options);

    this.request = this.octokit.request;
    this.graphql = this.octokit.graphql;
    this.log = this.octokit.log;
    this.hook = this.octokit.hook;
    this.auth = this.octokit.auth;
    this.paginate = this.octokit.paginate;
    this.rest = this.octokit.rest;
    this.retry = this.octokit.retry;
  }
}
