export const foodFact = {

    async getProduct(id){

        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${id}`)
        const data = await response.json()
        return data 
    },
    async searchProduct(query){
        
        const response = await fetch(`https://world.openfoodfacts.org/cgi/search?${query}`)
        const data = await response.json()
        return data
    },
}