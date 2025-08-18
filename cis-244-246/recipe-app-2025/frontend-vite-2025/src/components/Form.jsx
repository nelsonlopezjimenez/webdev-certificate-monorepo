import { useState } from "react";

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
export default Form;