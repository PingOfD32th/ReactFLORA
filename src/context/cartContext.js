import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = props => {
    const [cart, setCartData] = useState(() => {
        let saved = localStorage.getItem("cart");
        let initialValue = JSON.parse(saved);
        return (initialValue && initialValue.length != 0) ? initialValue : {
            item: [],
            total: 0,
            qty: 0,
            vendors: []
        };
    });
    const setCart = data => {
        let vendorOnCart = [...cart.vendors];
        let dataOnCart = [...cart.item];
        let found = dataOnCart.findIndex(el => el.title === data.title);
        if(found != -1){
            let subTotal = 0;
            dataOnCart[found]['count'] = dataOnCart[found]['count'] + 1;
            dataOnCart.map(val=>{
                subTotal += val.count * parseFloat(val.price);
            })
            setCartData({item: dataOnCart, total: subTotal, qty: cart.qty + 1, vendors: cart.vendors});
            localStorage.setItem("cart", JSON.stringify({item: dataOnCart, total: subTotal, qty: cart.qty + 1, vendors: cart.vendors}));
        } else {
            let result = {...data};
            vendorOnCart.push(data.vendor);
            result['count'] = 1;
            setCartData({item: [...cart.item, result], total: parseFloat(cart.total) + parseFloat(data.price), qty: cart.qty + 1, vendors: vendorOnCart.filter((v, i, a) => a.indexOf(v) === i)});
            localStorage.setItem("cart", JSON.stringify({item: [...cart.item, result], total: parseFloat(cart.total) + parseFloat(data.price), qty: cart.qty + 1, vendors: vendorOnCart.filter((v, i, a) => a.indexOf(v) === i)}));
        }
    }
    const setCartPlus = data => {
        let dataOnCart = [...cart.item];
        let found = dataOnCart.findIndex(el => el.title === data.title);
        if(found != -1){
            let subTotal = 0;
            dataOnCart[found]['count'] = dataOnCart[found]['count'] + 1;
            dataOnCart.map(val=>{
                subTotal += val.count * parseFloat(val.price)
            });
            setCartData({item: dataOnCart, total: subTotal, qty: cart.qty + 1, vendors: cart.vendors});
            localStorage.setItem("cart", JSON.stringify({item: dataOnCart, total: subTotal, qty: cart.qty + 1, vendors: cart.vendors}));
        }
    }
    const setCartMinus = data => {
        let dataOnCart = [...cart.item];
        let found = dataOnCart.findIndex(el => el.title === data.title);
        if(found != -1){
            let subTotal = 0;
            dataOnCart[found]['count'] = dataOnCart[found]['count'] - 1;
            dataOnCart.map(val=>{
                subTotal += val.count * parseFloat(val.price)
            });
            if (dataOnCart[found]['count'] == 0) {
                let newData = dataOnCart.filter((value, index) => value.title != data.title);
                setCartData({item: newData, total: subTotal, qty: cart.qty - 1, vendors: cart.vendors});
                localStorage.setItem("cart", JSON.stringify({item: newData, total: subTotal, qty: cart.qty - 1, vendors: cart.vendors}));
            } else {
                setCartData({item: dataOnCart, total: subTotal, qty: cart.qty - 1, vendors: cart.vendors});
                localStorage.setItem("cart", JSON.stringify({item: dataOnCart, total: subTotal, qty: cart.qty - 1, vendors: cart.vendors}));
            }
        }
    }
    const removeCart = (data, count) => {
        let vendorOnCart = [];
        let dataOnCart = [...cart.item];
        let newData = dataOnCart.filter((value, index) => value.title != data);
        let subTotal = 0;
        newData.map(val=>{
            subTotal += val.count * parseFloat(val.price);
            vendorOnCart.push(val.vendor);
        })
        setCartData({item: newData, total: subTotal, qty: cart.qty - count, vendors: vendorOnCart.filter((v, i, a) => a.indexOf(v) === i)});
        localStorage.setItem("cart", JSON.stringify({item: newData, total: subTotal, qty: cart.qty - count, vendors: vendorOnCart.filter((v, i, a) => a.indexOf(v) === i)}));
    }
    const clearCart = () => {
        setCartData({item: [], total: 0, qty: 0, vendors: []})
        localStorage.setItem("cart", JSON.stringify({item: [], total: 0, qty: 0, vendors: []}));
    }
    return (
        <CartContext.Provider value={{cart, setCart, setCartPlus, setCartMinus, removeCart, clearCart}}>
            {props.children}
        </CartContext.Provider>
    );
}