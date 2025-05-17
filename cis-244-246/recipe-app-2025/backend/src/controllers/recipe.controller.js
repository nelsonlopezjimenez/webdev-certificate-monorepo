//  users.controller
import Recipe from '../models/recipe.model.js';
import errorHandler from '../helpers/dbErrorHandler.js'


const createRecipe = async (req, res) => {
    const oneRecipe = new Recipe (req.body); 
    try {
        await oneRecipe.save();
        return res.status(200).json({oneRecipe})
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
            // message: err
        });
    }
};
// curl -d "key=value&key=value2" -X POST URL
// curl -d "name=value&email=value2&password=val3" -X POST URL
// curl -d "name=naranja&email=naranje@col.edu&password=1234" -X POST URL
// curl https://reqbin.com/echo/get/json -H "Accept: application/json"
// -H "Authorization: Bearer {token}"

const getRecipeList = async (req, res) => {
    try {
        let recipeList = await Recipe.find();
        res.json(recipeList);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const getRecipeById = async (req, res, next, id) => {
    try {
        let oneRecipe = await Recipe.findById(id)
        if (!oneRecipe){
            return res.status('400').json({
                error: "Recipe not found"
            })
        }
        req.profile = oneRecipe;
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve one recipe"
        })
    }
};
function cl (m, i) {
    console.log(m, i)
}
const update11 = async (req, res) => {
    try {
        let user = req.profile; 
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save();
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err + " ##### 66")
        })
    }
}
// const updateSpreadSyntax = async (req, res) => {
const update = async (req, res) => {
    try {
        let user = req.profile; 
        let filter = {_id: user._id}
        const update = {...req.body};
        await User.findOneAndUpdate(filter, update)
        user.updated = Date.now();
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err + " ##### 66")
        })
    }
}
const remove = async (req, res) => {
    try {
        let user = req.profile;
        // let deletedUser = await user.remove() // original and deprecated FAILED
        // let deletedUser = await user.deleteOne({_id: user._id}) // INSTANCE  OK
        let deletedUser = await User.findOneAndDelete({_id: user._id}) //MODEL OK
        res.status(201).json(deletedUser)
    } catch (err) {
        cl("89 ", err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const read =  (req, res) => {
    return res.json(req.profile)
}

// Database Seeding
const recipeArr = [
    {
        title: "Spaghetti",
        instruction: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
        ingredient: ["pasta", "8 cups water", "1 box spaghetti"],
        img: "spaghetti.jpg"
    },
    {
      title: "Milkshake",
      instruction: "Combine ice cream and milk.  Blend until creamy",
      ingredient: ["2 Scoops Ice cream", "8 ounces milk"],
      img: "milkshake.jpg"
    },
    {
      title: "Avocado Toast",
      instruction: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
      ingredient: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
      img: "avocado_toast.jpg"
    }
]


const populateRecipe = async (req, res) => {
    let recipe3 = {
        title: "Avocado Toast",
        instruction: "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
        ingredient: ["2 slices of bread", "1 avocado", "1 tablespoon olive oil", "1 pinch of salt", "pepper"],
        img: "avocado_toast.jpg"
    };
    let newRecipe3 = new Recipe(recipe3);
    let recipe2 = {
        title: "Milkshake",
        instruction: "Combine ice cream and milk.  Blend until creamy",
        ingredient: ["2 Scoops Ice cream", "8 ounces milk"],
        img: "milkshake.jpg"
    }
    let newRecipe2 = new Recipe(recipe2);
    let recipe1 =  {
        title: "Spaghetti",
        instruction: "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
        ingredient: ["pasta", "8 cups water", "1 box spaghetti"],
        img: "spaghetti.jpg"
    }
    let newRecipe1 = new Recipe (recipe1)
    await Recipe.create(newRecipe1);
    await Recipe.create(newRecipe2);
    await Recipe.create(newRecipe3);
// ======================== empty objects, not adding to mongoDb
    // const data = recipeArr.map(async item => {
    //     let newItem = new Recipe(item);
    //     await Recipe.create(newItem)
    // })
    // res.json(data);
    res.json(recipeArr)
};
export default {
    createRecipe,
    getRecipeList,
    update,
    remove,
    getRecipeById,
    read,
    populateRecipe,
}


// https://stackoverflow.com/questions/46995522/findoneandupdate-is-not-a-function
// The solution is to run functions on a model, not on a instance of it. So instead of:

// var NewUser = new User(req.user);
// NewUser.findOneAndUpdate...
// Do:

// User.findOneAndUpdate...