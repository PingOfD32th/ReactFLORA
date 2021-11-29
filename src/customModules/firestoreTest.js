// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA18lefkC7Nv6nL0kN1cZBA5WLB4IzM84U",
  authDomain: "flora-react-bc0ab.firebaseapp.com",
  projectId: "flora-react-bc0ab",
  storageBucket: "flora-react-bc0ab.appspot.com",
  messagingSenderId: "148233572176",
  appId: "1:148233572176:web:4e4582c79442754bae6655",
  measurementId: "G-B5BGTJ8YV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const products = firebase.firestore().collection('products');
const orders = firebase.firestore().collection('orders');
console.log(products)
console.log(orders)

module.exports = {
    getProducts: function() {
        products.onSnapshot((querySnapshot) => {
            const items = []
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            return items
        })
    },
    addProduct: function() {},
    getProduct: function() {},
    editProduct: function() {},
    deleteProduct: function(){},

    getOrder: function(){},
    placeOrder: function(){},
    editOrder: function(){},

    getMessages: function() {},

    isAdmin: function() {
        return true
    },
    isClerk: function() {},

};