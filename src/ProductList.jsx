import React, { useState, useEffect } from 'react';
import './ProductList.css'
import CartItem from './CartItem';
import { useDispatch, useSelector} from 'react-redux';
import { addItem } from './CartSlice';
function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items); 
    const [showPlants, setShowPlants] = useState(false); 
    const [addedToCart, setAddedToCart] = useState([]);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "speaker.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                }
            ]
        }
    ];
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignIems: 'center',
        fontSize: '20px',
    }
    const styleObjUl = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '1100px',
    }
    const styleObjUl2 = {
        display: 'flex',
        flexdirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
    const styleA = {
        color: 'white',
        fontSize: '30px',
        textDecoration: 'none',
    }

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true); // Set showCart to true when cart icon is clicked
    };
    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
        setShowCart(false); // Hide the cart when navigating to About Us
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    const handleAddToCart = (product) => {
        
        dispatch(addItem({product}))
        setAddedToCart((prevState) => ({ // Update the local state to reflect that the product has been added
            ...prevState, 
            [product.name]: true,
        }));
    }


    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => handleHomeClick(e)}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                                
                            </div>
                        </a>
                    </div>

                </div>
                <div style={styleObjUl}>
                    <div> <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <div> <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}><h1 className='cart'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68"><rect width="156" height="156" fill="none"></rect><circle cx="80" cy="216" r="12"></circle><circle cx="184" cy="216" r="12"></circle><path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path></svg></h1></a></div>
                            <span style={{
                                position: 'absolute',
                                top: '1px',
                                right: '1px',
                                background: 'red',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                padding: '2px 6px',
                                borderRadius: '50%',
                                display: 'inline-block'
                            }}>
                                {cart.reduce( (total, item) => total + item.quantity,0)}
                            </span>
                    </div>
                </div>
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((type, index) => (
                    <section key={index} style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{type.category}</h2>

                        <ul style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1rem',
                            flexWrap: 'wrap'
                            }}>
                            {type.plants.map((plant, idx) => {
                                const isInCart = addedToCart[plant.name] === true;

                                return (
                                    <li key={idx} style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    border: '1px solid #ddd',
                                    padding: '1rem',
                                    width: '180px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                    <img
                                        src={plant.image}
                                        alt={plant.name}
                                        style={{
                                        width: '100%',
                                        height: '120px',
                                        objectFit: 'cover',
                                        marginBottom: '0.5rem'
                                        }}
                                    />
                                    <p style={{ fontWeight: 'bold' }}>{plant.name}</p>
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#666',
                                        textAlign: 'center'
                                    }}>{plant.description}</p>
                                    <p style={{ color: 'green', fontWeight: '600' }}>{plant.cost}</p>

                                    <button
                                        style={{
                                        color: 'green',
                                        border: '2px solid green',
                                        borderRadius: '3px',
                                        padding: '0.3rem 0.8rem'
                                        }}
                                        onClick={() => handleAddToCart(plant)}
                                        disabled={isInCart}
                                    >
                                        {isInCart ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                    </li>
                                );
                                })}

                        </ul>
                    </section>
))}

                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
