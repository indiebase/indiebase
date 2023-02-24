import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProjectDto,
  QueryProjectsDto,
  UpdateProjectDto,
} from './project.dto';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { OctokitService } from '@letscollab-nest/octokit';
import { OrgService } from '../org/org.service';
import { ResultCode } from '@letscollab-nest/trait';
import { compatPackageName } from '@letscollab-nest/helper';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    private readonly octokit: OctokitService,
    private readonly logger: Logger,
    @Inject(forwardRef(() => OrgService))
    private readonly orgService: OrgService,
  ) {}

  async createProject(body: CreateProjectDto, id: number) {
    const {
      name,
      githubRepoName,
      orgName,
      contactEmail,
      packageName,
      description,
      pinned,
    } = body;

    const org = await this.orgService.repo.findOne({
      where: {
        name: orgName,
      },
    });

    const projectEntity = this.projectRepo.create({
      name,
      githubRepoName,
      githubRepoUrl: this.octokit.extend.repoUrl(orgName, name).href,
      contactEmail,
      packageName: packageName ?? compatPackageName(`${org.domain}.${name}`),
      description,
      ownerId: id,
      creatorId: id,
      orgName: org.name,
      pinned,
    });

    projectEntity.organization = org;

    await this.projectRepo.save(projectEntity).catch((err) => {
      this.logger.error(err);

      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Create project failed',
      });
    });
  }

  async queryProjects(
    body: QueryProjectsDto,
    relations: string[] = ['members'],
  ) {
    const { id, name, pageIndex, pageSize, orgName, sort, direction } = body;

    const [list, total] = await this.projectRepo
      .findAndCount({
        where: {
          id,
          name,
          orgName,
        },
        relations,
        take: pageSize,
        order: {
          [sort]: direction,
        },
        skip: (pageIndex - 1) * pageSize,
      })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException();
      });

    return {
      pageSize,
      total,
      pageIndex,
      d: list,
    };
  }

  public async searchGithubRepo(q: string) {
    let { data } = await this.octokit.rest.search
      .repos({
        q,
        sort: 'stars',
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

  async updateProject(body: UpdateProjectDto) {
    const { id, ...rest } = body;

    await this.projectRepo.update({ id }, rest).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
      });
    });
  }

  async deleteProject(name: string) {
    await this.projectRepo.delete({ name }).catch((err) => {
      this.logger.error(err);

      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Delete failed',
      });
    });
  }
}
