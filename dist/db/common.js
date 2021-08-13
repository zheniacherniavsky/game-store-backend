"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDb = exports.init = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_1 = require("../DA/models/category");
const product_1 = require("../DA/models/product");
const dbLog = (operation, msg) => console.log(`MongoDB [${operation}]: ${msg}`);
const init = () => {
    category_1.CategoryModel.find().then((categories) => {
        if (categories.length === 0) {
            dbLog('Initialization', 'No categories found, creating default categories with products...');
            const shooter = new category_1.CategoryModel({ displayName: 'Shooter' });
            const arcade = new category_1.CategoryModel({ displayName: 'Arcade' });
            const board = new category_1.CategoryModel({ displayName: 'Board' });
            shooter.save();
            arcade.save();
            board.save();
            new product_1.ProductModel({
                displayName: 'Battlefield 4',
                categoryIds: [shooter._id, arcade._id],
                createdAt: new Date(),
                totalRating: 8,
                price: 29,
            }).save();
            new product_1.ProductModel({
                displayName: 'Chess',
                categoryIds: [board._id],
                createdAt: new Date(),
                totalRating: 8,
                price: 0,
            }).save();
            dbLog('Initialization', 'Data initialized!');
        }
    });
};
exports.init = init;
const connectMongoDb = () => {
    mongoose_1.default.connect('mongodb://localhost:27017/itechart', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        dbLog('Connection', 'Connected to MongoDB');
    });
};
exports.connectMongoDb = connectMongoDb;
//# sourceMappingURL=common.js.map