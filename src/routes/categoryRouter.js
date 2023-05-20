const { Router } = require("express");
const categoriesController = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.get("/",categoriesController.getCategories);

categoriesRouter.get("/:categoryId",categoriesController.getCategory);

categoriesRouter.post("/",categoriesController.postCategory);


module.exports = categoriesRouter;