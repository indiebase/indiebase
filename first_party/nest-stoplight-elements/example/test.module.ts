import { Controller, Get, Module } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist';

@Controller('/')
export class TestController {
  @Get('test')
  @ApiOperation({ summary: 'Test Stoplight' })
  test() {
    return 'Hello world!';
  }
}

@Module({
  controllers: [TestController],
})
export class TestModule {}
