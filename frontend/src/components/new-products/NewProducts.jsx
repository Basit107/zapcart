import React, { useEffect, useState } from "react";
import './new-products.css'
// import new_collections from "../assets/new_collections";
import Items from "../items/Items";
import api from "../../config/axios";

const NewProducts = () => {

    const [new_products, setNewProducts] = useState([]);

   useEffect(() => {
        const fetchNewProducts = async () => {
            try {
                const res = await api.get('v1/products/newproducts');
                setNewProducts(res.data);
            } 
            catch (error) {
                console.error('Error fetching new products:', error);
            }
        };
        fetchNewProducts();
    }, []);

    return (
        <div className="new-products">
            <h1>NEW PRODUCTS</h1>
            <hr />
            <div className="products">
                {new_products.map((item, i)=> {
                    return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewProducts