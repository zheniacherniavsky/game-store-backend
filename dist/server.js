"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const DA_1 = require("./DA");
const product_routes_1 = require("./routes/product.routes");
const service_1 = require("./service");
const app = express_1.default();
const port = 3000;
db_1.default.connect();
const router = express_1.default.Router();
app.use('/', router);
product_routes_1.ProductRouter(router, new service_1.ProductService(new DA_1.ProductDA));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    db_1.default.init();
});
//# sourceMappingURL=server.js.map