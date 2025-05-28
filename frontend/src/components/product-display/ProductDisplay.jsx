import React, { useContext } from "react";
import './product-display.css'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import { HomeContext } from "../../context/HomeContext";


const ProductDisplay = (props) => {

    const {product} = props;
    const {addToCart} = useContext(HomeContext);

    return (
        <div className="product-display">
            <div className="productDisplay-left">
                <div className="productDisplay-image-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productDisplay-image">
                    <img className="productDisplay-main-image" src={product.image} alt="" />
                </div>
            </div>
            <div className="productDisplay-right">
                <h1>{product.name}</h1>
                <div className="productDisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(33)</p>
                </div>
                <div className="productDisplay-right-prices">
                    <div className="productDisplay-right-old-price">
                        ${product.old_price}
                    </div>
                    <div className="productDisplay-right-new-price">
                        ${product.new_price}
                    </div>
                    <div className="productDisplay-right-description">
                        This is the description of the product.
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className="productDisplay-right-category"><span>Category: </span>Mobile , Tech, handheld device</p>
            </div>
        </div>
    )
}

export default ProductDisplay;