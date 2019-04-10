const kafka=require('kafka-node')
const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
const Consumer = kafka.Consumer;
let    consumer = new Consumer(
        client,
        [
            { topic: 'log', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );

    consumer.on('message', function (message) {
        console.log(message.value);
    });