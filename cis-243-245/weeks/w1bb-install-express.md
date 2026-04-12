**Week 2 Readings & Other Materials**
-------------------------------------

### **Read**

Installing
==========

Assuming you’ve already installed [Node.js](https://nodejs.org/), create a directory to hold your application, and make that your working directory.

*   [Express 4.x](https://expressjs.com/en/4x/api.html) requires Node.js 0.10 or higher.
*   [Express 5.x](https://expressjs.com/en/5x/api.html) requires Node.js 18 or higher.
```sh
    $ mkdir myapp
    $ cd myapp
```    

Use the `npm init` command to create a `package.json` file for your application. For more information on how `package.json` works, see [Specifics of npm’s package.json handling](https://docs.npmjs.com/files/package.json).

    $ npm init
    

This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

    entry point: (index.js)
    

Enter `app.js`, or whatever you want the name of the main file to be. If you want it to be `index.js`, hit RETURN to accept the suggested default file name.

Now, install Express in the `myapp` directory and save it in the dependencies list. For example:

    $ npm install express
    

To install Express temporarily and not add it to the dependencies list:

    $ npm install express --no-save
    

By default with version npm 5.0+, `npm install` adds the module to the `dependencies` list in the `package.json` file; with earlier versions of npm, you must specify the `--save` option explicitly. Then, afterwards, running `npm install` in the app directory will automatically install modules in the dependencies list.

### **Read** Express from scracth

*   Ensure your Verdaccio server is running
*   make a folder with: `$ mkdir myExpress-Date`
*   navigate to your folder and run: `$ npm init -y`
*   add `"type":"module"` to your package.json
*   run `$ npm install` for
    *   express
    *   nodemon
    *   morgan (optional)
*   create an index.js and make your server
*   Add start Scripts
    
    If using nodemon, add a start script to your package.json
```sh    
    "scripts": {
        "start": "nodemon index.js",
    },
```    
    If not using nodemon
```sh    
    "scripts": {
        "start": "node index.js",
    },
```
    

If you cannot install morgan, or want more control over what you see in the console, place the following code below your exports and above the routes in your index.js file.
```js
//log function that replicates morgan
function log(request, response, next){
    console.log(request.url);
    next();
};
app.use(log)
```
### The most basic express server
```js
import express from 'express'; 
const PORT = 3000;
const app = express()
app.get('/',(request, response) => {  
   res.send('hello World')  
});
app.listen(PORT, () => {  
   console.log(\`listening on port ${PORT}\`)  
});
```

The most basic express server with logging middleware (morgan replacement)
```js
import express from 'express'; 
const PORT = 3000;
const app = express();
function log(request, response, next){
    console.log(request.url);
    next();
};
app.use(log);
app.get('/',(request, response) => {  
   res.send('hello World')  
});
app.listen(PORT, () => {  
   console.log(\`listening on port ${PORT}\`)  
});
```
### **Watch**

### **Explore**

*   Explore: [https://fakerjs.dev/](https://fakerjs.dev/)
*   Explore: [https://fakerjs.dev/api/](https://fakerjs.dev/api/)
*   Explore: [https://expressjs.com](https://expressjs.com)
*   Explore: [https://expressjs.com/en/starter/hello-world.html](https://expressjs.com/en/starter/hello-world.html)
*   [https://expressjs.com/en/starter/basic-routing.html](https://expressjs.com/en/starter/basic-routing.html)
*   [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)

