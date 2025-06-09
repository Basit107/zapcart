import React from "react";
import './related-products.css'
// import data_product from '../assets/data'
import Items from "../items/Items";
import { useState, useEffect } from "react";
import api from '../../config/axios.js'


const RelatedProducts = ({category}) => {
    const [relatedproducts, setRelatedProducts] = useState([]);
    
    useEffect(() => {
    const fetchRelatedProducts = async () => {
        try {
        const response = await api.post('/v1/products/relatedproducts', {category});
        setRelatedProducts(response.data);
        } catch (error) {
        console.error("Error fetching related products:", error);
        }
    };

    fetchRelatedProducts();
    }, [category]);


    return (
        <div className="relatedproducts">
            <h1>RELATED PRODUCTS</h1>
            <hr />
            <div className="relatedproducts-item">
                {relatedproducts.map((item, i)=> {
                    return <Items key={i} id={item.id} name={item.name}  image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default RelatedProducts