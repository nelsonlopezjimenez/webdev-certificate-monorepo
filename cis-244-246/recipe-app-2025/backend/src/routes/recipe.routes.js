import express from 'express';
import recipeCtrl from '../controllers/recipe.controller.js';


const router = express.Router();

router.route('/recipe')
    .get(recipeCtrl.getRecipeList)
    .post(recipeCtrl.createRecipe)

router.route('/recipe/:recipeId')
    .get(recipeCtrl.read)
    .put(recipeCtrl.update)
    .delete(recipeCtrl.remove)

router.route('/recipeLoad')
    .get(recipeCtrl.populateRecipe)
        
router.param('recipeId', recipeCtrl.getRecipeById);

export default router;