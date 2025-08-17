import { useState, useEffect, useCallback } from "react";
import "./App.css";

// ------- recipeArray local recipeList stored
const INITIAL_RECIPES = [
  {
    id: 0,
    title: "Spaghetti",
    instruction:
      "Open jar of Spaghetti sauce. Bring to simmer. Boil water. Cook pasta until done. Combine pasta and sauce",
    ingredient: ["pasta", "8 cups water", "1 box spaghetti"],
    img: "spaghetti.jpg",
  },
  {
    id: 1,
    title: "Milkshake",
    instruction: "Combine ice cream and milk. Blend until creamy",
    ingredient: ["2 Scoops Ice cream", "8 ounces milk"],
    img: "milkshake.jpg",
  },
  {
    id: 2,
    title: "Avocado Toast",
    instruction:
      "Toast bread. Slice avocado and spread on bread. Add salt, oil, and pepper to taste.",
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

function App() {
  const [recipeId, setRecipeId] = useState(INITIAL_RECIPES.length);
  const [recipeList, setRecipeList] = useState(INITIAL_RECIPES);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Memoized function to load recipes
  const loadRecipes = useCallback(async () => {
    try {
      // Simulate API call - list of recipes will come from mongo db
      const newRecipe = {
        id: recipeId,
        title: "Spaghetti",
        instruction:
          "Open jar of Spaghetti sauce. Bring to simmer. Boil water. Cook pasta until done. Combine pasta and sauce",
        ingredient: ["pasta", "8 cups water", "1 box spaghetti"],
        img: "spaghetti.jpg",
      };
      
      setRecipeId(prev => prev + 1);
      setRecipeList(prevList => [...prevList, newRecipe]);
    } catch (error) {
      console.error("Error loading recipes:", error);
    }
  }, [recipeId]);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  // Memoized delete handler
  const handleDelete = useCallback(async (id) => {
    try {
      setRecipeList(prevList => prevList.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  }, []);

  // Memoized save handler for new recipes
  const handleSave = useCallback(async (recipe) => {
    try {
      const newRecipe = { ...recipe, id: recipeId };
      setRecipeId(prev => prev + 1);
      setRecipeList(prevList => [...prevList, newRecipe]);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  }, [recipeId]);

  // Memoized edit handler
  const handleEdit = useCallback((recipe) => {
    setEditingRecipe(recipe);
    setShowEditForm(true);
  }, []);

  // Memoized save edit handler
  const handleSaveEdit = useCallback((updatedRecipe) => {
    setRecipeList(prevList => 
      prevList.map(recipe => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setShowEditForm(false);
    setEditingRecipe(null);
  }, []);

  // Memoized cancel edit handler
  const handleCancelEdit = useCallback(() => {
    setShowEditForm(false);
    setEditingRecipe(null);
  }, []);

  return (
    <div className="App">
      <Header />
      <List 
        recipeList={recipeList} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
      <Form onSave={handleSave} />
      <EditRecipeForm 
        recipe={editingRecipe} 
        onSave={handleSaveEdit} 
        onCancel={handleCancelEdit} 
        isVisible={showEditForm} 
      />
    </div>
  );
}

// Extracted Header component for better organization
function Header() {
  return (
    <h1 className="app-title">
      My Recipes 2025
    </h1>
  );
}

function List({ recipeList, onDelete, onEdit }) {
  const recipesJSX = recipeList?.map((recipe) => (
    <Recipe 
      key={`${recipe.id}-${recipe.title}`} 
      {...recipe} 
      onDelete={onDelete}
      onEdit={onEdit} 
    />
  ));

  return (
    <div className="recipe-list">
      {recipesJSX}
    </div>
  );
}

function Recipe({ title, img, instruction, id, ingredient, onDelete, onEdit, ...props }) {
  const ingredientJSX = ingredient?.map((ing, index) => (
    <li key={`${id}-${ing}-${index}`}>{ing}</li>
  ));

  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(id);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    // Pass the complete recipe object
    onEdit({ id, title, img, instruction, ingredient, ...props });
  };
  
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
        
        <div className="recipe-card-actions">
          <button 
            type="button" 
            className="btn btn-edit"
            onClick={handleEdit}
          >
            EDIT
          </button>
          <button 
            type="button" 
            className="btn btn-delete"
            onClick={handleDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

function Form({ onSave }) {
  const [oneRecipe, setOneRecipe] = useState({
    title: '',
    instruction: '',
    ingredient: [],
    img: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!oneRecipe.title.trim()) {
      alert('Please enter a recipe title');
      return;
    }
    
    // Filter out empty ingredients
    const cleanIngredients = oneRecipe.ingredient.filter(ing => ing.trim() !== '');
    if (cleanIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    const recipeToSave = {
      ...oneRecipe,
      ingredient: cleanIngredients
    };

    onSave(recipeToSave);
    
    // Reset form
    setOneRecipe({
      title: "",
      instruction: "",
      ingredient: [],
      img: ""
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOneRecipe(prevItem => ({
      ...prevItem, 
      [name]: value
    }));
  };

  const handleIngredientChange = (event) => {
    const index = Number(event.target.name.split('-')[1]);
    const newIngredients = oneRecipe.ingredient.map((ingr, i) => (
      i === index ? event.target.value : ingr
    ));
    setOneRecipe(prevItem => ({
      ...prevItem, 
      ingredient: newIngredients
    }));
  };

  const addIngredient = () => {
    setOneRecipe(prevItem => ({
      ...prevItem, 
      ingredient: [...prevItem.ingredient, ""]
    }));
  };

  const removeIngredient = (indexToRemove) => {
    if (oneRecipe.ingredient.length > 1) {
      setOneRecipe(prevItem => ({
        ...prevItem,
        ingredient: prevItem.ingredient.filter((_, index) => index !== indexToRemove)
      }));
    }
  };

  const ingredientInputs = oneRecipe.ingredient?.map((ing, index) => (
    <div className="recipe-form-line" key={`ingredient-${index}`}>
      <label htmlFor={`ingredient-${index}`}>{index + 1}</label>
      <input 
        type="text" 
        name={`ingredient-${index}`} 
        id={`ingredient-${index}`}
        value={ing}
        size={45} 
        autoComplete="off" 
        placeholder="Ingredient"
        onChange={handleIngredientChange}
      />
      {oneRecipe.ingredient.length > 1 && (
        <button 
          type="button" 
          className="btn-remove"
          onClick={() => removeIngredient(index)}
        >
          ×
        </button>
      )}
    </div>
  ));

  return (
    <div className="recipe-form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipe-title-input">Title *</label>
          <input 
            type="text" 
            name="title" 
            id="recipe-title-input"
            size={42} 
            autoComplete="off"
            value={oneRecipe.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recipe-instructions-input">Instructions</label>
          <textarea 
            name="instruction" 
            id="recipe-instructions-input" 
            cols="50" 
            rows="8"
            autoComplete="off" 
            value={oneRecipe.instruction}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Ingredients *</label>
          {ingredientInputs}
          <button type="button" className="btn btn-add" onClick={addIngredient}>
            + Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="recipe-img-input">Image URL</label>
          <input 
            type="url" 
            name="img" 
            id="recipe-img-input" 
            placeholder="https://example.com/image.jpg"
            size={36} 
            autoComplete="off"
            value={oneRecipe.img}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          SAVE RECIPE
        </button>
      </form>
    </div>
  );
}

function EditRecipeForm({ recipe, onSave, onCancel, isVisible }) {
  const [oneRecipe, setOneRecipe] = useState({
    title: '',
    instruction: '',
    ingredient: [],
    img: ''
  });

  // Populate form when recipe prop changes
  useEffect(() => {
    if (recipe) {
      setOneRecipe({
        title: recipe.title || '',
        instruction: recipe.instruction || '',
        ingredient: recipe.ingredient || [],
        img: recipe.img || ''
      });
    }
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Basic validation
    if (!oneRecipe.title.trim()) {
      alert('Please enter a recipe title');
      return;
    }
    
    // Filter out empty ingredients
    const cleanIngredients = oneRecipe.ingredient.filter(ing => ing.trim() !== '');
    if (cleanIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    const updatedRecipe = { 
      ...oneRecipe, 
      id: recipe.id,
      ingredient: cleanIngredients
    };
    
    onSave(updatedRecipe);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOneRecipe(prevItem => ({
      ...prevItem, 
      [name]: value
    }));
  };

  const handleIngredientChange = (event) => {
    const index = Number(event.target.name.split('-')[1]);
    const newIngredients = oneRecipe.ingredient.map((ingr, i) => (
      i === index ? event.target.value : ingr
    ));
    setOneRecipe(prevItem => ({
      ...prevItem, 
      ingredient: newIngredients
    }));
  };

  const addIngredient = () => {
    setOneRecipe(prevItem => ({
      ...prevItem, 
      ingredient: [...prevItem.ingredient, ""]
    }));
  };

  const removeIngredient = (indexToRemove) => {
    if (oneRecipe.ingredient.length > 1) {
      setOneRecipe(prevItem => ({
        ...prevItem,
        ingredient: prevItem.ingredient.filter((_, index) => index !== indexToRemove)
      }));
    }
  };

  const ingredientInputs = oneRecipe.ingredient?.map((ing, index) => (
    <div className="recipe-form-line" key={`edit-ingredient-${index}`}>
      <label htmlFor={`edit-ingredient-${index}`}>{index + 1}</label>
      <input 
        type="text" 
        name={`ingredient-${index}`} 
        id={`edit-ingredient-${index}`}
        value={ing}
        size={40} 
        autoComplete="off" 
        placeholder="Ingredient"
        onChange={handleIngredientChange}
      />
      {oneRecipe.ingredient.length > 1 && (
        <button 
          type="button" 
          className="btn-remove"
          onClick={() => removeIngredient(index)}
        >
          ×
        </button>
      )}
    </div>
  ));

  // Don't render if not visible or no recipe
  if (!isVisible || !recipe) {
    return null;
  }

  return (
    <div id="editOuter" className="modal-overlay">
      <div id="editInner" className="modal-container">
        <div id="editInnerElem" className="modal-header">
          <h2>Edit Recipe: {oneRecipe.title}</h2>
          <button 
            id="editBttnCancel" 
            type="button" 
            className="btn-close"
            onClick={onCancel}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="recipe-form-container">
          <form className="recipe-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="edit-recipe-title-input">Title *</label>
              <input 
                type="text" 
                name="title" 
                id="edit-recipe-title-input"
                size={42} 
                autoComplete="off"
                value={oneRecipe.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edit-recipe-instructions-input">Instructions</label>
              <textarea 
                name="instruction" 
                id="edit-recipe-instructions-input" 
                cols="50" 
                rows="8"
                autoComplete="off" 
                value={oneRecipe.instruction}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Ingredients *</label>
              {ingredientInputs}
              <button 
                type="button" 
                className="btn btn-add" 
                onClick={addIngredient}
              >
                + Add Ingredient
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="edit-recipe-img-input">Image URL</label>
              <input 
                type="url" 
                name="img" 
                id="edit-recipe-img-input" 
                placeholder="https://example.com/image.jpg"
                size={36} 
                autoComplete="off"
                value={oneRecipe.img}
                onChange={handleInputChange}
              />
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn btn-success">
                SAVE CHANGES
              </button>
              <button 
                type="button" 
                className="btn btn-cancel"
                onClick={onCancel}
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

export default App;