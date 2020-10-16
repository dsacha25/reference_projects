import ShopActionsTypes from "./shop.types";

const { UPDATE_COLLECTIONS } = ShopActionsTypes;

export const updateCollections = (collectionsMap) => ({
	type: UPDATE_COLLECTIONS,
	payload: collectionsMap,
});
