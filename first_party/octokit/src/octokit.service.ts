import { OCTOKIT_OPTIONS } from './octokit.constants';
import { Inject, Injectable } from '@nestjs/common';
import { OctokitOptions } from './octokit.interface';
import { Octokit } from 'octokit';

@Injectable()
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
    options?: OctokitOptions,
  ) {
    let TmpOctokit = Octokit;

    if (options.plugins) {
      TmpOctokit = Octokit.plugin(...options.plugins);
    }

    this.octokit = new TmpOctokit(options);

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
