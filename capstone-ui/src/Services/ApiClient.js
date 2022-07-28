import axios from "axios"

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "reciholic_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({endpoint, method ='GET', data= {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json",
            Authorization: this.token ? `Bearer ${this.token}` : "",
        }

        try {
            const res = await axios({url, method, data, headers})
            return {data: res.data, error: null}
        } catch (err) {
            
            const message = err?.response?.data?.error?.message
            return {data: null, error: message || String(err)}
        }
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }
    async loginUser(creds) {
        return await this.request({endpoint: `auth/login`, method: `POST`, data:creds})
    }
    async signupUser(creds) {
        return await this.request({endpoint: `auth/register`, method: `POST`, data:creds})
    }
    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
    // the function that searches the backend for recipes
    async recipeSearch(searchWord, filter){
        return await this.request({ endpoint: `search?searchtype=recipe&searchword=${searchWord}&filter=${filter}`, method: `GET`, data:{} })
    }

    // the function that searches the backend for users
    async userSearch(searchWord){
        return await this.request({ endpoint: `search?searchtype=users&searchword=${searchWord}`, method: `GET`, data:{} })
    }

    // the function that retrieves recipes with a specific filter
    async recipeCategory(currCategory){
        return await this.request({ endpoint: `search/recipes?category=${currCategory}`, method: `GET`, data:{} })
    }

    async getRecommended(){
        return await this.request({ endpoint: `recipe/random`, method: `GET`})
    }

    async recipeCreate(recipe){
        return await this.request({endpoint: `recipe/create`, method: `POST`, data:recipe})
    }

    async recipeDelete(recipe){
        return await this.request({endpoint: `recipe/delete/${recipe}`, method: `DELETE`})
    }

    async recipeById(recipeId){
        return await this.request({endpoint: `recipe/${recipeId}`, method: `GET`, data:recipeId})
    }

    async createMealPlan(mealplan){
        return await this.request({endpoint: `mealplanner/create`, method: `POST`, data:mealplan}) 
    }

    async getMealPlan(){
        return await this.request({endpoint: `mealplanner/`, method: `GET`})
    }

    async deleteMealPlan(mealplan){
        return await this.request({endpoint: `mealplanner/delete/${mealplan}`, method: `DELETE`})
    }

    async deleteAllMealPlan(){
        return await this.request({endpoint: `mealplanner/deleteall`, method: `DELETE`})
    }

    async savedRecipe(recipeId){
        return await this.request({endpoint: `savedrecipe/create`, method: `POST`, data:recipeId})
    }  
    
    async getUsersSavedRecipes(){
        return await this.request({endpoint: `savedrecipe`, method: `GET`})
    }

    async getUserCreatedRecipes(){
        return await this.request({endpoint: `recipe`, method: `GET`})
    }

    async handleFollow(user_id, followed_id){
        return await this.request({endpoint: `follow/create`, method: `POST`, data: {"followed_id" : followed_id, "following_id" : user_id}})
    }

    async getProfileDetails(profileId, user_id){
        return await this.request({endpoint: `profile/${profileId}`, method: `GET`, data: {}})
    }

    async getProfileSaved(profileId){
        return await this.request({endpoint: `profile/saved/${profileId}`, method: `GET`, data: {}})
    }

    async getProfileOwned(profileId){
        return await this.request({endpoint: `profile/owned/${profileId}`, method: `GET`, data: {}})
    }

    async getProfileFollowers(profileId){
        return await this.request({endpoint: `profile/followed/${profileId}`, method: `GET`, data: {}})
    }

    async getProfileFollowing(profileId){
        return await this.request({endpoint: `profile/following/${profileId}`, method: `GET`, data: {}})
    }
    async updateProfile(creds){
        return await this.request({endpoint: `auth/update`, method: `PUT`, data:creds})}

    async updatePassword(creds){
        return await this.request({endpoint: `auth/update/password`, method: `PUT`, data:creds})
    }

    // the function that retrieves recipes with a specific filter
    async recipeRecent(){
        return await this.request({ endpoint: `search/recent`, method: `GET`, data:{} })
    }

    // the function that retrieves recipes with a specific filter
    async getRandomUser(){
        return await this.request({ endpoint: `search/user`, method: `GET`, data:{} })
    }

    // the function that retrieves recipes with a specific filter
<<<<<<< Updated upstream
    async deleteUser(creds){
        return await this.request({ endpoint: `auth/delete`, method: `DELETE`, data:{creds}})
=======
    async getSuggestion(word){
        return await this.request({ endpoint: `mealplanner/suggestion/${word}`, method: `GET`, data:{} })
    }

    // the function that retrieves recipes with a specific filter
    async getRecipeIdByName(name){
        return await this.request({ endpoint: `mealplanner/getid/${name}`, method: `GET`, data:{} })
>>>>>>> Stashed changes
    }
}

export default new ApiClient("http://localhost:3001")