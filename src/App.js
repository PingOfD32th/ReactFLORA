import React from 'react';
import { CartProvider } from './context/cartContext';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Messages from './pages/Messages';
import addItem from './pages/addItem';
import Support from './pages/support'
import Checkout from './pages/checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/messages' component={Messages} />
          <Route path='/products' component={Products} />
          <Route path='/addItem' component={addItem} />
          <Route path='/support' component={Support} />
          <Route path='/Checkout' component={Checkout} />
        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;
