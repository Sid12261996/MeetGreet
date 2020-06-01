const initState = {
    user : {},
    token : []
};

const userReducer = (state = initState,action) => {
    if (action.type === "USERS_DATA") {
        return {
            ...state,
            user: action.user,
            token: action.token
        }
    }
    else {
        return state
    }
};

export default userReducer;
