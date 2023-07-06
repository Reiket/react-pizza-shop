import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: 0,
    searchValue: '',
    sort: {
        sortId: 0,
        sortCategory: '',
    },
    currentPage: 1,
}


export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setFilters(state, action) {
            state.sort.sortCategory = action.payload.sortCategory;
            state.categoryId = Number(action.payload.categoryId);
            state.currentPage = Number(action.payload.currentPage);
        },
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            const { sortId, sortCategory } = action.payload;
            state.sort.sortId = sortId;
            state.sort.sortCategory = sortCategory;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        }
    },
})
export const selectSort = (state) => state.filter.sort;
export const selectFilter = state => state.filter;
export const { setCategoryId,setSearchValue, setFilters,  setSort,setCurrentPage} = filterSlice.actions

export default filterSlice.reducer