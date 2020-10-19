import ShopActionsTypes from "./shop.types";

const {
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
	FETCH_COLLECTIONS_FAIL,
} = ShopActionsTypes;

const INITIAL_STATE = {
	collections: null,
	isFetching: false,
	errorMessage: "",
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		// case UPDATE_COLLECTIONS:
		// 	return {
		// 		...state,
		// 		collections: action.payload,
		// 	};
		case FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true,
			};
		case FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				collections: action.payload,
			};
		case FETCH_COLLECTIONS_FAIL:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};

		default:
			return state;
	}
};
export default shopReducer;
