import React, { useEffect, useState, useContext } from 'react';
import firebase from '../customModules/firestoreTest1';
import { CartContext } from '../context/cartContext';
// then firebase.getProducts

function Products() {
  const [firestoreData, setFirestoreData] = useState([]);  
  useEffect(()=>{
    (async () => {
      firebase.getProducts().then(item => {
        setFirestoreData(item)
      })
    })()
  }, [])
  
  return (
    <div>
    <div className="seachbar_wrapper">
        <div className="searchbar">
          <div>
            {/* {firestoreData.map(({itemName, itemDesc}) => (
            <p>{itemName, itemDesc}</p>
          ))} */}
          </div>
        </div>
      </div>
      <br />
      <div className="wrapper">
        {
          firestoreData.map(({itemName, itemPrice, itemPic}) => (
            <Card
            img={itemPic}
            title={itemName}
            price={itemPrice}
            />
          ))}
      </div>
    </div>
  );
}

function Card(props) {
  const [cart, setCart] = useContext(CartContext);
  return (
    <div className="card">
      <img src={props.img} className="card__img" />
      <div className="card__body">
        <h2 className="card__title">{props.title}</h2>
        <p className="card__description">{props.description}</p>
        <h3 className="card__price">{props.price}</h3>
        <button className="card__btn" onClick={e => setCart(props)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Products