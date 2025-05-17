import { useState, useEffect, useLayoutEffect } from "react";
import "./App.css";
// ------- recipeList array local recipeList stored
const recipeListObj = {
  recipeList: [
    {
      id: 0,
      title: "Spaghetti",
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
function App() {
  const [recipeListOb, setRecipeListOb] = useState(recipeListObj); // {a:"",id:#},{},{}
  const [recipeId, setRecipeId] = useState(recipeListObj.nextRecipeId);
  const [recipeList, setRecipeList] = useState(recipeListObj.recipeList)

  const handleSave =  (recipe) => {
    try {
      const newRecipe = { ...recipe, id: recipeId};
      console.log(newRecipe, recipeId);
      setRecipeId(prev => {
        return prev + 1;
      })
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
function List(props) {
  const {recipeList, nextRecipeId } = props.recipeListO;

  const recipesJSX = recipeList?.map( (recipe, index) => (
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
  const { title, img, instruction, id } = props;
  const ingredientJSX = props.ingredient?.map((ing, index) => (
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
          {ingredientJSX}
        </ul>
        <h4>Instructions</h4>
        <p> {instruction}</p>
        <button type="button" onClick={() => alert()}>DELETE</button>
      </div>
    </div>
  );
}
function Form (props){
  const [oneRecipe, setOneRecipe] = useState({
    title: '',
    instruction: '',
    ingredient: [],
    img: ''
  });
  const onSave = event => {
    event.preventDefault();
    props.onSave( { ...oneRecipe });
    setOneRecipe({
      title: "",
      instruction: "",
      ingredient: [],
      img: ""
    })
  }
  const handleChange = (event) => {
    setOneRecipe ( prevItem => {
      return {...prevItem, [ event.target.name ]: event.target.value }
    })
  }
  const handleChangeIng = (event) => {
    const index = Number(event.target.name.split('-')[1]);
    const ingredient = oneRecipe.ingredient.map((ingr, i) => (
      i === index ? event.target.value : ingr
    ));
    setOneRecipe( prevItem => {
      return { ...prevItem, ingredient }
    });
  };
  const handleNewIngredient = event => {
    setOneRecipe(prevItem => {
      return {...prevItem, ingredient: [...prevItem.ingredient, ""]}
    })
  }
  let ingredientInJSX = oneRecipe.ingredient?.map(( ing, index) => (
    <div className="recipe-form-line" key = {`ingredient-${index}`}>
      <label htmlFor={`ingredient-${index}`} >{index + 1}</label>
      <input type="text" name={`ingredient-${index}`} id={`ingredient-${index}`} 
        size = {45} autoComplete="off" placeholder="Ingredient"
        onChange = { handleChangeIng }
      />
    </div>
  ));
  return (
    <>
      <div className="recipe-form-container">
         <form className="recipe-form" onSubmit={onSave}>
          <div>
            <label htmlFor="recipe-title-input">Title</label>
            <input type="text" name="title" id="recipe-title-input"
              key="title" size={42} autoComplete="off"
              value = { oneRecipe.title}
              onChange = { handleChange }
            />
          </div>
          <label htmlFor="recipe-instructions-input" style={{ marginTop: '5px'}}>Instructions</label>
            <textarea name="instruction" id="recipe-instructions-input" cols="50" rows="8"
              autoComplete="off" value = { oneRecipe.instruction } 
              onChange={handleChange}
            >
            </textarea>
            Ingredients:
              {ingredientInJSX} 
            <button type="button" className="buttons" onClick={handleNewIngredient}>+</button>
            <div className="recipe-form-line">
              <label htmlFor="recipe-img-input"> Image URL</label>
              <input type="text" name="img" id="recipe-img-input" placeholder=""
                size = {36} autoComplete="0ff"
                value ={ oneRecipe.img }
                onChange={handleChange}
              />
            </div>
            <button type="submit" >SAVE</button>
         </form>
      </div>
    </>
  )
}

export default App;
