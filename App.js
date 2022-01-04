const http = require("http");
const fs = require('fs');

// membuat server
const server = http.createServer((req, res) => {
    // console.log(req); //Menampilkan request
    // process.exit(); // Menghentikan proses tepat setelah console log


    /*
        ============================
        |    SENDING THE RESPONSE  |
        ============================

        res.setHeader("Content-Type", "text/html"); res.write("<html>");
        res.write("<head><title>My First Page</title></head>"); res.write("<body><h1>Hello From Node.js Server!</h1></body>"); res.write("</html>");
        res.end();
    */

    /*
        ============================
        |   ROUTING THE REQUEST    |
        ============================
        const url = req.url;
     
        if (url === "/") {
            res.setHeader("Content-Type", "text/html"); res.write("<html>"); 
            res.write("<head><title>Server</title></head>"); 
            res.write('<body><form action="/message" method="POST"><input type="text" value=""></form></body>');
            res.write("</html>"); return res.end();
        } 
        else if (url === "/secondserver") { 
            res.setHeader("Content-Type", "text/html"); 
            res.write("<html>");
            res.write("<head><title>Server Page second</title></head>"); 
            res.write("<body><h2>Welcome to the Internet</h2></body>"); 
            res.write("</html>");
            res.end();
        }
        
        res.setHeader("Content-Type", "text/html"); res.write("<html>");
        res.write("<head><title>Server Page second</title></head>"); 
        res.write("<body><h2>Welcome to the Internet</h2></body>"); 
        res.write("</html>");
        res.end();
    */

    /* 
    =================================
    |   Parsing the request bodies  |
    =================================
    */

    const url = req.url;
    const method = req.method; if (url === "/") {
        res.write("<html>"); res.write("<head><title>Server</title></head>"); 
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" value=""></form></body>');
        res.write("</html>"); return res.end();
    }

    if (url === "/message" && method === "POST") 
    { 
        const body = [];
        req.on("data", (chunk) => { 
            console.log(chunk); 
            body.push(chunk);
        });
        req.on("end", () => {
            const parseBody = Buffer.concat(body).toString(); 
            const message = parseBody.split("=")[1]; 
            fs.writeFileSync("testing.txt", message);
        });
        res.statusCode = 302;
        res.setHeader("Location", "/"); 
        return res.end();
    }
    res.setHeader("Content-Type", "text/html"); 
    res.write("<html>");
    res.write("<head><title>Server Page second</title></head>"); 
    res.write("<body><h2>Welcome to the Internet</h2></body>"); 
    res.write("</html>");
    res.end();
});

// Menjalankan server dengan port yang diinginkan
server.listen('3000');