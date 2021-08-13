"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const database = {
    connect: common_1.connectMongoDb,
    init: common_1.init
};
exports.default = database;
//# sourceMappingURL=index.js.map