import express from 'express'
import { fileURLToPath } from 'url';
import path from 'path'
import ejs from 'ejs'
import api_routes from './routes/api_routes.js';
import web_page_routes from './routes/web_routes.js';
import cookieParser from 'cookie-parser';
// WTF DOES THIS DO?
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default class Server {
    constructor() {
        this.app = express();
        this.app.engine('.html', ejs.__express);
        // wtf does this do?
        this.app.use(express.static(path.join(__dirname, 'views')));
        this.app.use(express.urlencoded({ extended: true }), express.json());
        this.app.use(cookieParser());
        this.app.use("/", web_page_routes);
        this.app.use("/api", api_routes);
    };
    start(port, hostname) {
        this.app.listen(port, hostname, function() {
        console.log(`Server running at http://${hostname}:${port}/`);
        });
    };
};

const myServer = new Server();

myServer.start(5000, "127.0.0.1");
