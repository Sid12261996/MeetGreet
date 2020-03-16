const initState = {
    user : []
};

const userReducer = (state = initState,action) => {
    if (action.type !== "USERS_DATA") {
        return state
    }
    else {
        return {
            ...state,
            user: action.result
        }
    }
};

export default userReducer;
