import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: 'nestjs-client',
      brokers: [this.configService.get<string>('KAFKA_BROKER')],
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(topic: string, messages: any[]) {
    console.log('Producing messages:', messages);
    await this.producer.send({
      topic,
      messages: messages.map(message => ({ value: JSON.stringify(message) })),
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}