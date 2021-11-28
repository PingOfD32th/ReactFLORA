import * as React from 'react';
import BugReport from './forms/BugReport';
import MissingItems from './forms/MissingItems';

function Support() {
  const [formSelectedOption, setFormSelectedOption] = React.useState("") 
  const changeSelectOptionHandler = (event) => {
    setFormSelectedOption(event.target.value);
  }
  function formSwitch(param){
    switch(param){
      case 'Bug Report':
        return <BugReport />;
      case 'Missing Parts':
        return <MissingItems />;
      default:
        return null;
    }
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
          { formSwitch(formSelectedOption) }
        </div>
      </div>

    </div>
  );
}

export default Support;
