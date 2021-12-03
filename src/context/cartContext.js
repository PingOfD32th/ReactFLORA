import React, { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = props => {
    const [cart, setCartData] = useState(() => {
        let saved = localStorage.getItem("cart");
        let initialValue = JSON.parse(saved);
        return (initialValue && initialValue.length != 0) ? initialValue : {
            item: [],
            total: 0,
            qty: 0
        };
    });
    const setCart = data => {
        let dataOnCart = [...cart.item];
        let found = dataOnCart.findIndex(el => el.title === data.title);
        if(found != -1){
            let subTotal = 0;
            dataOnCart[found]['count'] = dataOnCart[found]['count'] + 1;
            dataOnCart.map(val=>{
                subTotal += val.count * parseFloat(val.price)
            })
            setCartData({item: dataOnCart, total: subTotal, qty: cart.qty + 1});
            localStorage.setItem("cart", JSON.stringify({item: dataOnCart, total: subTotal, qty: cart.qty + 1}));
        } else {
            let result = {...data};
            result['count'] = 1;
            setCartData({item: [...cart.item, result], total: parseFloat(cart.total) + parseFloat(data.price), qty: cart.qty + 1});
            localStorage.setItem("cart", JSON.stringify({item: [...cart.item, result], total: parseFloat(cart.total) + parseFloat(data.price), qty: cart.qty + 1}));
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
            setCartData({item: dataOnCart, total: subTotal, qty: cart.qty + 1});
            localStorage.setItem("cart", JSON.stringify({item: dataOnCart, total: subTotal, qty: cart.qty + 1}));
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
                setCartData({item: newData, total: subTotal, qty: cart.qty - 1});
                localStorage.setItem("cart", JSON.stringify({item: newData, total: subTotal, qty: cart.qty - 1}));
            } else {
                setCartData({item: dataOnCart, total: subTotal, qty: cart.qty - 1});
                localStorage.setItem("cart", JSON.stringify({item: dataOnCart, total: subTotal, qty: cart.qty - 1}));
            }
        }
    }
    const removeCart = (data, count) => {
        let dataOnCart = [...cart.item];
        let newData = dataOnCart.filter((value, index) => value.title != data);
        let subTotal = 0;
        newData.map(val=>{
            subTotal += val.count * parseFloat(val.price)
        })
        setCartData({item: newData, total: subTotal, qty: cart.qty - count});
        localStorage.setItem("cart", JSON.stringify({item: newData, total: subTotal, qty: cart.qty - count}));
    }
    const clearCart = () => {
        setCartData({item: [], total: 0, qty: 0})
        localStorage.setItem("cart", JSON.stringify({item: [], total: 0, qty: 0 }));
    }
    return (
        <CartContext.Provider value={{cart, setCart, setCartPlus, setCartMinus, removeCart, clearCart}}>
            {props.children}
        </CartContext.Provider>
    );
}