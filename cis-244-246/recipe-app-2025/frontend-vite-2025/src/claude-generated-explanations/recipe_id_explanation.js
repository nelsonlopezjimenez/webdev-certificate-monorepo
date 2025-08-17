// RECIPE ID SYSTEM EXPLANATION

// =====================================
// 1. INITIAL SETUP
// =====================================

const INITIAL_RECIPES = [
  { id: 0, title: "Spaghetti", /* ... */ },     // ID = 0
  { id: 1, title: "Milkshake", /* ... */ },     // ID = 1  
  { id: 2, title: "Avocado Toast", /* ... */ }  // ID = 2
];

// Initial count = 3 (because we have 3 recipes)
let recipeCount = INITIAL_RECIPES.length; // recipeCount = 3

// =====================================
// 2. STATE INITIALIZATION
// =====================================

function App() {
  // recipeId starts at 3 (the next available ID)
  const [recipeId, setRecipeId] = useState(recipeCount); // recipeId = 3
  
  // This means:
  // - Next new recipe will get ID = 3
  // - After that, ID = 4
  // - Then ID = 5, etc.
}

// =====================================
// 3. HOW IT WORKS WHEN ADDING RECIPES
// =====================================

const handleSave = async (recipe) => {
  try {
    // Step 1: Create new recipe with current recipeId
    const newRecipe = { 
      ...recipe,        // title, instruction, ingredient, img
      id: recipeId      // Assign current recipeId (e.g., 3)
    };
    
    // Step 2: Increment recipeId for next recipe
    setRecipeId(prev => prev + 1); // recipeId becomes 4
    
    // Step 3: Add recipe to list
    setRecipeList(prevList => [...prevList, newRecipe]);
    
    // Result: New recipe has id=3, next recipe will have id=4
  } catch (error) {
    console.error("Error saving recipe:", error);
  }
};

// =====================================
// 4. EXAMPLE WALKTHROUGH
// =====================================

// INITIAL STATE:
// recipeList = [
//   { id: 0, title: "Spaghetti" },
//   { id: 1, title: "Milkshake" }, 
//   { id: 2, title: "Avocado Toast" }
// ]
// recipeId = 3

// USER ADDS FIRST NEW RECIPE:
// 1. handleSave called with { title: "Pizza", instruction: "...", ingredient: [...] }
// 2. newRecipe = { id: 3, title: "Pizza", instruction: "...", ingredient: [...] }
// 3. recipeId becomes 4
// 4. Recipe added to list

// AFTER FIRST ADD:
// recipeList = [
//   { id: 0, title: "Spaghetti" },
//   { id: 1, title: "Milkshake" }, 
//   { id: 2, title: "Avocado Toast" },
//   { id: 3, title: "Pizza" }        // ← NEW
// ]
// recipeId = 4

// USER ADDS SECOND NEW RECIPE:
// 1. handleSave called with { title: "Burger", instruction: "...", ingredient: [...] }
// 2. newRecipe = { id: 4, title: "Burger", instruction: "...", ingredient: [...] }
// 3. recipeId becomes 5
// 4. Recipe added to list

// AFTER SECOND ADD:
// recipeList = [
//   { id: 0, title: "Spaghetti" },
//   { id: 1, title: "Milkshake" }, 
//   { id: 2, title: "Avocado Toast" },
//   { id: 3, title: "Pizza" },
//   { id: 4, title: "Burger" }       // ← NEW
// ]
// recipeId = 5

// =====================================
// 5. WHY THIS SYSTEM IS USED
// =====================================

// ✅ ADVANTAGES:
// - Ensures unique IDs for each recipe
// - Simple auto-increment system
// - Works well for local state management
// - Easy to implement and understand

// ❌ POTENTIAL ISSUES:
// - IDs are not preserved if app reloads (resets to initial state)
// - In real apps, database would handle ID generation
// - Race conditions possible with rapid additions (unlikely in this case)

// =====================================
// 6. WHAT HAPPENS WITH DELETIONS
// =====================================

const handleDelete = async (id) => {
  // Removes recipe from list, but doesn't affect recipeId counter
  setRecipeList(prevList => prevList.filter(recipe => recipe.id !== id));
  // recipeId stays the same - no decrementing!
};

// EXAMPLE:
// Before deletion: recipeId = 5, recipes have IDs [0,1,2,3,4]
// Delete recipe with id=2
// After deletion: recipeId = 5, recipes have IDs [0,1,3,4]
// Next new recipe will still get id=5

// This prevents ID reuse and potential conflicts

// =====================================
// 7. ALTERNATIVE APPROACHES
// =====================================

// Option 1: Use Date.now() for unique IDs
const generateId = () => Date.now();

// Option 2: Use crypto.randomUUID() (modern browsers)
const generateId = () => crypto.randomUUID();

// Option 3: Find max ID and add 1 (handles deletions better)
const generateId = (recipeList) => {
  const maxId = recipeList.reduce((max, recipe) => 
    Math.max(max, recipe.id), -1
  );
  return maxId + 1;
};

// Option 4: Use useRef for persistent counter
const idCounter = useRef(INITIAL_RECIPES.length);
const generateId = () => ++idCounter.current;

// =====================================
// 8. REAL-WORLD COMPARISON
// =====================================

// In a real application with a database:
// - Database would auto-generate IDs (PRIMARY KEY AUTO_INCREMENT)
// - Backend API would return the new ID after creation
// - Frontend wouldn't need to manage ID generation

// Example API call:
const handleSave = async (recipe) => {
  const response = await fetch('/api/recipes', {
    method: 'POST',
    body: JSON.stringify(recipe)
  });
  const newRecipe = await response.json(); // { id: 123, ...recipe }
  setRecipeList(prev => [...prev, newRecipe]);
};

// =====================================
// 9. DEBUGGING THE RECIPE ID SYSTEM
// =====================================

// Add these console logs to see the system in action:
const handleSave = async (recipe) => {
  console.log('🆔 Current recipeId:', recipeId);
  console.log('📝 Recipe to save:', recipe);
  
  const newRecipe = { ...recipe, id: recipeId };
  console.log('✅ New recipe with ID:', newRecipe);
  
  setRecipeId(prev => {
    console.log('🔢 Incrementing recipeId from', prev, 'to', prev + 1);
    return prev + 1;
  });
  
  setRecipeList(prevList => {
    const newList = [...prevList, newRecipe];
    console.log('📋 Updated recipe list:', newList);
    return newList;
  });
};