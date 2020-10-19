import React from "react";
import { useDispatch } from "react-redux";
import {
	clearItemFromCart,
	addItem,
	removeItem,
} from "../../redux/cart/cart.actions";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const clear = (item) => dispatch(clearItemFromCart(item));
	const add = (item) => dispatch(addItem(item));
	const remove = (item) => dispatch(removeItem(item));

	const { name, imageUrl, quantity, price } = cartItem;

	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={imageUrl} alt="item " />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div onClick={() => remove(cartItem)} className="arrow">
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div onClick={() => add(cartItem)} className="arrow">
					&#10095;
				</div>
			</span>
			<span className="price">{price}</span>
			<span onClick={() => clear(cartItem)} className="remove-button">
				&#10005;
			</span>
		</div>
	);
};

export default CheckoutItem;
