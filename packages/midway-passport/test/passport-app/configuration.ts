import { Configuration, Controller } from '@midwayjs/decorator';
import { join } from 'path';
import * as passport from '../../';

@Controller('/test')
class Test {}

@Configuration({
  imports: [passport],
  importConfigs: [join(__dirname, './config')],
})
export class PassportAppConfiguration {
  async onReady(container) {}
}
