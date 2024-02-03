const express = require('express')
const multer = require('multer')
const app = express()

const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/Plain' });
        res.write('This is home page')
        res.end();
    }else if(req.url == '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("This is a about page");
        res.end();
    }else if(req.url == '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write("This is a contact page");
        res.end();
    }else if(req.url == '/file-write') {
        fs.writeFile('./demo.text','Hello, this is demo text file.', function(error){
          if(error){
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("File write fail!");
            res.end();
          }else{
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("File write successful....");
            res.end();
          }
        })
    }  
}).listen(5500);
console.log('Listening on port 5500');

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "./uploads");
  },
  filename: (req, file, cb)=>{
    cb(null,file.originalname);
  },
});
const upload = multer({storage:storage});
app.post("/upload", upload.single("file"),(req,res)=>{
   res.json({message: "File Upload Success"});
});
app.listen(5550, ()=>{
  console.log("Server Running")
})