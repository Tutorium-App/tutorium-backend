const Category = require('../models/category.model');

class CategoriesServices {
    // Function to load category data based on school and category type
    static async load(school, categoryType) {
        try {
            const categoryData = await Category.find({ school: school, categoryType: categoryType });
            return categoryData.length > 0 ? categoryData : null;
        } catch (error) {
            console.error('Error fetching category data:', error);
            throw error;  // Allow the controller to handle the error
        }
    }
}

module.exports = CategoriesServices;
