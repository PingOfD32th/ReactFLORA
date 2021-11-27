import * as React from 'react';

function Support() {
  const [formSelectedOption, setFormSelectedOption] = React.useState("") 
  const changeSelectOptionHandler = (event) => {
    setFormSelectedOption(event.target.value);
  }
  return (
    <div className='support'>
      <h1>Support Page</h1>
      <div className="FormWrapper">
        <form>
          <div>
          <select onChange={changeSelectOptionHandler}>
            <option>Please Make A Selection</option>
            <option>Bug Report</option>
            <option>Missing Parts</option>
          </select>
          </div>
        </form>
        <div>
          { test }
        </div>
      </div>

    </div>
  );
}

export default Support;
