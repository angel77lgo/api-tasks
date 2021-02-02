import express,{Application} from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
import * as fs from "fs";
const yaml = require('js-yaml')
import cors from 'cors';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = yaml.load(fs.readFileSync('swagger.yaml','utf-8'))
require('dotenv').config()

class Server {
    public app: Application
    public host = process.env.DB_HOST;
    public database = process.env.DB_NAME

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    }

    routes(): void{
        this.app.use('/api', routes)
    }

    start(): void{
        this.app.listen(this.app.get("port"), () => {
            console.log("Server run on http://localhost:" + this.app.get('port'))
        })
        mongoose.connect(`mongodb://${this.host}/${this.database}`,
            {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
        ).then(() => {
            console.log("Mongo Connected")
        }).catch(err => {
            console.log(err)
        })
    }
}


const server = new Server();
server.start();
