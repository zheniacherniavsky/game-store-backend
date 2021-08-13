"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.Product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class Product {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Product.prototype, "displayName", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Product.prototype, "categoryIds", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Product.prototype, "totalRating", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
exports.Product = Product;
exports.ProductModel = typegoose_1.getModelForClass(Product);
//# sourceMappingURL=product.js.map