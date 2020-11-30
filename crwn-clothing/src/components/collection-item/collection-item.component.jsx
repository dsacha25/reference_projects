import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import {
	AddButton,
	BackgroundImage,
	CollectionFooterContainer,
	CollectionItemContainer,
	NameContainer,
	PriceContainer,
} from "./collection-item.styles";

const CollectionItem = ({ item }) => {
	const dispatch = useDispatch();
	const add = (item) => dispatch(addItem(item));
	const { name, price, imageUrl } = item;

	return (
		<CollectionItemContainer>
			<BackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />
			<CollectionFooterContainer>
				<NameContainer>{name}</NameContainer>
				<PriceContainer>{price}</PriceContainer>
			</CollectionFooterContainer>
			<AddButton onClick={() => add(item)} inverted>
				Add to cart
			</AddButton>
		</CollectionItemContainer>
	);
};

export default CollectionItem;
