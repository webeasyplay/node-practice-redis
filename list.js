const client = require('./client');
const redis = require('redis');

// 使用前先刪除
client.del('First_List');

client.rpush('First_List','a');
client.rpush('First_List','b');
client.rpush('First_List','c');
client.rpush('First_List',1);
client.lpush('First_List','Lpush_1');
client.lpush('First_List','Lpush_2');

client.lpop('First_List',(err,value)=>{
    if(err){
        console.log(err);
        return ;
    }
    console.log('lpop value is ' + value);

})
// 設置一個範圍，獲取這個list中的element，正從前面,負是後面 
client.lrange('First_List',0,-1,redis.print);
client.quit();
return;