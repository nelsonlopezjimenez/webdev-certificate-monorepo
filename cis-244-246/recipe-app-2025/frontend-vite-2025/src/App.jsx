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
        <List recipeList={recipeListObj} />
        <Recipe />
        <Form/>
        <pre>
        <div>
    <div><span>import</span><span> { useState, useEffect, useLayoutEffect } </span><span>from</span> <span>"react"</span><span>;</span></div>
    <div><span>import</span> <span>"./App.css"</span><span>;</span></div>
    <div><span>// ------- recipeList array local recipeList stored</span></div>
    <div><span>const</span><span> recipeListObj = {</span></div>
    <div><span>&nbsp; recipeList: [</span></div>
    <div><span>&nbsp; &nbsp; {</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; id: </span><span>0</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; title: </span><span>"Spaghetti"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; instructions:</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>"Open jar of Spaghetti sauce. &nbsp;Bring to simmer. &nbsp;Boil water. &nbsp;Cook pasta until done. &nbsp;Combine pasta and sauce"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; ingredients: [</span><span>"pasta"</span><span>, </span><span>"8 cups water"</span><span>, </span><span>"1 box spaghetti"</span><span>],</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; img: </span><span>"spaghetti.jpg"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; },</span></div>
    <div><span>&nbsp; &nbsp; {</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; id: </span><span>1</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; title: </span><span>"Milkshake"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; instructions: </span><span>"Combine ice cream and milk. &nbsp;Blend until creamy"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; ingredients: [</span><span>"2 Scoops Ice cream"</span><span>, </span><span>"8 ounces milk"</span><span>],</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; img: </span><span>"milkshake.jpg"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; },</span></div>
    <div><span>&nbsp; &nbsp; {</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; id: </span><span>2</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; title: </span><span>"Avocado Toast"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; instructions:</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>"Toast bread. &nbsp;Slice avocado and spread on bread. &nbsp;Add salt, oil, and pepper to taste."</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; ingredients: [</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>"2 slices of bread"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>"1 avocado"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>"1 tablespoon olive oil"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>"1 pinch of salt"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>"pepper"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; ],</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; img: </span><span>"avocado_toast.jpg"</span><span>,</span></div>
    <div><span>&nbsp; &nbsp; },</span></div>
    <div><span>&nbsp; ],</span></div>
    <div><span>&nbsp; nextRecipeId: </span><span>3</span><span>,</span></div>
    <div><span>};</span></div>
    <div><span>function</span><span> App() {</span></div>
    <div><span>&nbsp; </span><span>const</span><span> [recipeList, setRecipeList] = useState(recipeListObj);</span></div>
    <br />
    <div><span>&nbsp; </span><span>return</span><span> (</span></div>
    <div><span>&nbsp; &nbsp; </span><span>&lt;&gt;</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; </span><span>&lt;</span><span>div</span> <span>className</span><span>=</span><span>"App"</span><span>&gt;</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>&lt;</span><span>h1</span> <span>style</span><span>=</span><span>{</span><span>{ display: </span><span>"flex"</span><span>, justifyContent: </span><span>"center"</span><span> }</span><span>}</span><span>&gt;</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; My Recipes 2025</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>&lt;/</span><span>h1</span><span>&gt;</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>&lt;</span><span>List</span> <span>recipeList</span><span>=</span><span>{</span><span>recipeListObj</span><span>}</span> <span>/&gt;</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>&lt;</span><span>Recipe</span> <span>/&gt;</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; &nbsp; </span><span>&lt;</span><span>Form</span><span>/&gt;</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; </span><span>&lt;/</span><span>div</span><span>&gt;</span></div>
    <div><span>&nbsp; &nbsp; </span><span>&lt;/&gt;</span></div>
    <div><span>&nbsp; );</span></div>
    <div><span>}</span></div>
    <div><span>function</span><span> List(props) {</span></div>
    <div><span>&nbsp; console.log(props.recipeList);</span></div>
    <div><span>&nbsp; </span><span>return</span> <span>&lt;</span><span>h2</span><span>&gt;</span><span>List of Recipes</span><span>&lt;/</span><span>h2</span><span>&gt;</span><span>;</span></div>
    <div><span>}</span></div>
    <div><span>function</span><span> Recipe(props) {</span></div>
    <div><span>&nbsp; console.log(props)</span></div>
    <div><span>&nbsp; </span><span>return</span><span> (</span></div>
    <div><span>&nbsp; &nbsp; </span><span>&lt;</span><span>div</span> <span>className</span><span>=</span><span>"recipe-card"</span><span>&gt;</span></div>
    <div><span>&nbsp; &nbsp; &nbsp; </span><span>&lt;</span><span>h1</span><span>&gt;</span><span>Recipe</span><span>&lt;/</span><span>h1</span><span>&gt;</span></div>
    <div><span>&nbsp; &nbsp; </span><span>&lt;/</span><span>div</span><span>&gt;</span></div>
    <div><span>&nbsp; );</span></div>
    <div><span>}</span></div>
    <div><span>function</span><span> Form (props){</span></div>
    <div><span>&nbsp; </span><span>return</span><span> (</span></div>
    <div><span>&nbsp; &nbsp; </span><span>&lt;</span><span>h2</span><span>&gt;</span><span>Form</span><span>&lt;/</span><span>h2</span><span>&gt;</span></div>
    <div><span>&nbsp; )</span></div>
    <div><span>}</span></div>
    <br />
    <div><span>export</span> <span>default</span><span> App;</span></div>
</div>
        </pre>
      </div>
    </>
  );
}
function List(props) {
  console.log(props.recipeList);
  return <h2>List of Recipes</h2>;
}
function Recipe(props) {
  console.log(props)
  return (
    <div className="recipe-card">
      <h1>Recipe</h1>
    </div>
  );
}
function Form (props){
  return (
    <h2>Form</h2>
  )
}

export default App;
