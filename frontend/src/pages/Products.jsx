import React, { useContext } from 'react'
import { HomeContext } from '../context/HomeContext'
// import all_product from '../components/assets/all_product'
import { useParams } from 'react-router-dom'
import Breadcrums from '../components/breadcrums/Breadcrums';
import ProductDisplay from '../components/product-display/ProductDisplay'
import DescriptionBox from '../components/description-box/DescriptionBox';
import RelatedProducts from '../components/related-products/RelatedProducts'

const Products = () => {
    const {all_product} = useContext(HomeContext)
    const{productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));

    if (!product) {
        return <div>Loading product...</div>; // or redirect, or show error
    }

    return (
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    )
}

export default Products