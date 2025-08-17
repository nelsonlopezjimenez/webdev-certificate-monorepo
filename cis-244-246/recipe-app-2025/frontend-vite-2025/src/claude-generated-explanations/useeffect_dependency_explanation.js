// =====================================
// SCENARIO: Missing loadRecipes in useEffect
// =====================================

function App() {
  const [recipeId, setRecipeId] = useState(INITIAL_RECIPES.length);
  const [recipeList, setRecipeList] = useState(INITIAL_RECIPES);

  // loadRecipes function depends on recipeId
  const loadRecipes = useCallback(async () => {
    try {
      const newRecipe = {
        id: recipeId,  // 🚨 Uses recipeId from outer scope
        title: "Spaghetti",
        instruction: "Open jar of Spaghetti sauce...",
        ingredient: ["pasta", "8 cups water", "1 box spaghetti"],
        img: "spaghetti.jpg",
      };
      
      setRecipeId(prev => prev + 1);
      setRecipeList(prevList => [...prevList, newRecipe]);
    } catch (error) {
      console.error("Error loading recipes:", error);
    }
  }, [recipeId]); // loadRecipes changes when recipeId changes

  // ❌ PROBLEM: Missing loadRecipes in dependency array
  useEffect(() => {
    loadRecipes();
  }, []); // Empty array - effect only runs once

  // ✅ CORRECT: Include loadRecipes in dependency array
  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]); // Effect runs when loadRecipes changes
}

// =====================================
// WHAT HAPPENS WITH MISSING DEPENDENCY
// =====================================

// Timeline with MISSING [loadRecipes]:

// 1. Component mounts
//    - recipeId = 3
//    - loadRecipes created with recipeId = 3
//    - useEffect runs once, calls loadRecipes
//    - Adds recipe with id = 3
//    - recipeId becomes 4

// 2. User adds another recipe (handleSave called)
//    - recipeId becomes 5
//    - loadRecipes recreated with recipeId = 5
//    - BUT useEffect doesn't run again (empty dependency array)
//    - loadRecipes is never called again!

// 3. Result: loadRecipes only runs ONCE on mount, never again

// =====================================
// WHAT HAPPENS WITH CORRECT DEPENDENCY
// =====================================

// Timeline with CORRECT [loadRecipes]:

// 1. Component mounts
//    - recipeId = 3
//    - loadRecipes created with recipeId = 3
//    - useEffect runs, calls loadRecipes
//    - Adds recipe with id = 3
//    - recipeId becomes 4

// 2. recipeId changes to 4
//    - loadRecipes recreated with recipeId = 4
//    - useEffect detects loadRecipes changed
//    - useEffect runs again, calls new loadRecipes
//    - Adds recipe with id = 4
//    - recipeId becomes 5

// 3. This continues every time recipeId changes

// =====================================
// ESLINT WARNING
// =====================================

// ESLint with react-hooks/exhaustive-deps rule will warn:
// "React Hook useEffect has a missing dependency: 'loadRecipes'. 
// Either include it or remove the dependency array."

useEffect(() => {
  loadRecipes(); // Uses loadRecipes
}, []); // ❌ Missing loadRecipes

// ESLint suggests:
useEffect(() => {
  loadRecipes();
}, [loadRecipes]); // ✅ Include all dependencies

// =====================================
// POTENTIAL PROBLEMS
// =====================================

// Problem 1: Stale Closure
function Component() {
  const [count, setCount] = useState(0);
  
  const logCount = () => {
    console.log('Current count:', count); // Captures count value
  };
  
  useEffect(() => {
    const timer = setInterval(logCount, 1000);
    return () => clearInterval(timer);
  }, []); // ❌ Missing logCount dependency
  
  // This will ALWAYS log count = 0, even if count changes!
  // Because logCount is "stale" - it captured the initial count value
}

// Problem 2: Infinite Loops (if not careful)
function Component() {
  const [data, setData] = useState([]);
  
  const fetchData = async () => {
    const result = await api.getData();
    setData(result);
  };
  
  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ Correct dependency
  
  // But if fetchData isn't memoized, it creates infinite loop:
  // fetchData changes → useEffect runs → fetchData called → 
  // component re-renders → fetchData recreated → useEffect runs again...
}

