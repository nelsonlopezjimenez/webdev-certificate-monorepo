const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};


function changeWord(node) {
  const arr = node.textContent.split(" ");
  console.log(arr);
  // for (const word in MATCH_LIST){
    
  // }
  for(let i=0; i < arr.length; i++){
    

    for (const word in MATCH_LIST){
      if (word == arr[i].trim()){
        arr[i] = arr[i].replace(word.trim(), MATCH_LIST[word].trim());
        break;
      }
    }
  }
  node.textContent = arr.join(" ");
}



function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
  if (node.nodeType == Node.TEXT_NODE) {
    console.log(node.textContent);
    changeWord(node);
  }
  for (const child of node.childNodes) {
    transformTextNodes(child);
  }
  
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
