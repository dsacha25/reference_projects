import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import { signUpStart } from "../../redux/user/user.actions";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up.styles.scss";

const SignUp = () => {
	const dispatch = useDispatch();
	const signUp = (userCredentials) => dispatch(signUpStart(userCredentials));
	const [credentials, setCredentials] = useState({
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { displayName, email, password, confirmPassword } = credentials;

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		signUp({ displayName, email, password });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setCredentials({ ...credentials, [name]: value });
	};

	const { displayName, email, password, confirmPassword } = credentials;
	return (
		<div className="sign-up">
			<h2 className="title">I do not have an account</h2>
			<span>Sign up with your email and password</span>
			<form className="sign-up-form" onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					label="Display Name"
					required
				/>
				<FormInput
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					label="Email"
					required
				/>
				<FormInput
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					label="Password"
					required
				/>
				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					label="ConfirmPassword"
					required
				/>
				<CustomButton type="submit">SIGN UP</CustomButton>
			</form>
		</div>
	);
};

export default SignUp;

//// NORMAL SIGN UP

// try {
// 	const { user } = await auth.createUserWithEmailAndPassword(
// 		email,
// 		password
// 	);

// 	await createUserProfileDocument(user, { displayName });

// 	setCredentials({
// 		...credentials,
// 		displayName: "",
// 		email: "",
// 		password: "",
// 		confirmPassword: "",
// 	});
// } catch (err) {
// 	console.error(err);
// }
