import React, { useState, useContext, useEffect } from 'react';
import firebase from '../customModules/firestoreTest1';
import { CartContext } from '../context/cartContext';

function Checkout() {
  const { cart, clearCart } = useContext(CartContext)
  const [glcodes, setGlcodes] = useState([])
  const [inputs, setInputs] = useState({})
  const [firestoreData, setFirestoreData] = useState([]); 
  useEffect(()=>{
    (async () => {
      firebase.getLastOrderNumber().then(item => {
        setFirestoreData(item)
        cart.orderNumber = item + 1
      })
    })()
  }, [])
  useEffect(()=>{
    let GlcodeObj = [];
    let glcodes = [];
    cart.item.map(item=> glcodes.push(item.glcode));
    glcodes.filter((v, i, a) => a.indexOf(v) === i).map(itemglcode=>{
      let total = 0;
      cart.item.filter(val => val.glcode == itemglcode).map(item=> {
        total = total + (item.price * item.count);
      });
      GlcodeObj.push({name: itemglcode, amount: total});
    });
    setGlcodes(GlcodeObj);
  }, [cart])

  const handleSubmit = (event) => {
    firebase.placeOrder(cart)
    clearCart()
  }

  return (
    <div className='checkout'>
      <br />
      <div className='checkoutWrapper'>
      <div className="checkoutCardWrapper">
        {cart.vendors.map(vendor => (
          <fieldset>
          <legend>{vendor}</legend>
          {cart.item.filter(val => val.vendor == vendor).map(item=>(
            <Card
              img={item.img}
              title={item.title}
              price={item.price}
              amount={item.count}
              vendor={item.vendor}
              glcode={item.glcode}
            />
          ))}
          </fieldset>
        ))}
      </div>
      <br />
      <div className="checkoutFooter right">
        <table style={{ width: '100%', textAlign: 'center' }} border={'1'}>
          <tr>
            <th>GLCode</th>
            <th>Amount</th>
          </tr>
          {glcodes.map(item=>(
            <tr>
              <td>{item.name}</td>
              <td>${item.amount}</td>
            </tr>
          ))}
        </table> 
        <br />
        <h2>total order amount: ${cart && cart.total.toFixed(2)}</h2>
        <div onClick={e => handleSubmit(cart)}>Confirm Order request</div>
      </div>
      </div>
      
    </div>
  );
}

function Card(props) {
  const { setCartPlus, setCartMinus } = useContext(CartContext);
  return (
    <div className="checkoutCard">
      <img src={props.img} className="checkoutPicture" />
        <div className="checkoutTitle">{props.title}<br />${props.price} each</div>
        <div className="checkoutItemCount">
          <div className="orderCount">
            <div className="minMaxButton left" onClick={e => setCartMinus(props)}>-</div>
            <input type="number" value={props.amount} min="1" className="orderinput" />
            <div className="minMaxButton right" onClick={e => setCartPlus(props)}>+</div>
          </div>
        </div>
        <p className="checkout__card__description">{props.description}</p>
        <div className="checkoutPrice">
          <div className="checkoutPriceData">${props.price * props.amount}</div>
        </div>
    </div>
  );
}

export default Checkout;
