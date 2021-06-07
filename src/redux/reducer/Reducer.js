import * as actionTypes from "../constant/actionTypes";

const initialState = {
  loading: false,
  albums: [],
  photos: [],
  users: [],
  
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
		case actionTypes.GET_ALBUMS:
			return {
				...state,
				albums: action.payload.data	
			}
		case actionTypes.GET_PHOTOS:
			return {
				...state,
				photos: action.payload.data	
			}
		case actionTypes.GET_USERS:
			return {
				...state,
				users: action.payload.data	
			}
			default: return state;
	}
}

export default rootReducer;