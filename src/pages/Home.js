import React from 'react';

function Home() {
  return (
    <div className='home'>
      <h1>Home</h1>
      <h3>Todo List:</h3>
      <li>Sort Products by Searchbar</li>
      <li>Checkout seperates items by source(hdsupply/sherman williams/best buy)</li>
      <li>Finish bug reports</li>
      <li>Add accounts/heirarchy</li>
      <li>Add Filestorage for quotes POR requests</li>
      <li>Add form for Quotes</li>
      <h2>known bugs/issues</h2>
      <li>pending orders needs to be imported into state so closed out orders immediately update in app</li>

      <h1>For Reccomendations please email: gkgleason320@gmail.com</h1>
    </div>
  );
}

export default Home;
