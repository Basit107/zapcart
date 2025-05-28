import React from 'react';
import './CSS/cart.css';
import CartItems from '../components/cart-items/CartItems'
import HomeContextProvider, { HomeContext } from '../context/HomeContext';

const Cart = () => {


    return (
        <div className="cart">
            <h1>Your Cart</h1>
            <CartItems />
        </div>
    );
}

export default Cart;

