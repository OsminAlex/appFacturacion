const Products = require("../models/Product");

const getProducts = async (req, res) => {
  await Products.sync();

  const products = await Products.findAll();

  res.json(products);
};


const getProduct = async (req,res)=>{
  await Products.sync();

  const { productId } = req.params;

  try {
    const product = await Products.findByPk(productId);

    if (product==null){
      res.status(404).json({ message: "Product not found" });    
      return;
    }
      

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });    
  }
  
}

const postProduct = async (req, res) => {
  const newProduct = req.body;

  if (newProduct.productName == undefined) {
    res.status(500).json({ message: "productName is required!" });
    return;
  }

  if (newProduct.stock == undefined) {
    res.status(500).json({ message: "stock is required!" });
    return;
  }

  if (newProduct.stock < 0) {
    res.status(500).json({ message: "stock can't be negative" });
    return;
  }

  try {
    await Products.sync();

    const products = await Products.findAll({
      where: {
        productName: newProduct.productName,
      },
    });

    if (products.length > 0) {
      res.status(500).json({ message: "productName already exist" });
      return;
    }

    const createdProduct = await Products.create(newProduct);

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
    getProducts,
    getProduct,
    postProduct
}
