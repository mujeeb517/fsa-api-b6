// REST Api
// client - server 
// http
// URL, GET, headers, body
// server is a software
// listens to requests
// port: 80, 443
// events, timers, api calls, db, file
// MERN: MongoDb, Express, React, Node 
// Java -> Spring boot
// C# -> .Net core
// Python -> Django
// Node -> express
const http = require('http');
const fs = require('fs');

function handler(req, res) {
    switch (req.url) {
        case '/':
            const contents = fs.readFileSync('index.html');
            res.write(contents);
            break;
        case '/products':
            const products = [
                { id: 1, brand: 'Apple', price: 1000 },
                { id: 2, brand: 'Samsung', price: 1200 },
                { id: 3, brand: 'Google', price: 800 }
            ];
            res.write(JSON.stringify(products));
            break;
        case '/books':
            res.write('books');
            break;
        default:
            res.write('Hello Nodejs');
    }
    res.end();
}

const server = http.createServer(handler);

server.listen(3000, () => console.log('server is running'));
