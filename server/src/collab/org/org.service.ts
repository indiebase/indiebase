import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateOrgDto,
  DeleteOrgDto,
  QueryOrgDto,
  UpdateOrgDto,
} from './org.dto';
import { ResultCode } from '@letscollab-nest/helper';
import { OrgEntity } from './org.entity';
import { Repository } from 'typeorm';
import { OctokitService } from '@letscollab-nest/octokit';
import { UserService } from '../../user/user.service';

@Injectable()
export class OrgService {
  constructor(
    @InjectRepository(OrgEntity)
    private readonly orgRepo: Repository<OrgEntity>,
    private readonly logger: Logger,
    private readonly octokit: OctokitService,
    private readonly userService: UserService,
  ) {}

  public get repo() {
    return this.orgRepo;
  }

  public async queryOrg(body: QueryOrgDto) {
    body = Object.assign({}, body);
    const { name, current, pageSize } = body;
    let cond = [];
    name && cond.push({ name });

    if (cond.length === 0) {
      cond = null;
    }

    const [list, total] = await this.orgRepo.findAndCount({
      where: cond,
      relations: ['members'],
      take: pageSize,
      skip: (current - 1) * pageSize,
    });

    return {
      code: ResultCode.SUCCESS,
      pageSize,
      total,
      current,
      d: list,
    };
  }

  /**
   *  Get own organization from github.
   * @returns
   */
  public async getGithubOwnOrgs() {
    let { data } = await this.octokit.rest.orgs
      .listForAuthenticatedUser({
        page: 1,
        per_page: 999,
      })
      .catch((err) => {
        this.logger.error(err);

        if (err.status === 401) {
          throw new UnauthorizedException('Github bad credentials');
        }

        throw new BadRequestException();
      });

    return data;
  }

  public async getGithubOrg(name: string) {
    let { data } = await this.octokit.rest.orgs
      .get({ org: name })
      .catch((err) => {
        this.logger.error(err);

        if (err.status === 401) {
          throw new UnauthorizedException('Github bad credentials');
        }

        throw new BadRequestException();
      });

    return data;
  }

  public async getGithubMembers(name: string) {
    let { data } = await this.octokit.rest.orgs
      .get({ org: name })
      .catch((err) => {
        this.logger.error(err);

        if (err.status === 401) {
          throw new UnauthorizedException('Github bad credentials');
        }

        throw new BadRequestException();
      });

    return data;
  }

  public async createOrg(body: CreateOrgDto, id: number) {
    const {
      name,
      description,
      contactEmail,
      domain,
      githubOrgName,
      avatarUrl,
    } = body;

    const orgEntity = this.orgRepo.create({
      avatarUrl,
      name,
      contactEmail,
      description,
      githubOrgName,
      domain,
      ownerId: id,
      creatorId: id,
      githubOrgUrl: this.octokit.extend.orgUrl(name).href,
    });

    const user = await this.userService.repo.findOne({
      where: { id },
      relations: ['organizations'],
    });

    orgEntity.members = [user];

    await this.orgRepo.save(orgEntity).catch((err) => {
      this.logger.error(err);

      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Create organization failed',
      });
    });
  }

  public async updateOrg(body: UpdateOrgDto) {
    const { id, ...rest } = body;
    this.orgRepo.remove;
    await this.orgRepo.update({ id }, rest).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Create',
      });
    });

    return { code: ResultCode.SUCCESS, message: '更新成功' };
  }

  public async deleteOrg(body: DeleteOrgDto) {
    const { id } = body;
    await this.orgRepo.delete({ id }).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Delete failed',
      });
    });
  }
}
