import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { clearCart, setCartFromFirebase } from "./cart.actions";
import CartActionTypes from "./cart.types";
import { selectCartItems } from "./cart.selectors";

import { SIGN_OUT_SUCCESS, SIGN_IN_SUCCESS } from "../user/user.types";
import { selectCurrentUser } from "../user/user.selectors";

import { getUserCartRef } from "../../firebase/firebase.utils";

const { ADD_ITEM, CLEAR_ITEM_FROM_CART, REMOVE_ITEM } = CartActionTypes;

export function* clearCartOnSignOut() {
	yield put(clearCart());
}

export function* onSignOutSuccess() {
	yield takeLatest(SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* updateCartInFirebase() {
	const currentUser = yield select(selectCurrentUser);
	if (currentUser) {
		try {
			const cartRef = yield getUserCartRef(currentUser.id);
			const cartItems = yield select(selectCartItems);
			yield cartRef.update({ cartItems });
		} catch (err) {
			console.log(err);
		}
	}
}

export function* onUserSignIn() {
	yield takeLatest(SIGN_IN_SUCCESS, checkCartFromFirebase);
}

export function* checkCartFromFirebase({ payload: user }) {
	const cartRef = yield getUserCartRef(user.id);
	const cartSnapshot = yield cartRef.get();
	yield put(setCartFromFirebase(cartSnapshot.data().cartItems));
}

export function* onCartChange() {
	yield takeLatest(
		[ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM_FROM_CART],
		updateCartInFirebase
	);
}

export function* cartSagas() {
	yield all([call(onSignOutSuccess), call(onCartChange), call(onUserSignIn)]);
}
