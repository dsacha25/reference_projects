import React, { useState } from "react";
// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { useDispatch } from "react-redux";
import {
	googleSignInStart,
	emailSignInStart,
} from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in.styles.scss";

const SignIn = () => {
	const dispatch = useDispatch();

	const googleSignIn = () => dispatch(googleSignInStart());
	const emailSignIn = (email, password) =>
		dispatch(emailSignInStart({ email, password }));

	const [credentials, setCredentials] = useState({
		email: "init@user.com",
		password: "asdqwe",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { email, password } = credentials;

		emailSignIn(email, password);
		// try {
		// 	await auth.signInWithEmailAndPassword(email, password);
		// 	setCredentials({ ...credentials, email: "", password: "" });
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	const handleChange = (e) => {
		const { value, name } = e.target;

		setCredentials({ ...credentials, [name]: value });
	};

	return (
		<div className="sign-in">
			<h2 className="title">I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					type="email"
					name="email"
					autoComplete="email"
					value={credentials.email}
					handleChange={handleChange}
					label="Email"
					required
				/>
				<FormInput
					type="password"
					name="password"
					autoComplete="current-password"
					value={credentials.password}
					handleChange={handleChange}
					label="Password"
					required
				/>
				<div className="buttons">
					<CustomButton type="submit" value="Submit Form">
						Sign In
					</CustomButton>
					<CustomButton type="button" onClick={googleSignIn} isGoogleSignIn>
						Sign In with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
