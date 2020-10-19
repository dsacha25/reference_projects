import {
	firestore,
	convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import ShopActionsTypes from "./shop.types";

const {
	FETCH_COLLECTIONS_START,
	FETCH_COLLECTIONS_SUCCESS,
	FETCH_COLLECTIONS_FAIL,
} = ShopActionsTypes;

// export const updateCollections = (collectionsMap) => ({
// 	type: UPDATE_COLLECTIONS,
// 	payload: collectionsMap,
// });

export const fetchCollectionsStart = () => ({
	type: FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
	type: FETCH_COLLECTIONS_FAIL,
	payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
	return (dispatch) => {
		const collectionRef = firestore.collection("collections");
		dispatch(fetchCollectionsStart());

		collectionRef
			.get()
			.then((snapshot) => {
				const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
				dispatch(fetchCollectionsSuccess(collectionsMap));
			})
			.catch((err) => {
				dispatch(fetchCollectionsFailure(err.message));
			});
	};
};
