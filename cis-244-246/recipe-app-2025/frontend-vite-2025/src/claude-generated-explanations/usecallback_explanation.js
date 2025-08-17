// =====================================
// 1. WHAT IS useCallback?
// =====================================

// useCallback is a React Hook that returns a memoized version of a function
// It only creates a new function when its dependencies change

// Basic syntax:
const memoizedFunction = useCallback(
  () => {
    // function logic here
  },
  [dependency1, dependency2] // dependency array
);

// =====================================
// 2. THE PROBLEM useCallback SOLVES
// =====================================

// ❌ WITHOUT useCallback - Function recreated every render
function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [count, setCount] = useState(0);

  // This function is recreated on EVERY render!
  const handleDelete = (id) => {
    setRecipeList(prev => prev.filter(recipe => recipe.id !== id));
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <RecipeList recipes={recipeList} onDelete={handleDelete} />
    </div>
  );
}

// What happens:
// 1. User clicks count button
// 2. App re-renders
// 3. handleDelete function is recreated (new function reference)
// 4. RecipeList receives new onDelete prop
// 5. RecipeList re-renders even though recipes didn't change!

// ✅ WITH useCallback - Function only recreated when needed
function App() {
  const [recipeList, setRecipeList] = useState([]);
  const [count, setCount] = useState(0);

  // This function is only recreated if dependencies change
  const handleDelete = useCallback((id) => {
    setRecipeList(prev => prev.filter(recipe => recipe.id !== id));
  }, []); // Empty dependency array = never recreated

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <RecipeList recipes={recipeList} onDelete={handleDelete} />
    </div>
  );
}

// What happens:
// 1. User clicks count button
// 2. App re-renders
// 3. handleDelete function is NOT recreated (same reference)
// 4. RecipeList sees same onDelete prop
// 5. RecipeList doesn't re-render (optimization!)

// =====================================
// 3. YOUR RECIPE APP EXAMPLES
// =====================================

// Example 1: handleDelete with useCallback
const handleDelete = useCallback(async (id) => {
  try {
    setRecipeList(prevList => prevList.filter(recipe => recipe.id !== id));
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
}, []); // No dependencies = function never changes

// Example 2: handleSave with dependency
const handleSave = useCallback(async (recipe) => {
  try {
    const newRecipe = { ...recipe, id: recipeId };
    setRecipeId(prev => prev + 1);
    setRecipeList(prevList => [...prevList, newRecipe]);
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
}, [recipeId]); // Depends on recipeId - recreated when recipeId changes

// Example 3: handleEdit with no dependencies
const handleEdit = useCallback((recipe) => {
  setEditingRecipe(recipe);
  setShowEditForm(true);
}, []); // No dependencies = function never changes

// =====================================
// 4. DEPENDENCY ARRAY EXPLAINED
// =====================================

// Empty array [] = function never recreated
const handleDelete = useCallback((id) => {
  setRecipeList(prev => prev.filter(recipe => recipe.id !== id));
}, []); // ✅ Safe because we use functional state update

// With dependencies = function recreated when dependencies change
const handleSave = useCallback((recipe) => {
  const newRecipe = { ...recipe, id: recipeId };
  setRecipeId(prev => prev + 1);
  setRecipeList(prevList => [...prevList, newRecipe]);
}, [recipeId]); // ✅ Recreated when recipeId changes

// ❌ WRONG - Missing dependency
const handleSave = useCallback((recipe) => {
  const newRecipe = { ...recipe, id: recipeId }; // Uses recipeId
  // ... rest of function
}, []); // ❌ Empty array but function uses recipeId!

// This would cause bugs because the function would always use
// the initial value of recipeId (stale closure)

// =====================================
// 5. VISUAL COMPARISON
// =====================================

// WITHOUT useCallback:
// Render 1: handleDelete = function#1
// Render 2: handleDelete = function#2 (different reference!)
// Render 3: handleDelete = function#3 (different reference!)

// WITH useCallback:
// Render 1: handleDelete = function#1
// Render 2: handleDelete = function#1 (same reference!)
// Render 3: handleDelete = function#1 (same reference!)

// =====================================
// 6. WHEN TO USE useCallback
// =====================================

// ✅ USE useCallback when:
// 1. Passing functions as props to child components
const MyComponent = () => {
  const handleClick = useCallback(() => {
    // logic here
  }, []);
  
  return <ChildComponent onClick={handleClick} />;
};

// 2. Functions are dependencies of other hooks
const MyComponent = () => {
  const fetchData = useCallback(() => {
    // fetch logic
  }, [userId]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]); // fetchData as dependency
};

// 3. Expensive function creation
const MyComponent = () => {
  const expensiveFunction = useCallback(() => {
    // Some complex calculation
  }, [dependency]);
};

// ❌ DON'T use useCallback when:
// 1. Function is only used inside the component
const MyComponent = () => {
  // This doesn't need useCallback
  const localFunction = () => {
    console.log('local use only');
  };
  
  return <button onClick={localFunction}>Click</button>;
};

// 2. Dependencies change frequently
const MyComponent = () => {
  const [count, setCount] = useState(0);
  
  // This gets recreated every time count changes anyway
  const handleClick = useCallback(() => {
    console.log(count);
  }, [count]); // count changes frequently
};

// =====================================
// 7. PERFORMANCE IMPACT DEMONSTRATION
// =====================================

// Component that shows re-renders
const RecipeCard = React.memo(({ recipe, onDelete, onEdit }) => {
  console.log(`RecipeCard rendered for: ${recipe.title}`);
  
  return (
    <div>
      <h3>{recipe.title}</h3>
      <button onClick={() => onDelete(recipe.id)}>Delete</button>
      <button onClick={() => onEdit(recipe)}>Edit</button>
    </div>
  );
});

// Parent component
const App = () => {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [count, setCount] = useState(0);

  // WITHOUT useCallback - RecipeCard re-renders unnecessarily
  const handleDelete1 = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  // WITH useCallback - RecipeCard only re-renders when needed
  const handleDelete2 = useCallback((id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={handleDelete2} // Stable reference
        />
      ))}
    </div>
  );
};

