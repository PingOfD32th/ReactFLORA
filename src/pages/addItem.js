import * as React from 'react';
import firebase from '../customModules/firestoreTest1';

function AddItem() {
  const [inputs, setInputs] = React.useState({})
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
   event.preventDefault();
   firebase.addProduct(inputs)
  }

  return (
    <div className='AddItem'>
      <h1>Form To add Item to Database</h1>
      <form onSubmit={handleSubmit}>
        <label>Item Name:
          <input
            type="text"
            name="itemName"
            required
            value={inputs.itemName || ""}
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>Item Link:
          <input
            type="text"
            name="itemLink"
            required
            value={inputs.itemLink || ""}
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>Item Picture:
          <input
            type="text"
            name="itemPicture"
            required
            value={inputs.itemPicture || ""}
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>Item Description:
          <input
            type="text"
            name="itemDescription"
            required
            value={inputs.itemDescription || ""}
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>Item Price:
          <input
            type="number"
            name="itemPrice"
            required
            value={inputs.itemPrice || ""}
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>Item GL Code:
          <input
            type="number"
            name="itemGLCode"
            required
            value={inputs.itemGLCode || ""}
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>Item Vendor:
          <input
            type="text"
            name="itemVendor"
            required
            value={inputs.itemVendor || ""}
            onChange={handleChange} 
          />
        </label>
        <br />
        <input type="submit" />
      </form>

      <h3>Edit Item:</h3>
      <h3>Delete Item:</h3>
    </div>
  );
}

export default AddItem;
