import React, { useEffect, useState } from 'react'
import './popular.css'
// import data_product from '../assets/data';
import Items from '../items/Items';

const Popular = () => {

    const [popularProducts, setPopularProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/popularproducts')
        .then((response) => response.json())
        .then((data) =>  setPopularProducts(data))
    }, [])


    return (
        <div className='popular'>
            <h1>POPULAR</h1>
            <hr />
            <div className="popular-item">
                {popularProducts.map((item, i)=>{
                    return <Items className='item' key={i} id={item.id} name={item.name}  image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    );
}


export default Popular
// Compare this snippet from frontend/src/components/popular/Popular.jsx:
// import React, { useEffect, useState } from 'react'
// import './popular.css'
// import data_product from '../assets/data';