// =====================================
// 8. COMMON MISTAKES
// =====================================

// Mistake 1: Forgetting dependencies
const Component = () => {
  const [userId, setUserId] = useState(1);
  
  const fetchUser = useCallback(() => {
    fetch(`/api/users/${userId}`); // Uses userId
  }, []); // ❌ Missing userId in dependencies!
  
  // This will always fetch user with id=1
};

// Mistake 2: Including unnecessary dependencies
const Component = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  
  const handleSubmit = useCallback(() => {
    console.log(name); // Only uses name
  }, [name, age]); // ❌ age is unnecessary dependency
};

// Mistake 3: Using object/array as dependency without memoization
const Component = () => {
  const config = { apiUrl: '/api' }; // New object every render!
  
  const fetchData = useCallback(() => {
    // uses config
  }, [config]); // ❌ config changes every render!
  
  // Better:
  const config = useMemo(() => ({ apiUrl: '/api' }), []);
  // or
  const config = { apiUrl: '/api' }; // outside component
};

// =====================================
// 9. DEBUGGING useCallback
// =====================================

// Add logging to see when function is recreated
const handleDelete = useCallback((id) => {
  console.log('handleDelete function called');
  setRecipeList(prev => prev.filter(recipe => recipe.id !== id));
}, []);

// In console, if you see multiple logs when only state changes
// (not related to delete), you might have a dependency issue

// Use React DevTools Profiler to see component re-renders

// =====================================
// 10. ALTERNATIVE: React.memo
// =====================================

// useCallback works well with React.memo
const RecipeCard = React.memo(({ recipe, onDelete }) => {
  return (
    <div>
      <h3>{recipe.title}</h3>
      <button onClick={() => onDelete(recipe.id)}>Delete</button>
    </div>
  );
});

// React.memo prevents re-render if props haven't changed
// useCallback ensures function props have stable references

// =====================================
// 11. SUMMARY
// =====================================

// useCallback is about REFERENCE EQUALITY, not performance of the function itself
// It prevents unnecessary re-renders of child components
// Use it when passing functions as props or as dependencies to other hooks
// Always include all dependencies in the dependency array