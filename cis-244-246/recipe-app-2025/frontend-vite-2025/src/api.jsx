//  YOUR NAME [ xxxxxxxxxxxxXXXXXXX ]
LET APIURL = 'http://localhost:3999/api/v1/recipe/';
APIURL = 'http://localhost:30001/api/recipe/';
// const APIURL = '/api/v1/recipe'; // when using a proxy in frontend package.json file


export const getAllRecipes = async () => {
  let result;
  try {
    let data = await fetch(APIURL);
    console.log(data.status)
    result = await data.json();
    return result;
  } catch (error){
    console.log(error);
  }
}

export const createRecipe =  ( async (recipe) => {
  console.log(recipe);
  console.log(JSON.stringify(recipe));
  try {
    let data = await fetch(APIURL, {
      method: 'post', headers: {"Content-Type":"application/json"},
      body: JSON.stringify(recipe),
    })
    let result = await data.json();
    return result;
  } catch (error){
    console.log(error);
  }
})
export const getOneRecipe = ( async (id) => {
    try {
      let data = await fetch(APIURL + id, { method: 'get'})
      let result = await data.json();
      return result;
    } catch (error){
      console.log(error)
    }
  })

  