// 消息訂閱這個是對外的端口

const client = require('./client');

client.publish('First_Publish',"New Value");