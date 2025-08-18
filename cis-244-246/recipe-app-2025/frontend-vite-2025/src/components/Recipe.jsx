
function Recipe(props) {
    // ========== destructuring
    const { title, img, instruction, _id } = props;
    const ingredientJSX = props.ingredient?.map((ing) => {
      return <li key={_id+ing}>{ing}</li>
    });
  
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
  export default Recipe;