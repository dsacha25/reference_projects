import {
	GOOGLE_SIGN_IN_START,
	SIGN_IN_SUCCESS,
	SIGN_IN_FAILURE,
	EMAIL_SIGN_IN_START,
	CHECK_USER_SESSION,
	SIGN_OUT_START,
	SIGN_OUT_SUCCESS,
	SIGN_UP_START,
	SIGN_UP_FAILURE,
	SIGN_UP_SUCCESS,
} from "./user.types";

export const googleSignInStart = () => ({
	type: GOOGLE_SIGN_IN_START,
});

export const signUpStart = (credentials) => ({
	type: SIGN_UP_START,
	payload: credentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
	type: SIGN_UP_SUCCESS,
	payload: { user, additionalData },
});
export const signUpFailure = (error) => ({
	type: SIGN_UP_FAILURE,
	payload: error,
});

export const signInSuccess = (user) => ({
	type: SIGN_IN_SUCCESS,
	payload: user,
});

export const signInFailure = (error) => ({
	type: SIGN_IN_FAILURE,
	payload: error,
});

export const emailSignInStart = (emailAndPassword) => ({
	type: EMAIL_SIGN_IN_START,
	payload: emailAndPassword,
});

export const checkUserSession = () => ({
	type: CHECK_USER_SESSION,
});

export const signOutStart = () => ({
	type: SIGN_OUT_START,
});

export const signOutSuccess = () => ({
	type: SIGN_OUT_SUCCESS,
});
