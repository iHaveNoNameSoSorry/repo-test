const http = require('http');
const db = require('./db');


(async () =>  
{
    let data = await db.select();
    console.log(data);

})();

console.log("Inserting log...");
const log = 
{
    data: "Starting database application",
    timestamp: new Date()
};


(async () => 
{
    await db.insert(log);
    console.log("retrieving db...");
    let data = await db.select();
    console.log(data);

})();

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, () => {
  console.log(`Server running at ${port}.`);
});
