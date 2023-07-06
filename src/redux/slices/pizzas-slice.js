import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {itemsAPI} from "../../api/api";
export const fetchItems = createAsyncThunk(
    'pizzas/fetchItemsStatus',
    async (params) => {
        const {categoryId,sortCategory,conditionSort,searchValue,currentPage} = params;
        const response = await itemsAPI.getItems(categoryId, sortCategory, conditionSort, searchValue, currentPage)
        return response.data
    }
)
const initialState = {
    items: [],
    status: 'loading',
}


export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchItems.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        } ,
        [fetchItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchItems.rejected]: (state) => {
            state.items = []
            state.status = 'error'
        }
    }
})
export const selectPizzaData = state => state.pizzas;
export const { setItems} = pizzasSlice.actions
export default pizzasSlice.reducer