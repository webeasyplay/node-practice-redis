/*
    集合和列表的差別在於，集合內的東西部可重複

*/

const client = require('./client');
// 在集合裡面加入element，setAdd的意思
client.sadd('First_set_Add','a');
client.sadd('First_set_Add','b');
client.sadd('First_set_Add','b');
client.sadd('First_set_Add','c');

// 獲取set 裡面的所有元素
client.smembers('First_set_Add',(err,replies)=>{
    if(err){
        console.log(err);
        return ;
    }
    console.dir(replies);

});
client.quit();