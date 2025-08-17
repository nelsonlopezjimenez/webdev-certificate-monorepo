import { useState, useEffect } from "react";
import "./App.css";

// ------- recipeArray local recipeList stored
const recipeArr = [
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
];

let recipeCount = recipeArr.length;

// ADD THIS EDITRECIPEFORM COMPONENT TO YOUR APP.JSX
function EditRecipeForm({ recipe, onSave, onCancel, isVisible }) {
  const [oneRecipe, setOneRecipe] = useState({
    title: '',
    instruction: '',
    ingredient: [],
    img: ''
  });

  console.log("EditRecipeForm rendered with:", { isVisible, recipe: recipe?.title }); // Debug log

  // Populate form when recipe prop changes
  useEffect(() => {
    if (recipe) {
      console.log("Populating form with recipe:", recipe); // Debug log
      setOneRecipe({
        title: recipe.title || '',
        instruction: recipe.instruction || '',
        ingredient: recipe.ingredient || [],
        img: recipe.img || ''
      });
    }
  }, [recipe]);

  const onSaveEdit = event => {
    event.preventDefault();
    const updatedRecipe = { ...oneRecipe, id: recipe.id };
    console.log("Saving updated recipe:", updatedRecipe); // Debug log
    onSave(updatedRecipe);
  }

  const handleChange = (event) => {
    setOneRecipe(prevItem => {
      return { ...prevItem, [event.target.name]: event.target.value }
    })
  }

  const handleChangeIng = (event) => {
    const index = Number(event.target.name.split('-')[1]);
    const ingredient = oneRecipe.ingredient.map((ingr, i) => (
      i === index ? event.target.value : ingr
    ));
    setOneRecipe(prevItem => {
      return { ...prevItem, ingredient }
    });
  };

  const handleNewIngredient = event => {
    setOneRecipe(prevItem => {
      return { ...prevItem, ingredient: [...prevItem.ingredient, ""] }
    })
  }

  let ingredientInJSX = oneRecipe.ingredient?.map((ing, index) => (
    <div className="recipe-form-line" key={`ingredient-${index}`}>
      <label htmlFor={`ingredient-${index}`}>{index + 1}</label>
      <input 
        type="text" 
        name={`ingredient-${index}`} 
        id={`ingredient-${index}`}
        value={ing}
        size={40} 
        autoComplete="off" 
        placeholder="Ingredient"
        onChange={handleChangeIng}
      />
    </div>
  ));

  // Don't render if not visible or no recipe
  if (!isVisible || !recipe) {
    console.log("EditRecipeForm not rendering:", { isVisible, hasRecipe: !!recipe }); // Debug log
    return null;
  }

  console.log("EditRecipeForm IS rendering!"); // Debug log

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h2>Edit Recipe: {oneRecipe.title}</h2>
          <button 
            type="button" 
            onClick={onCancel}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '24px', 
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>

        <div className="recipe-form-container">
          <form className="recipe-form" onSubmit={onSaveEdit}>
            <div>
              <label htmlFor="edit-recipe-title-input">Title</label>
              <input 
                type="text" 
                name="title" 
                id="edit-recipe-title-input"
                size={42} 
                autoComplete="off"
                value={oneRecipe.title}
                onChange={handleChange}
              />
            </div>
            
            <label htmlFor="edit-recipe-instructions-input" style={{ marginTop: '5px' }}>
              Instructions
            </label>
            <textarea 
              name="instruction" 
              id="edit-recipe-instructions-input" 
              cols="50" 
              rows="8"
              autoComplete="off" 
              value={oneRecipe.instruction}
              onChange={handleChange}
            />
            
            Ingredients:
            {ingredientInJSX}
            <button type="button" className="buttons" onClick={handleNewIngredient}>
              +
            </button>
            
            <div className="recipe-form-line">
              <label htmlFor="edit-recipe-img-input">Image URL</label>
              <input 
                type="text" 
                name="img" 
                id="edit-recipe-img-input" 
                placeholder=""
                size={36} 
                autoComplete="off"
                value={oneRecipe.img}
                onChange={handleChange}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                SAVE CHANGES
              </button>
              <button 
                type="button" 
                onClick={onCancel}
                style={{ backgroundColor: '#f44336', color: 'white' }}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [recipeId, setRecipeId] = useState(recipeCount);
  const [recipeList, setRecipeList] = useState(recipeArr);
  
  // Add these new state variables for edit functionality
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  console.log("App state:", { showEditForm, editingRecipe: editingRecipe?.title }); // Debug log

  const loadRecipes = async () => {
    try {
      const newRecipe = {
        id: recipeId,
        title: "Spaghetti",
        instruction:
          "Open jar of Spaghetti sauce.  Bring to simmer.  Boil water.  Cook pasta until done.  Combine pasta and sauce",
        ingredient: ["pasta", "8 cups water", "1 box spaghetti"],
        img: "spaghetti.jpg",
      };
      setRecipeId(prev => prev + 1)
      setRecipeList([...recipeList, newRecipe]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const filteredRecipeArr = recipeList.filter(recipe => recipe.id != id);
      setRecipeList(filteredRecipeArr);
    } catch (error) {
      console.log(`handleDelete something is wrong!!`)
    }
  }

  const handleSave = async (recipe) => {
    try {
      const newRecipe = { ...recipe, id: recipeId };
      console.log(newRecipe, recipeId);
      setRecipeId(prev => {
        return prev + 1;
      });
      setRecipeList([...recipeList, newRecipe]);
    } catch (error) {
      console.log(error);
    }
  }

  // Add this function to handle editing a recipe
  const handleEdit = (recipe) => {
    console.log("handleEdit called with recipe:", recipe); // Debug log
    setEditingRecipe(recipe);
    setShowEditForm(true);
    console.log("showEditForm should now be true"); // Debug log
  }

  // Add this function to handle saving edited recipe
  const handleSaveEdit = (updatedRecipe) => {
    console.log("handleSaveEdit called with:", updatedRecipe); // Debug log
    setRecipeList(prevList => 
      prevList.map(recipe => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setShowEditForm(false);
    setEditingRecipe(null);
  }

  // Add this function to handle canceling edit
  const handleCancelEdit = () => {
    console.log("handleCancelEdit called"); // Debug log
    setShowEditForm(false);
    setEditingRecipe(null);
  }

  return (
    <>
      <div className="App">
        {/* DEBUG: Add this line to see the current state */}
        <p style={{color: 'red'}}>Debug: showEditForm = {showEditForm ? 'true' : 'false'}, editing: {editingRecipe?.title || 'none'}</p>
        
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          My Recipes 2025
        </h1>
        <List 
          recipeList={recipeList} 
          recipeDelete={handleDelete} 
          onEdit={handleEdit}
        />
        <Form onSave={handleSave} />
        
        {/* Add the EditRecipeForm component */}
        <EditRecipeForm
          recipe={editingRecipe}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          isVisible={showEditForm}
        />
      </div>
    </>
  );
}

function List(props) {
  const recipeList = props.recipeList;

  const recipesJSX = recipeList?.map((recipe) => (
    <Recipe 
      key={recipe.id + recipe.title} 
      {...recipe} 
      onDelete={props.recipeDelete}
      onEdit={props.onEdit}
    />
  ))

  return (
    <div className="recipe-list">
      {recipesJSX}
    </div>
  );
}

function Recipe(props) {
  const { title, img, instruction, id, onDelete, onEdit } = props;
  
  console.log("Recipe component props:", { id, title, onEdit: typeof onEdit }); // Debug log
  
  const ingredientJSX = props.ingredient?.map((ing) => {
    return <li key={id + ing}>{ing}</li>
  });

  const recipeDelete = event => {
    console.log(event.target)
    event.preventDefault();
    onDelete(id);
  }

  const recipeEdit = event => {
    event.preventDefault();
    console.log("Edit button clicked for recipe:", id); // Debug log
    console.log("onEdit function exists:", typeof onEdit); // Debug log
    
    if (onEdit) {
      onEdit(props); // Pass the entire recipe object
    } else {
      console.error("onEdit function not provided!");
    }
  }

  return (
    <div className="recipe-card">
      <div className="recipe-card-img">
        <img src={img} alt={title} />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-title">{title}</h3>
        <h4>Ingredients:</h4>
        <ul>{ingredientJSX}</ul>
        <h4>Instructions</h4>
        <p>{instruction}</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            type="button" 
            onClick={recipeEdit}
            style={{ backgroundColor: '#2196F3', color: 'white', padding: '5px 10px' }}
          >
            EDIT
          </button>
          <button 
            type="button" 
            onClick={recipeDelete}
            style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px' }}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

function Form(props) {
  const [oneRecipe, setOneRecipe] = useState({
    title: '',
    instruction: '',
    ingredient: [],
    img: ''
  });

  const onSave = event => {
    event.preventDefault();
    props.onSave({ ...oneRecipe });
    setOneRecipe({
      title: "",
      instruction: "",
      ingredient: [],
      img: ""
    })
  }

  const handleChange = (event) => {
    setOneRecipe(prevItem => {
      return { ...prevItem, [event.target.name]: event.target.value }
    })
  }

  const handleChangeIng = (event) => {
    const index = Number(event.target.name.split('-')[1]);
    const ingredient = oneRecipe.ingredient.map((ingr, i) => (
      i === index ? event.target.value : ingr
    ));
    setOneRecipe(prevItem => {
      return { ...prevItem, ingredient }
    });
  };

  const handleNewIngredient = event => {
    setOneRecipe(prevItem => {
      return { ...prevItem, ingredient: [...prevItem.ingredient, ""] }
    })
  }

  let ingredientInJSX = oneRecipe.ingredient?.map((ing, index) => (
    <div className="recipe-form-line" key={`ingredient-${index}`}>
      <label htmlFor={`ingredient-${index}`} >{index + 1}</label>
      <input type="text" name={`ingredient-${index}`} id={`ingredient-${index}`}
        size={45} autoComplete="off" placeholder="Ingredient"
        onChange={handleChangeIng}
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
              value={oneRecipe.title}
              onChange={handleChange}
            />
          </div>
          <label htmlFor="recipe-instructions-input" style={{ marginTop: '5px' }}>Instructions</label>
          <textarea name="instruction" id="recipe-instructions-input" cols="50" rows="8"
            autoComplete="off" value={oneRecipe.instruction}
            onChange={handleChange}
          >
          </textarea>
          Ingredients:
          {ingredientInJSX}
          <button type="button" className="buttons" onClick={handleNewIngredient}>+</button>
          <div className="recipe-form-line">
            <label htmlFor="recipe-img-input"> Image URL</label>
            <input type="text" name="img" id="recipe-img-input" placeholder=""
              size={36} autoComplete="0ff"
              value={oneRecipe.img}
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