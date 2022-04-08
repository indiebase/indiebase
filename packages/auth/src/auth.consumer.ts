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
    this.ctx.channel.ack(msg);
  }
}
