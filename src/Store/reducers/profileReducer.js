const initState = {
    cropImage : null,
    cropImageName: "default"
};

const profileReducer = (state = initState,action) => {
    if (action.type === "CROP_DATA") {
        return {
            ...state,
            cropImage: action.cropImage,
            cropImageName: action.cropImageName
        }
    }
    else {
        return state
    }
};

export default profileReducer;
