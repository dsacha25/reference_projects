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

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();

	objectsToAdd.forEach((obj) => {
		const newDocRef = collectionRef.doc();

		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});

	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};

export const getUserCartRef = async (userId) => {
	const cartsRef = firestore.collection("carts").where("userId", "==", userId);
	const snapShot = await cartsRef.get();

	if (snapShot.empty) {
		const cartDocRef = firestore.collection("carts").doc();
		await cartDocRef.set({ userId, cartItems: [] });
		return cartDocRef;
	} else {
		return snapShot.docs[0].ref;
	}
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
