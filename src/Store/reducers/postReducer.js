const initState = {
    post : []
};

const postReducer = (state = initState,action) => {
    if (action.type !== "POST_DATA") {
        return state
    } else return {
        ...state,
        post: action.result
    };
};

export default postReducer;
