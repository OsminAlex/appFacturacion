const { Router } = require("express");
const productsController = require('../controllers/productsController');

const productsRouter = Router();

productsRouter.get("/",productsController.getProducts);

productsRouter.get("/:productId",productsController.getProduct);

productsRouter.post("/",productsController.postProduct);

module.exports = productsRouter;