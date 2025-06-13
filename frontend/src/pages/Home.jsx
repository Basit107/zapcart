import React from 'react';
import Exclusive from '../components/exclusive/Exclusive';
import Popular from '../components/popular/Popular';
import Offers from '../components/offers/Offers';
import NewProducts from '../components/new-products/NewProducts';

const Home = () => {
    return (
        <div className='home-page'>
            <Exclusive />
            <Popular />
            <Offers />
            <NewProducts />
        </div>
    );
}

export default Home;