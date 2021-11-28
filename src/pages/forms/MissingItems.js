import * as React from 'react';

function MissingItems() {
  const [inputs, setInputs] = React.useState({})
  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
   event.preventDefault();
   //todo
   //send form
   //appology popup
  }

  return (
    <div className='missingItems'>
      <form onSubmit={handleSubmit}>
        <h2>What type of item is missing</h2>
        <select>
          <option>Please make a selection</option>
          <option>Maintenance Equipment</option>
          <option>Cleaning Supplies</option>
          <option>Plumbing Equipment</option>
          <option>other</option>
        </select>
        <br />
        <label>
        What is the missing item called?
          <input
            type="text"
            name="missingItem"
            required
            value={inputs.missingItem || ""}
            onChange={handleChange}
          />
        </label>
          <br />
        <label> (optional) if you know the GL code of the item, please put it here
          <input 
          type="number"
          name="GLCode"
          value={inputs.GLCode || ""}
          onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default MissingItems;
