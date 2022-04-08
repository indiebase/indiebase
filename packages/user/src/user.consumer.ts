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
export class UserConsumer {
  @App()
  app: Application;

  @Inject()
  ctx: Context;

  @Inject()
  logger;

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
