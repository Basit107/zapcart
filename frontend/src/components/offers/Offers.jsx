import React from "react";
import './offers.css'
import exclusive_image from '../assets/exclusive_image2.png'

const Offers = () => {
    return (
        <div className="offers">
            <div className="offers-left">
                <h1>EXCLUSIVE</h1>
                <h1>OFFERS FOR YOU!!!!</h1>
                <p>ONLY ON BEST SELLER PRODUCTS!!</p>
                <button>Check Now</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt='' />
            </div>

        </div>
    )
}

export default Offers