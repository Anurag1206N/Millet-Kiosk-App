import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaStar } from 'react-icons/fa';
import nutritionImg from '../resources/productpage/nutrition facts.png';

const ProductPage = () => {
  const params = useParams();
  let productId = params.prodId;
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    localStorage.setItem(productId, quantity + 1);
  };

  const decrementQuantity = () => {
    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    localStorage.setItem(productId, newQuantity);
  };

  useEffect(() => {
    fetch(`https://millet-kiosk-app-backend.onrender.com/products/id/${productId}`)
      .then((res) => {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    const savedQuantity = localStorage.getItem(productId);
    if (savedQuantity) {
      setQuantity(parseInt(savedQuantity, 10));
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('./resources/homepage/Homepage.png')] bg-cover bg-center">
      {/* Product Image Container */}
      <div className="relative">
        <img 
          src={product[0].prodImg} 
          alt={product[0].prodName} 
          className="w-full object-cover rounded-b-[50px]"
        />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white bg-opacity-75 rounded-full shadow-md"
        >
          <FaChevronLeft className="text-[#6A3A3A]" />
        </button>
      </div>

      {/* Product Details */}
      <div className="px-4 py-6">
        <h1 className="text-3xl text-[#6A3A3A] font-bold mb-4">{product[0].prodName}</h1>
        <p className="text-lg mb-4">{product[0].prodDesc}</p>
        
        {/* Price, Rating and Add Button Row */}
        <div className="flex justify-between items-center mb-6">
          {/* Left side - Price */}
          <p className="text-lg text-[#6A3A3A] font-semibold">
            Price: Rs.{product[0].price}
          </p>
          
          {/* Right side - Rating and Add/Quantity */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center px-5 py-1 bg-[#6A3A3A] text-white rounded-[20px]">
              <FaStar className="text-yellow-500 mr-1" />
              <p className="text-lg font-semibold">{product[0].rating}</p>
            </div>
            
            {/* Quantity Controls */}
            <div className="flex items-center">
              {quantity === 0 ? (
                <button
                  onClick={incrementQuantity}
                  className="px-8 py-2 bg-[#6A3A3A] text-white font-bold rounded-[20px]"
                >
                  ADD
                </button>
              ) : (
                <>
                  <button
                    onClick={decrementQuantity}
                    className="px-4 py-2 bg-[#6A3A3A] text-white rounded-full mx-1"
                  >
                    -
                  </button>
                  <span className="px-5 py-2 bg-[#6A3A3A] text-white rounded-full">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="px-4 py-2 bg-[#6A3A3A] text-white rounded-full mx-1"
                  >
                    +
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Centered Nutrition Image */}
        <div className="w-full flex justify-center mb-6">
          <img 
            src={nutritionImg} 
            alt="Nutrition Facts" 
            className="max-w-full"
          />
        </div>
        
        {/* Cart Button - Centered */}
        <div className="flex justify-center">
          <button className="px-8 py-2 bg-[#6A3A3A] text-white rounded">
            {quantity > 0 ? "Go to Cart" : "Show the Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;