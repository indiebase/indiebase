import {
  BadRequestException,
  ConflictException,
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

  async queryOrg(body: QueryOrgDto) {
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

  async getGithubOrgs() {
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

  async getGithubOrg(name: string) {
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

  async getOwnOrgs(id: number) {
    // this.orgRepo.findAndCount({ where: { ownerId: id }, relations: [] });

    return {
      code: ResultCode.SUCCESS,
    };
  }

  async createOrg(body: CreateOrgDto, id: number) {
    const {
      name,
      description,
      contactEmail,
      domain,
      homepage,
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
      homepage,
      ownerId: id,
      creatorId: id,
    });

    const user = await this.userService.repo.findOne({
      where: { id },
      relations: ['organizations'],
    });

    orgEntity.members = [user];

    await this.orgRepo.save(orgEntity).catch((err) => {
      this.logger.error(err);
      if (err?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(`Org [${body.name}] existed`);
      }
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Create organization failed',
      });
    });
  }

  async updateOrg(body: UpdateOrgDto) {
    const { id, ...rest } = body;
    this.orgRepo.remove;
    await this.orgRepo.update({ id }, rest).catch((err) => {
      this.logger.error(err);
      if (err?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(`Organization [${body.name}] existed`);
      }
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Create',
      });
    });

    return { code: ResultCode.SUCCESS, message: '更新成功' };
  }

  async deleteOrg(body: DeleteOrgDto) {
    const { id } = body;
    await this.orgRepo.delete({ id }).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: '删除失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '删除成功' };
  }
}

// INSERT INTO `organization`(`id`, `name`, `github_org_name`, `domain`, `contact_email`, `status`, `description`, `homepage`, `create_time`, `update_time`, `creator_id`, `owner_id`) VALUES (DEFAULT, 'deskbtm', 'deskbtm', 'deskbtm.com', 'deskbtm@outlook.com', DEFAULT, 'xxxxxx', 'https://letscollab.deskbtm.com', DEFAULT, DEFAULT, 4, 4)
