import React, {useContext} from "react";
// import all_product from '../components/assets/all_product'
import './CSS/homecategory.css'
import { HomeContext } from "../context/HomeContext";
import drop_down from '../components/assets/dropdown_icon.png'
import Items from '../components/items/Items'


const HomeCategory = (props)=> {

    const {all_product} = useContext(HomeContext);

    return (
        <div className="home-category">
            <img className="home-category-banner" src={props.banner} alt="" />
            <div className="homeCategory-indexSort">
                <p>
                    <span>
                        Showing 1-12
                    </span> out of all_products
                </p>
                <div className="homeCategory-sort">
                    Sort by <img src={drop_down} alt="" />
                </div>
            </div>
            <div className="homecategory-products">
                {all_product.map((item, i)=> {
                    if (props.category===item.category) {
                        return <Items key={i} id={item.id} name={item.name}  image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    }
                    else {
                        return null;
                    }
                })}
            </div>
            <div className="homeCategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default HomeCategory