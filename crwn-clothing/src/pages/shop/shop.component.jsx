import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const ShopPage = ({ match }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchStart = () => dispatch(fetchCollectionsStart());

		fetchStart();
	}, [dispatch]);

	return (
		<div className="shop-page">
			<Route
				exact
				path={`${match.path}`}
				component={CollectionsOverviewContainer}
			/>
			<Route
				path={`${match.path}/:collectionId`}
				component={CollectionPageContainer}
			/>
		</div>
	);
};

export default ShopPage;

// const { updateCollections } = this.props;

// const collectionRef = firestore.collection("collections");
// this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
// 	async (snapshot) => {
// 		const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
// 		updateCollections(collectionsMap);
// 		this.setState({ isLoading: false });
// 	}
// );
