const fruit = {
  name: 'apple',
  color: 'red',
  price: 0.99
};

for (const prop in fruit) {
  console.log(fruit[prop]);
}

for (const [key, value] of Object.entries(fruit)){
    console.log(key, value)
}