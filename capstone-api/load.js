const db= require("./db")
const axios = require("axios")
const API_KEY = "2a77b9d5eecd482eab7f38f99c11a789"
var offset = 0

const loadDataIntoDb = async (recipefact) => {
    const result = await db.query(`
    INSERT INTO recipe (
        name,
        category,
        description,
        instructions,
        ingredients,
        calories,
        image_url,
        user_id,
        api_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (api_id) DO NOTHING
        RETURNING id, name, category,description, instructions, ingredients, calories, image_url, user_id,created_at, updated_at;
        `,
        [recipefact.name, recipefact.category, recipefact.description, recipefact.instructions,recipefact.ingredients, recipefact.calories,recipefact.image_url, recipefact.user_id, recipefact.api_id]
        )
        return result.rows[0]
    }

const getDataFromApi = async () => {
    //recipe name, instructions, ingredients, category, description, calories, image_url, user_id
    // duy's api key 2a77b9d5eecd482eab7f38f99c11a789 //147 points today
    // anthony's api key 82535f96b27445859009f285f540d76d
    try {
        const results = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=82535f96b27445859009f285f540d76d&number=30&type=dessert&instructionsRequired=true&addRecipeInformation=true`)
        results.data.results.map(async (res) => {
            var ingredientsString = ""
            const stepsArr = res.analyzedInstructions[0]?.steps
            stepsArr?.map((step) => {
                ingredientsString += ", " + step.ingredients.map(obj => obj.name).join(", ");
            })
            const name = res?.title
            const description = res?.summary?.split('Overall')[0]
            const arr = res?.summary?.split(' ')
            var calories = parseInt(arr[arr?.indexOf('calories</b>,') - 1]?.replace("<b>", ""))
            if (isNaN(calories)) calories = parseInt(arr[arr?.indexOf('calories</b>.') - 1]?.replace("<b>", ""))
            const image_url = res?.image
            const instructions = res?.analyzedInstructions[0]?.steps
            const instructionString = instructions?.map(obj => obj.step).join(" ")
            const category = res?.dishTypes.join(', ')
            const recipefact = {
                name: name.trim(),
                category: category,
                description: description,
                instructions: instructionString,
                ingredients: ingredientsString.substring(2),
                api_id: res.id,
                calories: calories,
                image_url: image_url,
                user_id: 1
            }
            console.log(recipefact)
            const result = await loadDataIntoDb(recipefact)
        })
    } catch(err){
        console.log(err)
    } 
}



getDataFromApi()