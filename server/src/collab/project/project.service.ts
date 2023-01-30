import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProjectDto,
  DeleteProjectDto,
  QueryProjectDto,
  UpdateProjectDto,
} from './project.dto';
import { Repository } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { ResultCode } from '@letscollab-nest/helper';
import { OctokitService } from '@letscollab-nest/octokit';
import { OrgService } from '../org/org.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    private readonly octokit: OctokitService,
    private readonly orgService: OrgService,
    private readonly logger: Logger,
  ) {}

  async createProject(body: CreateProjectDto, id: number) {
    const {
      name,
      githubRepoName,
      orgName,
      contactEmail,
      packageName,
      description,
    } = body;

    const org = await this.orgService.repo.findOne({
      where: {
        name: orgName,
      },
    });

    const prefix = org.domain.split('').reverse().join('');

    const projectEntity = this.projectRepo.create({
      name,
      githubRepoName,
      githubRepoUrl: this.octokit.extend.repoUrl(orgName, name).href,
      contactEmail,
      packageName: packageName ?? `${prefix}.${name}`,
      description,
      ownerId: id,
      creatorId: id,
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

  async queryProject(body: QueryProjectDto) {
    body = Object.assign({}, body);
    const { name, current, pageSize } = body;
    let cond = [];
    name && cond.push({ name });

    if (cond.length === 0) {
      cond = null;
    }

    const [list, total] = await this.projectRepo.findAndCount({
      where: cond,
      // relations: ['members'],
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

  async updateProject(body: UpdateProjectDto) {
    const { id, ...rest } = body;
    this.projectRepo.remove;

    await this.projectRepo.update({ id }, rest).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
      });
    });
  }

  async deleteProject(body: DeleteProjectDto) {
    const { id } = body;
    await this.projectRepo.delete({ id }).catch((err) => {
      this.logger.error(err);

      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: 'Delete failed',
      });
    });
  }
}
