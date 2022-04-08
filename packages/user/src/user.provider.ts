import { NacosConfig } from '@letscollab/midway-nacos';
import {
  Provide,
  Scope,
  ScopeEnum,
  Init,
  Autoload,
  Destroy,
} from '@midwayjs/decorator';
import * as amqp from 'amqp-connection-manager';

@Autoload()
@Provide()
@Scope(ScopeEnum.Singleton)
export class RabbitMQProvider {
  // @NacosConfig('service-user.json')
  // nacos

  private connection: amqp.AmqpConnectionManager;

  private channelWrapper;

  @Init()
  async connect() {
    this.connection = await amqp.connect('amqp://0.0.0.0:13340');

    console.log(this.connection.isConnected());

    this.channelWrapper = this.connection.createChannel({
      json: true,
      setup: function (channel) {
        return Promise.all([channel.assertQueue('tasks', { durable: true })]);
      },
    });
  }

  public async sendToQueue(queueName: string, data: any) {
    return this.channelWrapper.sendToQueue(queueName, data);
  }

  @Destroy()
  async close() {
    await this.channelWrapper.close();
    await this.connection.close();
  }
}
