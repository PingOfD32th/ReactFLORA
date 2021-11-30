import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA18lefkC7Nv6nL0kN1cZBA5WLB4IzM84U",
    authDomain: "flora-react-bc0ab.firebaseapp.com",
    projectId: "flora-react-bc0ab",
    storageBucket: "flora-react-bc0ab.appspot.com",
    messagingSenderId: "148233572176",
    appId: "1:148233572176:web:4e4582c79442754bae6655",
    measurementId: "G-B5BGTJ8YV4"
  };

const firestore = firebase.initializeApp(firebaseConfig).firestore();


// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }


// Initialize Firebase

const products = firestore.collection('products');
const orders = firestore.collection('orders');
const orderCount = firestore.collection('miscData').doc("orderCount")
let newOrderCount = 0
class FirebaseService {
    getProducts = () => {
        return new Promise(function(resolve, reject) {
            products.onSnapshot((querySnapshot) => {
                const items = []
                querySnapshot.forEach((doc) => {
                    items.push(doc.data());
                })
                resolve(items)
            })
        })
    }
    addProduct = (data) => {
         products.add({
            itemName: data.itemName,
            itemDesc: data.itemDescription,
            itemLink: data.itemLink,
            itemPic: data.itemPicture,
            itemPrice: data.itemPrice,
            itemGLCode: data.itemGLCode,
            itemVendor: data.itemVendor
          });
          
    }
    getLastOrderNumber = () => {
        return new Promise(function(resolve,reject) {
            orderCount.onSnapshot((querySnapshot) =>{
                let count = querySnapshot.data().count
                newOrderCount = count
                resolve(count)
            })
        })
    }
    // getProduct: function() {},
    // editProduct: function() {},
    // deleteProduct: function(){},

    // getOrder: function(){},
    placeOrder = (data) => {
        orders.add({
            ordernumber: newOrderCount,
            cartItems: data.item,
            cartPrice: data.total,
            regionalApproved: false,
            regionalDenied: false,
            vpApproved: false,
            vpDenied: false,
            clerkApproved: false,
            clerkDenied: false,
            regionalNotes: null,
            vpNotes: null,
            clerkNotes: null,
            poNumber: null,
        })
    }
    // editOrder: function(){},

    // getMessages: function() {},

    // isAdmin: function() {
    //     return true
    // },
    // isClerk: function() {},

};
const instance = new FirebaseService();

export default instance;