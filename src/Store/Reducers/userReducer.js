const initState = {
    user : []
};

const userReducer = (state = initState,action) => {
    switch (action.type) {
        case "USERS_DATA":
          return {
            ...state,
            user: action.result
          };
        default: // need this for default case
          return state 
       }
};

export default userReducer;
