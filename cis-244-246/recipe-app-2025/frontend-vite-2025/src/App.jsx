import { useState, useEffect, useLayoutEffect } from "react";
import * as apiCalls from './api.jsx';
import Form from './components/Form.jsx';
import List from './components/List.jsx';
import "./App.css";

// ------- recipeList array local recipeList stored
const recipeListObj = {
  recipeList: [
    {
      id: 0,
      title: "Spaghetti ###############",
      instruction:
        "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
      ingredient: ["pasta", "8 cups water", "1 box spaghetti"],
      img: "spaghetti.jpg",
    },
    {
      id: 1,
      title: "Milkshake",
      instruction: "Combine ice cream and milk.  Blend until creamy",
      ingredient: ["2 Scoops Ice cream", "8 ounces milk"],
      img: "milkshake.jpg",
    },
    {
      id: 2,
      title: "Avocado Toast",
      instruction:
        "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
      ingredient: [
        "2 slices of bread",
        "1 avocado",
        "1 tablespoon olive oil",
        "1 pinch of salt",
        "pepper",
      ],
      img: "avocado_toast.jpg",
    },
  ],
  nextRecipeId: 3,
};

recipeListObj.recipeList = [];


function App() {
  const [recipeListOb, setRecipeListOb] = useState(recipeListObj); // {a:"",id:#},{},{}
  const [recipeId, setRecipeId] = useState(recipeListObj.nextRecipeId);
  const [recipeList, setRecipeList] = useState(recipeListObj.recipeList)

  const loadRecipes = async () => {
    // const data = await apiCalls.getAllRecipes();
    try {
      const data = await apiCalls.getAllData();
      console.log(data); // [{},{},{},{}] from mongoDb
      setRecipeList([...recipeList, ...data]);
      setRecipeListOb({recipeList: [...recipeList, ...data], nextRecipeId: null})
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadRecipes();
    // console.log(recipes);// []
  }, []);

  const handleSave =  async (recipe) => {
    try {
      const newRecipe = { ...recipe, id: recipeId};
      console.log(newRecipe, recipeId);
      setRecipeId(prev => {
        return prev + 1;
      });
      const data = await apiCalls.createRecipe(newRecipe);
      if(data){console.log('NewRecipe added: 69')} else{"NewRecipe not added: 69"}
      setRecipeList( [...recipeList, newRecipe]);
      setRecipeListOb({recipeList: [...recipeList, newRecipe], nextRecipeId: recipeId})

    } catch (error){
      console.log(error);
    }
  }

  return (
    <>
      <div className="App">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          My Recipes 2025
        </h1>
        <List recipeListO={recipeListOb} />
 
        <Form onSave = { handleSave } />

      </div>
    </>
  );
}



export default App;
