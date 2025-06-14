import React, { useContext } from "react";
import './cart-items.css'
import { HomeContext } from "../../context/HomeContext";
import  remove_icon from '../assets/cart_cross_icon.png'


const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(HomeContext);
    return (
        <div className="cart-items">
            <div className="cart-items-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e)=>{
                if(cartItems[e.id]>0) {
                    return <div>
                    <div className="cart-items-format cart-items-format-main">
                        <img src={e.image} alt="" className="carticon-product-icon" />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className="cart-items-quantity">{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img className="carticon-remove-icon" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                </div>
                }
                return null;
            })}
            <div className="cart-items-down">
                <div className="cart-items-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cart-items-total-item">
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-items-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cart-items-total-item">
                            <h3>Total: </h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-items-promocode">
                    <p>If you have a promocode, Enter it here.</p>
                    <div className="cart-items-promobox">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems;