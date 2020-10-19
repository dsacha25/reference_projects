import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { useHistory } from "react-router-dom";

const CartDropdown = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const dispatchToggle = () => dispatch(toggleCartHidden());

	const cartItems = useSelector((state) => selectCartItems(state));
	return (
		<div className="cart-dropdown">
			<div className="cart-items">
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} item={cartItem} />
					))
				) : (
					<span className="empty-message">Your cart is empty</span>
				)}
			</div>

			<CustomButton
				onClick={() => {
					history.push("/checkout");
					dispatchToggle();
				}}
			>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	);
};

export default CartDropdown;
