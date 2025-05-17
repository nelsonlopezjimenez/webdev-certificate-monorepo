import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Name cannot be blank!',
    },
    instruction: {
      type: String,
      required: 'Instructions cannot be blank!',
    },
    ingredient: {
      type: [String],
      default: [],
    },
    img: {
      type: String,
      required: 'Image cannot be blank!',
    },
    isLogged: {
      type: Boolean,
      default: false,
    },
  },
  { toObject: { virtuals: true } }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
