// # usage -- for named arguments
// node script.js --name "John" --age 25 --city "Seattle"

// # usage - for short flags
// node script.js -n "John" -a 25 -c "Seattle"

// parseArgs.js
const args = process.argv.slice(2);
const params = {};

for (let i = 0; i < args.length; i += 2) {
  const key = args[i].replace(/^--?/, ''); // Remove - or --
  const value = args[i + 1];
  params[key] = value;
}

console.log(params);
// { name: 'John', age: '25', city: 'Seattle' }