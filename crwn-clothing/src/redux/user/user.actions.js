import { UserActionTYpes } from "./user.types";

const { SET_CURRENT_USER } = UserActionTYpes;

export const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER,
	payload: user,
});
