import React, { useEffect, useState } from 'react';
import firebase from '../customModules/firestoreTest1';

function Messages() {
  const [firestoreData, setFirestoreData] = useState([]); 
  const [pendingOrders, setPendingOrders] = useState(false)
  useEffect(()=>{
    (async () => {
      firebase.getActiveOrders().then(item => {
        setFirestoreData(item)
        if(item.length > 0){
          setPendingOrders(true)
        }
        console.log(item)
      })
    })()
  }, [])
  
  return (
    <div className='messages'>
      <br />
      <h1>{pendingOrders ? "Your Pending Orders" : "No Pending Orders" }</h1>
      <div className="ordersList">
      {
        firestoreData.map(({firestoreID, ordernumber, cartItems, regionalApproved, regionalDenied, regionalNotes, vpApproved, vpDenied, vpNotes, clerkApproved, clerkDenied, clerkNotes}) => (
          <div className="orders">
            <div className="messagesOrderNumber">order #: {ordernumber} / {firestoreID}</div>
            {regionalDenied ? (<div className="messagesCloseOrder" onClick={e => firebase.closeOrder(firestoreID)}>X</div>) : null }
            {vpDenied ? (<div className="messagesCloseOrder" onClick={e => firebase.closeOrder(firestoreID)}>X</div>) : null }
            {clerkDenied ? (<div className="messagesCloseOrder" onClick={e => firebase.closeOrder(firestoreID)}>X</div>) : null }
            <div className="messagesImagesDiv">
            {cartItems.slice(0, 4).map(({img}) =>(
              <img src={img} className="messagesImage"/>
            ))}
            </div>
            <div className="approvalWrapper">
              {regionalApproved ? (<div className="regional approved">Regional Approved</div>): regionalDenied ? (<div className="regional denied">Regional Denied</div>): (<div className="regional waitingApproval">Waiting Regional Approval</div>)}
              {vpApproved ? (<div className="vp approved">VP Approved</div>): vpDenied ? (<div className="vp denied">VP Denied</div>): (<div className="vp waitingApproval">Waiting VP Approval</div>)}
              {clerkApproved ? (<div className="clerk approved">Clerk Approved</div>): clerkDenied ? (<div className="clerk denied">Clerk Denied</div>): (<div className="clerk waitingApproval">Waiting Clerk Approval</div>)}
            </div>
            <div className="denialReason">
              {regionalDenied ? `Regional Denied because: ${regionalNotes}` : null }
              {vpDenied ? `VP Denied because: ${vpNotes}` : null }
              {clerkDenied ? `Clerk Denied because: ${clerkNotes}` : null }
            </div>
          </div>
        ))
      }
      </div>
      
    </div>
  );
}

export default Messages;
