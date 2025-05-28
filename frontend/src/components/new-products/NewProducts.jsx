import React, { useEffect, useState } from "react";
import './new-products.css'
// import new_collections from "../assets/new_collections";
import Items from "../items/Items";


const NewProducts = () => {

    const [new_products, setNewProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/newproducts`)
        .then((response) => response.json()).then((data) => setNewProducts(data));
    }, [])

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