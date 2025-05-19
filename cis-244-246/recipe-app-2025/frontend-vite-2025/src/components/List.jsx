import Recipe from './Recipe'
function List(props) {
    const {recipeList } = props.recipeListO;
  
    const recipesJSX = recipeList?.map( (recipe) => (
      <Recipe key={recipe._id + recipe.title} {...recipe}/>
    ))
  
    return (
      <div className="recipe-list">
        {recipesJSX}
      </div>
    );
  }
  export default List;