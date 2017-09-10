const redis = require('redis');
const bluebird = require('bluebird');
var client = require('./client');
client.on("error", function (err) {
    console.log("Error " + err);
});
// 設置Key,Value
client.set("It's Key","It's value",redis.print);
// 讀取Value
client.get("It's Key",redis.print);
// 設置一個HashSet 後面的參數都是以key,Value成對出現
client.hset("hash key", "hashtest 1", "some value", redis.print);
// 獲取這個hash下面所有的Key
client.hkeys("hash key",redis.print);
// 設置一個Hash，裡面有"hashtest 2", "some other value" 這個Key、Value
client.hset(["hash key2", "hashtest 2", "some other value"], redis.print);
// 獲取這個HashKey 下面的所有Key
client.hkeys("hash key2",redis.print)
//獲取這個HashKey 下面的資料，會回傳一個replies 可以遍歷他，裡面都是Key
client.hkeys("hash key", function (err, replies) {
    // 獲取這個replies長度
     console.log( " replies:"+replies.length );
     // 寫法一
     replies.forEach(function (reply, i) {
         console.log("    " + i + ": " + reply);
     });
     // 寫法二 支援break、continue 和 return
     for(let value of replies){
        console.log("   value is " + value);
     }
     //client.quit();
 });

 bluebird.promisifyAll(redis.RedisClient.prototype);
 bluebird.promisifyAll(redis.Multi.prototype);

 // 非同步的promise 要先安裝好bluebird
client.set("foo","bar",redis.print);
return client.getAsync('foo').then(function(res) {
    console.log(res); // => 'bar'
});

// 如果要使用多個promise 可以這樣做，client.multi代表執行一個事務

//client.multi（[命令）：這個標記一個事務的開始，由Multi.exec原子性的執行; 
//github上上描述是可以理解為打包，把要執行的命令存放在隊列中，redis的服務器會
//原子性的執行所有命令，node_redis接口返回一個多對象
return client.multi().get('foo').execAsync().then(function(res) {
    console.log(res); // => 'bar'
});


//  client.hgetall("hash key",(err,res)=>{
//     if(err){
//         console.log(err);
//         return ;
//     }
//     console.dir(res);

//  });