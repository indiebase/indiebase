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
@Scope(ScopeEnum.Singleton) // Singleton 单例，全局唯一（进程级别）
export class AuthRabbitMQService {
  private connection: amqp.AmqpConnectionManager;

  private channelWrapper;

  @Init()
  async connect() {
    console.log('demodmeomo');
    this.connection = await amqp.connect('amqp://0.0.0.0:13340');

    console.log(this.connection.isConnected());

    this.channelWrapper = this.connection.createChannel({
      json: true,
      setup: function (channel) {
        return Promise.all([
          // 绑定队列
          channel.assertQueue('tasks', { durable: true }),
        ]);
      },
    });
  }

  // 发送消息
  public async sendToQueue(queueName: string, data: any) {
    return this.channelWrapper.sendToQueue(queueName, data);
  }

  @Destroy()
  async close() {
    await this.channelWrapper.close();
    await this.connection.close();
  }
}