// Solution: Memoize fetchData
const fetchData = useCallback(async () => {
  const result = await api.getData();
  setData(result);
}, []); // Or include necessary dependencies

// =====================================
// DIFFERENT SCENARIOS
// =====================================

// Scenario 1: Function doesn't use any reactive values
const loadInitialData = useCallback(async () => {
  const data = await fetch('/api/initial-data');
  setData(data);
}, []); // No dependencies

useEffect(() => {
  loadInitialData();
}, [loadInitialData]); // Safe - loadInitialData never changes

// Scenario 2: Function uses reactive values
const loadUserData = useCallback(async () => {
  const data = await fetch(`/api/users/${userId}`); // Uses userId
  setUserData(data);
}, [userId]); // Include userId dependency

useEffect(() => {
  loadUserData();
}, [loadUserData]); // loadUserData changes when userId changes

// Scenario 3: One-time effect only
useEffect(() => {
  // If you really want this to run only once
  fetch('/api/data').then(setData);
}, []); // Define function inline to avoid dependency issues

// =====================================
// YOUR SPECIFIC CASE ANALYSIS
// =====================================

// In your recipe app:
const loadRecipes = useCallback(async () => {
  const newRecipe = {
    id: recipeId,  // 🔍 Uses recipeId
    // ... other properties
  };
  setRecipeId(prev => prev + 1);
  setRecipeList(prevList => [...prevList, newRecipe]);
}, [recipeId]); // Depends on recipeId

// Without [loadRecipes] in useEffect:
useEffect(() => {
  loadRecipes(); // Calls loadRecipes once with initial recipeId
}, []); // Only runs on mount

// Effect: 
// - loadRecipes runs once with recipeId = 3
// - Even if recipeId changes later, loadRecipes won't run again
// - You'll miss subsequent recipe additions

// With [loadRecipes] in useEffect:
useEffect(() => {
  loadRecipes();
}, [loadRecipes]); // Runs whenever loadRecipes changes

// Effect:
// - loadRecipes runs whenever recipeId changes
// - This might cause unexpected behavior if you only want it to run once

// =====================================
// BETTER ALTERNATIVES FOR YOUR CASE
// =====================================

// Option 1: Run only on mount (if that's the intent)
useEffect(() => {
  const loadInitialRecipes = async () => {
    // Load recipes logic here, but only once
  };
  loadInitialRecipes();
}, []); // No external dependencies

// Option 2: Separate concerns
useEffect(() => {
  // Load initial data only once
  loadInitialData();
}, []);

const handleAddRecipe = useCallback(() => {
  // Handle adding recipes separately
}, []);

// Option 3: Use a flag to prevent multiple runs
const [hasLoaded, setHasLoaded] = useState(false);

useEffect(() => {
  if (!hasLoaded) {
    loadRecipes();
    setHasLoaded(true);
  }
}, [loadRecipes, hasLoaded]);

// =====================================
// DEBUGGING MISSING DEPENDENCIES
// =====================================

// Add console logs to see what's happening:
const loadRecipes = useCallback(async () => {
  console.log('🔄 loadRecipes called with recipeId:', recipeId);
  // ... rest of function
}, [recipeId]);

useEffect(() => {
  console.log('🚀 useEffect running');
  loadRecipes();
}, []); // Try with and without [loadRecipes]

// Compare the console output:
// - Without [loadRecipes]: "🚀 useEffect running" appears once
// - With [loadRecipes]: "🚀 useEffect running" appears multiple times

// =====================================
// SUMMARY
// =====================================

// Missing [loadRecipes] in useEffect means:
// ✅ Effect runs only once (on mount)
// ❌ Might use stale values from closure
// ❌ ESLint warning about missing dependency
// ❌ Potential bugs if function logic depends on changing values

// Including [loadRecipes] means:
// ✅ Effect runs whenever loadRecipes changes
// ✅ Always uses current values
// ✅ No ESLint warnings
// ❌ Might run more often than expected

// Best practice: Always include dependencies, then optimize if needed