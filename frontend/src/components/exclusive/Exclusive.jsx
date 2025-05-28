import {React} from 'react'
import './exclusive.css'
import product_2 from '../assets/product2.jpg'
import hand_icon from '../assets/hand-icon.png'

const Exclusive = () => {
    return (
        <div className='exclusive'>
            <div className='exclusive-left'>
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hand-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt='' />
                    </div>
                    <p>Popular Items</p>
                    <p>you might like!</p>
                </div>
                <div className='latest-offer-btn'>
                    <div>Latest Popular Items</div>
                    {/* <img /> */}
                </div>
            </div>

            <div className="exclusive-right">
                <img src={product_2} alt='' />
            </div>
        </div>
    );
}


export default Exclusive
