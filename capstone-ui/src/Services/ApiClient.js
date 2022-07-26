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
            console.error({errorResponse: err.response})
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

    async recipeById(recipeId){
        return await this.request({endpoint: `recipe/${recipeId}`, method: `GET`, data:recipeId})}

    async savedRecipe(recipeId,creds){
        return await this.request({endpoint: `savedrecipe/create`, method: `POST`, data:recipeId,creds})}  
    
    async getUsersSavedRecipes(){
        return await this.request({endpoint: `savedrecipe`, method: `GET`})
    }

    async getUserCreatedRecipes(){
        return await this.request({endpoint: `recipe`, method: `GET`})
    }

    async handleFollow(user_id, followed_id){
        return await this.request({endpoint: `follow/create`, method: `POST`, data: {"followed_id" : followed_id, "following_id" : user_id}})
    }

    async updateProfile(creds){
        return await this.request({endpoint: `auth/update`, method: `PUT`, data:creds})}

    async updatePassword(creds){
        return await this.request({endpoint: `auth/update/password`, method: `PUT`, data:creds})}
}

export default new ApiClient("http://localhost:3001")