const categoriesReducer = (state, action) => {
    switch(action.type) {
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
            default:
                return state;
    }
}

export default categoriesReducer;