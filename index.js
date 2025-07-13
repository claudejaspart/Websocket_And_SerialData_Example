import { WebSocketServer } from "ws";
import { SerialPort } from "serialport"; 
import { ReadlineParser } from '@serialport/parser-readline';
import express  from 'express';
import path  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory 

const app = express();
const PORT = 3000;

let client = null;
let portPath = "COM4"
const wss = new WebSocketServer({ port: 8080 });

// Websocket connection 
wss.on("connection",  ws => 
{
    client = ws;
    ws.send("Web socket opened");
});


// Open the serial port + parse the result buffer
var port = new SerialPort({ path: portPath, baudRate: 19200});
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

// Read the serial port data
port.on("open", () => 
{
    parser.on('data', data => 
    {
        if (client !== null)
            client.send(data);
    });
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(__dirname);
    console.log(`Server is running on http://localhost:${PORT}`);
});