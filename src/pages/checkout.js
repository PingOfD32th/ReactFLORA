import React, { useState, useContext } from 'react';
import firebase from '../customModules/firestoreTest1';
import { CartContext } from '../context/cartContext';

function Checkout() {
  const { cart } = useContext(CartContext)
  const [inputs, setInputs] = useState({})
  
  const handleSubmit = (event) => {
   event.preventDefault();
   firebase.placeOrder(inputs)
  }

  let itemPic, itemName, itemPrice, itemGLCode = null
  return (
    <div className='checkout'>
      <div className='checkoutWrapper'>
      <div className="checkoutCardWrapper">
      {cart.item.map(item => {console.log(item)})}
      {cart.item.map(item=>(
        <Card
          img={item.img}
          title={item.title}
          price={item.price}
          amount={item.count}
          />
      ))}
      </div>
      <div className="checkoutFooter right">
        <h2>total order amount: ${cart && cart.total.toFixed(2)}</h2>
        <h2>Confirm Order request button</h2>
      </div>
      </div>
      
    </div>
  );
}

function Card(props) {
  const { setCartPlus, setCartMinus } = useContext(CartContext)
  return (
    <div className="checkoutCard">
      <img src={props.img} className="checkoutPicture" />
        <div className="checkoutTitle">{props.title}</div>
        <div className="checkoutItemCount">
        <div class="orderCount">
                    <div class="minMaxButton left" onClick={e => setCartMinus(props)}>-</div>
                    <input type="number" value={props.amount} min="1" class="orderinput" />
                    <div class="minMaxButton right" onClick={e => setCartPlus(props)}>+</div>
                    </div>
          </div>
        <p className="checkout__card__description">{props.description}</p>
        <div className="checkoutPrice">
          <div className="checkoutPriceData">${props.price} each  </div>
        </div>
    </div>
  );
}

export default Checkout;
