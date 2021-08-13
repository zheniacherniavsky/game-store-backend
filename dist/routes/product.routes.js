"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const ProductRouter = (router, service) => {
    router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield service.GetProducts();
            res.status(200).send(products);
        }
        catch (err) {
            res.status(500).send("Error getting products");
        }
    }));
};
exports.ProductRouter = ProductRouter;
//# sourceMappingURL=product.routes.js.map