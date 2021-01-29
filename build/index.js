"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("./routes/routes"));
require('dotenv').config();
var Server = /** @class */ (function () {
    function Server() {
        this.host = process.env.DB_HOST;
        this.database = process.env.DB_NAME;
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(express_1.default.json());
    };
    Server.prototype.routes = function () {
        this.app.use('/api', routes_1.default);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get("port"), function () {
            console.log("Server run on http://localhost:" + _this.app.get('port'));
        });
        mongoose_1.default.connect("mongodb://" + this.host + "/" + this.database, { useNewUrlParser: true, useUnifiedTopology: true }).then(function () {
            console.log("Mongo Connected");
        }).catch(function (err) {
            console.log(err);
        });
    };
    return Server;
}());
var server = new Server();
server.start();
