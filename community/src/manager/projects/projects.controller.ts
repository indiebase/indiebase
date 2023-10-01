import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';

@Controller({
  path: 'mgr/:org/projects',
  version: '1',
})
@ApiTags('Organizations/v1')
export class ProjectsController {
  constructor (private readonly projectsService: ProjectsService) { }
  
}
