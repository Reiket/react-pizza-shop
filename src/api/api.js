import axios from "axios";
export const itemsAPI = {
    getItems (index, sort, conditionSort, search, currentPage) {
        return axios.get(`https://6489e5855fa58521cab06ffb.mockapi.io/items?${index === 0 ? '' : 'category=' + index}&sortBy=${sort}&order=${conditionSort ? "asc" : "desc"}&search=${search ? search : ""}&limit=4&page=${currentPage}`)
    },
    getItemsById(id) {
        return axios.get('https://6489e5855fa58521cab06ffb.mockapi.io/items/' + id)
    }
}











