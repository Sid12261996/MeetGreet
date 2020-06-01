const initState = {
    post: []
};

const postReducer = (state = initState, action) => {
    if (action.type === "POST_DATA") {
        return {
            ...state,
            post: action.post
        }
    } else {
        return state
    };
};

export default postReducer;
