const kafka=require('kafka-node')
const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
const Producer = kafka.Producer
let producer = new Producer(client);
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
 
producer.createTopics(['ready'], false, function (err, data) {
    console.log(data);
});
producer.on('ready', function () {
        readline.question("msg: ",(msg)=>{
                payloads = [
                    { topic: 'log', messages: msg, partition: 0 }
                ];
                producer.send(payloads, function (err, data) {
                    console.log("delivered: ",data);
                });  
          })
});

producer.on('error', function (err) {
    console.log(err)
})
