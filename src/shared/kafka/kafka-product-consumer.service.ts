import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaProductConsumerService
  implements OnModuleInit, OnModuleDestroy
{
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(private readonly configService: ConfigService) {
    this.kafka = new Kafka({
      clientId: 'nestjs-product-client',
      brokers: [this.configService.get<string>('KAFKA_BROKER')],
    });

    this.consumer = this.kafka.consumer({ groupId: 'nestjs-product-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'GetProduct',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        // console.log({ topic, value: message.value.toString() });
        // const productData = JSON.parse(message.value.toString());
        try {
          const response = await axios.get(
            `http://localhost:${process.env.PORT || 3001}/books/kafka/public-books`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log('GetProduct:', {
            topic,
            value: response.toString(),
          });
        } catch (error) {
          console.error(
            'Error creating product:',
            error.response ? error.response.data : error.message,
          );
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
