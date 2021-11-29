import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyA18lefkC7Nv6nL0kN1cZBA5WLB4IzM84U",
    authDomain: "flora-react-bc0ab.firebaseapp.com",
    projectId: "flora-react-bc0ab",
    storageBucket: "flora-react-bc0ab.appspot.com",
    messagingSenderId: "148233572176",
    appId: "1:148233572176:web:4e4582c79442754bae6655",
    measurementId: "G-B5BGTJ8YV4"
  };

class FirebaseService {
	init(success) {
		if (firebase.apps.length) {
			return;
		}
		firebase.initializeApp(firebaseConfig);
		this.analytics = firebase.getAnalytics();
		this.firestore = firebase.firestore();
		success(true);
	}

    getProducts = () => {
        if (!firebase.apps.length) {
			return false;
		}
        console.log("called")
        return new Promise((resolve, reject) => {
			this.firestore
                .collection('products')
                .onSnapshot((querySnapshot) => {
                    const items = []
                    querySnapshot.forEach((doc) => {
                        items.push(doc.data());
                    })
                    resolve(items);
                })
		});
    };

    // example
	getAllUserData = () => {
		if (!firebase.apps.length) {
			return false;
		}
		return new Promise((resolve, reject) => {
			this.db
				.ref(`users`)
				.once('value')
				.then(snapshot => {
					const users = snapshot.val();
					resolve(users);
				});
		});
	};
}

const instance = new FirebaseService();

export default instance;
