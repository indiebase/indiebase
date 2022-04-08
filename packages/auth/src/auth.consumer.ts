import {
  Consumer,
  MSListenerType,
  RabbitMQListener,
  Inject,
  App,
} from '@midwayjs/decorator';
import { Context, Application } from '@midwayjs/rabbitmq';
import { ConsumeMessage } from 'amqplib';

@Consumer(MSListenerType.RABBITMQ)
export class AuthConsumer {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Inject()
  logger;

  @RabbitMQListener('tasks')
  async gotData(msg: ConsumeMessage) {
    console.log(msg.content.toString());
    this.ctx.channel.ack(msg);
  }

  // @RabbitMQListener('abc', {
  //   exchange: 'logs',
  //   exchangeOptions: {
  //     type: 'fanout',
  //     durable: false,
  //   },
  //   exclusive: true,
  //   consumeOptions: {
  //     noAck: true,
  //   },
  // })
  // async gotData(msg: ConsumeMessage) {
  //   this.logger.info('test output1 =>', msg.content.toString('utf8'));
  // }

  // @RabbitMQListener('bcd', {
  //   exchange: 'logs',
  //   exchangeOptions: {
  //     type: 'fanout',
  //     durable: false,
  //   },
  //   exclusive: true,
  //   consumeOptions: {
  //     noAck: true,
  //   },
  // })
  // async gotData2(msg: ConsumeMessage) {
  //   this.logger.info('test output2 =>', msg.content.toString('utf8'));
  // }
}
