import React, {createContext, useEffect, useState} from "react";
// import all_product from '../components/assets/all_product'
import api from '../config/axios';
import {useAuth} from '../context/AuthContext';

export const HomeContext = createContext(null);


const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    // log(cart);
    return cart;
}

const HomeContextProvider = (props)=> {

    
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const {userId} = useAuth(); // ✅ Get userId from AuthContext

    useEffect(() => {
        const fetchData = async () => {
        try {
            // ✅ Get all products
            const productRes = await api.get('v1/products/allproducts');
            setAll_Product(productRes.data);

            // ✅ Get user cart — backend uses cookie to identify user
            if (!userId || userId === "") {
                // log('User ID is not available. Cannot add to cart.');
                return;
            } else {
                const cartRes = await api.get(`v1/users/${userId}/getcart`); // no user-id or auth-token needed
                setCartItems(cartRes.data.cartData);
            }
            // log('Cart items:', cartItems);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [userId]); // ✅ Dependency on userId


    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));

        try {
            if (!!userId) {
                const res = await api.put(`v1/users/${userId}/addtocart`, { itemId });
                // log(res.data);
            } else {
                console.error('User ID is not available. Cannot add to cart.');
                return;
            }
            
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1,
        }));

        try {
            await api.put(`v1/users/${userId}/removefromcart`, { itemId });
            // log(res.data); const res = 
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = all_product.find((product) => product.id === Number(item))
                if (iteminfo) {
                    totalAmount += iteminfo.new_price * cartItems[item];
                } else {
                    console.warn("Product not found for cart item id:", item);
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartitems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartitems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};

    return (
        <HomeContext.Provider value={contextValue}>
            {props.children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider