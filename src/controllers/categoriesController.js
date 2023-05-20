const Category = require("../models/Category");

const getCategories = async (req, res) => {
    //await Category.sync();
  
    const categories = await Category.findAll();
  
    res.json(categories);
};

const getCategory = async (req,res)=>{
    
  
    const { categoryId } = req.params;
  
    try {
      const category = await Category.findByPk(categoryId);
  
      if (category==null){
        res.status(404).json({ message: "Category not found" });    
        return;
      }
        
  
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });    
    }
    
  }
  
  const postCategory = async (req, res) => {
    const newCategory = req.body;
  
    if (newCategory.categoryName == undefined) {
      res.status(500).json({ message: "categoryName is required!" });
      return;
    }   
  
    try {   
  
      const createdCategory = await Category.create(newCategory);
  
      res.status(201).json(createdCategory);
    } catch (error) {
      res.status(500).json({ message: `Error: ${error.message}` });
    }
  };

  module.exports = {
    getCategories,
    getCategory,
    postCategory
  }