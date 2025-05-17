//  imports
import express from 'express';
import cors from 'cors';
import recipeRoutes from './src/routes/recipe.routes.js';
import mongoose from 'mongoose';
import 'dotenv/config';

//  app declaration
const app = express();
const PORT = process.env.PORT || 30000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', recipeRoutes);
app.use('/loadRecipe', recipeRoutes);


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({'error': err.name + ": " + err.message})
    } else if (err) {
        res.status(401).json({ "error": err.name + ": " + err.message})
        console.log(err);
    }
})


//  MongoDB config
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/recipe2025');
mongoose.connection.on('error', () => {
    throw new Error('unable to connect to database: ')
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World!!</h1>')
})


app.listen(PORT, () => {
    console.log('recipe backend server running on port : ' + PORT)
});

