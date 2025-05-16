import { createStore } from 'vuex'
import pokemonData from '../assets/pokemonapi.json';

const testData2 = [];
for (let i = 0; i < 251; i++) {
    testData2.push({
    id: i + 1, 
    name: pokemonData[i].name, 
    category: i > 150 ? "Gen 2" : "Gen 1",
    url: pokemonData[i].url, 
    })
}

const store = createStore({
    /*strict: true,*/
    state() {
        return {
        products: testData2,
        
        productsTotal: 0,
        currentPage: 1,
        pageSize: 8,
        currentCategory: "All"
        }
    },
    getters: {
        productsFilteredByCategory: state => state.products
            .filter(p => state.currentCategory == "All" 
                || p.category == state.currentCategory),
        processedProducts: (state, getters) => {
            let index = (state.currentPage - 1) * state.pageSize;
            return getters.productsFilteredByCategory.slice(index, 
                index + state.pageSize);
        },
        pageCount: (state, getters) =>
            Math.ceil(getters.productsFilteredByCategory.length / state.pageSize),
        categories: state => ["All",
            ...new Set(state.products.map(p => p.category).sort())]        
        
    },
    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },
        setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;
        },
        setCurrentCategory(state, category) {
            state.currentCategory = category;
            state.currentPage = 1;
        },

    },

})
export default store