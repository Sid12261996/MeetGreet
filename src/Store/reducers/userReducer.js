const initState = {
    user : [],
    token : []
};

const userReducer = (state = initState,action) => {
    if (action.type !== "USERS_DATA") {
        return state
    }
    else {
        return {
            ...state,
            user: action.result,
            token: action.token
        }
    }
};

export default userReducer;
