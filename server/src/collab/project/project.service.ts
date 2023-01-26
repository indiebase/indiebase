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

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,

    private readonly logger: Logger,
  ) {}

  async createProject(body: CreateProjectDto, id: number) {
    const {} = body;
    const prjEntity = this.projectRepo.create(body);
    await this.projectRepo.save(prjEntity).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
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
        message: err?.code === 'ER_DUP_ENTRY' ? '项目已存在' : '创建失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }

  async deleteProject(body: DeleteProjectDto) {
    const { id } = body;
    await this.projectRepo.delete({ id }).catch((err) => {
      this.logger.error(err);
      throw new InternalServerErrorException({
        code: ResultCode.ERROR,
        message: '删除失败',
      });
    });

    return { code: ResultCode.SUCCESS, message: '创建成功' };
  }
}
