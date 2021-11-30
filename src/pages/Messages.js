import React, { useEffect, useState, useContext } from 'react';
import firebase from '../customModules/firestoreTest1';

//############### for pictures in messages
// for (let i = 0; i < arr.length && i < 5; i++) {
//   console.log(arr[i]);
// }

function Messages() {
  const [orderCount, setOrderCount] = useState(0)
  useEffect(()=>{
    (async () => {
      firebase.getLastOrderNumber().then(count => {
        setOrderCount(count)
      })
    })()
  }, [])
  
  return (
    <div className='messages'>
      <h1>This is the Messages Page</h1>
      <br />
      <p>order #: {orderCount} (multiple pictures)</p>

      
    </div>
  );
}

export default Messages;
