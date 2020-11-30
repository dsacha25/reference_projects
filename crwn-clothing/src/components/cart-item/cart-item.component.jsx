import React, { memo } from "react";

import "./cart-item.styles.scss";
import {
	CartItemContainer,
	ItemDetailsContainer,
	CartItemImage,
} from "./cart-item.styles";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
	return (
		<CartItemContainer>
			<CartItemImage src={imageUrl} alt="item" />
			<ItemDetailsContainer>
				<span className="name">{name}</span>
				<span className="price">
					{quantity} x ${price}
				</span>
			</ItemDetailsContainer>
		</CartItemContainer>
	);
};

export default memo(CartItem);
