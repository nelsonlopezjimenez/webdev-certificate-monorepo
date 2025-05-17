import { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
// ------- recipeList array local recipeList stored
const recipeListObj = {
  recipeList: [
    {
      id: 0,
      title: "Spaghetti",
      instructions:
        "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
      ingredients: ["pasta", "8 cups water", "1 box spaghetti"],
      img: "spaghetti.jpg",
    },
    {
      id: 1,
      title: "Milkshake",
      instructions: "Combine ice cream and milk.  Blend until creamy",
      ingredients: ["2 Scoops Ice cream", "8 ounces milk"],
      img: "milkshake.jpg",
    },
    {
      id: 2,
      title: "Avocado Toast",
      instructions:
        "Toast bread.  Slice avocado and spread on bread.  Add salt, oil, and pepper to taste.",
      ingredients: [
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
function App() {
  const [recipeList, setRecipeList] = useState(recipeListObj);

  return (
    <>
      <div className="App">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          My Recipes 2025
        </h1>
        <List recipeListOb={recipeListObj} />
 
        <Form/>
      </div>
    </>
  );
}
function List(props) {
  const {recipeList, nextRecipeId } = props.recipeListOb

  const recipesJSX = recipeList.map( (recipe, index) => (
    <Recipe key={recipe.id+recipe.title} {...recipe}/>
  ))

  return (
    <div className="recipe-list">
      {recipesJSX}
    </div>
  );
}
function Recipe(props) {
  
  // ========== destructuring
  const { title, img, instructions, id } = props;
  const ingredientsJSX = props.ingredients.map((ing, index) => (
    <li key={index}>{ing}</li>
  ));

  return (
    <div className="recipe-card">
      <div className="recipe-card-img">
        <img src={img} alt={title} srcSet="" />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-title">{title}</h3>
        <h4>Ingredients:</h4>
        <ul>
          {ingredientsJSX}
        </ul>
        <h4>Instructions</h4>
        <p> {instructions}</p>
        <button type="button" onClick={() => alert()}>DELETE</button>
      </div>
    </div>
  );
}
function Form (props){
  return (
    <h2>Form</h2>
  )
}

export default App;
