import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/header/header.component";

// import HomePage from "./pages/homepage/homepage.component";
// import ShopPage from "./pages/shop/shop.component";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
// import CheckoutPage from "./pages/checkout/checkout.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Spinner from "./components/spinner/spinner.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUpPage = lazy(() =>
	import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

const App = () => {
	const dispatch = useDispatch();

	const currentUser = useSelector((state) => selectCurrentUser(state));

	useEffect(() => {
		const checkUser = () => dispatch(checkUserSession());

		checkUser();

		//eslint-disable-next-line
	}, []);

	return (
		<div>
			<Header />
			<Switch>
				<ErrorBoundary>
					<Suspense fallback={<Spinner />}>
						<Route exact path="/" component={HomePage} />
						<Route path="/shop" component={ShopPage} />
						<Route exact path="/checkout" component={CheckoutPage} />
						<Route
							exact
							path="/signin"
							render={() =>
								currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
							}
						/>
					</Suspense>
				</ErrorBoundary>
			</Switch>
		</div>
	);
};

export default App;

///// FIREBASE OBSERVER STYLE
// useEffect(() => {
// const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
// 	if (userAuth) {
// 		const userRef = await createUserProfileDocument(userAuth);
// 		userRef.onSnapshot((snapshot) => {
// 			setCurrentUser({
// 				currentUser: {
// 					id: snapshot.id,
// 					...snapshot.data(),
// 				},
// 			});
// 		});
// 	}
// 	setCurrentUser(userAuth);
// });
// return () => {
// 	unsubscribeFromAuth();
// };
// }, []);
