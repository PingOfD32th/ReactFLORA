import React, { useEffect, useState, useContext } from 'react';
import firebase from '../customModules/firestoreTest1';
import { CartContext } from '../context/cartContext';
// then firebase.getProducts

function Products() {
  const [firestoreData, setFirestoreData] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');  
  useEffect(()=>{
    (async () => {
      firebase.getProducts().then(item => {
        setFirestoreData(item)
      })
    })()
  }, [])
  
  return (
    <div>
      <div className="wrapper seachbar_wrapper">
        <div>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /><span onClick={e => setSearchTerm('')}>X</span>
        </div>
      </div>
      <div className="wrapper">
        {
          firestoreData.filter((val)=>{
            if (searchTerm == '') {
              return val;
            } else if (val.itemName.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val;
            }
          }).map(({itemName, itemPrice, itemPic}) => (
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
  const { setCart } = useContext(CartContext);
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