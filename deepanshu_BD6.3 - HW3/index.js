const express = require("express");
const app = express();

app.use(express.json());

const recipes = [
    {
        'id': 1,
        'name': 'Spaghetti Bolognese',
        'cuisine': 'Italian',
        'difficulty': 'Medium'
    },
    {
        'id': 2,
        'name': 'Chicken Tikka Masala',
        'cuisine': 'Indian',
        'difficulty': 'Hard'
    }
];

async function getAllRecipes() {
    return recipes;
}

async function getRecipesById(id) {
    return recipes.find((recipe) => recipe.id === id);
}

async function addRecipe(newRecipe){
    newRecipe.id = recipes.length + 1;
    recipes.push(newRecipe);
    return newRecipe;
}

app.get("/recipes", async (req, res) => {
    res.status(200).json(await getAllRecipes());
});

app.get("/recipes/details/:id", async (req, res) => {
    const id = Number(req.params.id);
    const recipe = await getRecipesById(id);
    if (!recipe) res.status(404).send("No recipe found.");
    res.status(200).json(recipe);
})

app.post("/recipes/new", async (req, res) => {
    const newRecipe = {
        'name': 'Sushi',
        'cuisine': 'Japanese',
        'difficulty': 'Hard'
    };
    res.status(201).json(await addRecipe(newRecipe))
});

module.exports = {
    app,
    getAllRecipes,
    getRecipesById,
    addRecipe
}