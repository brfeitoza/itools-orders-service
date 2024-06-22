import { Consumer, Kafka, Message, Producer } from 'kafkajs';

class KafkaConfig {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'itools-kafka',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'itools-group' });
  }

  async produce(topic: string, messages: Message[]) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic,
        messages,
      });
    } catch (err) {
      console.error(`Error producing messages: ${err}`);
    } finally {
      await this.producer.disconnect();
    }
  }

  async consume(topic: string, callback: (value: string) => void) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic, fromBeginning: true });
      await this.consumer.run({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value.toString();
          callback(value);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default KafkaConfig;
