import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyALbZkitP7-lfOBRJQuYdC9_z0lmRXDTmY",
	authDomain: "crwn-db-cfbc4.firebaseapp.com",
	databaseURL: "https://crwn-db-cfbc4.firebaseio.com",
	projectId: "crwn-db-cfbc4",
	storageBucket: "crwn-db-cfbc4.appspot.com",
	messagingSenderId: "248921421873",
	appId: "1:248921421873:web:4ada62056ad82ea4b8fd10",
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapshot = await userRef.get();

	console.log(snapshot);

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additonalData,
			});
		} catch (err) {
			console.log("Error creating user", err.message);
		}
	}

	return userRef;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
