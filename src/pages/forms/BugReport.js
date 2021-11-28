import React from 'react';

function BugReport() {
  return (
    <div className='bugReport'>
      <h1>What type of bug are you having</h1>
      <select>
        <option>Please Make a Selection...</option>
        <option>App Not Working as Expected</option>
        <option>App Crashing</option>
        <option>Other</option>
      </select>
      <h3>Please describe the issue you are having</h3>
      <h2>submit button here</h2>
    </div>
  );
}

export default BugReport;
