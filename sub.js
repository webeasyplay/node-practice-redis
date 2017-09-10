// 消息中介的訂閱端

const client = require('./client');

client.subscribe("First_Publish");

client.on('message',(channel,msg)=>{
    console.log(channel,msg);

})