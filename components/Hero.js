'use client'

import React, { useState } from 'react';

const Hero = ({ product }) => {
  const amounts = [
    {
      value: 1,
      text: "1x 21.99€/kom",
    },
    {
      value: 2,
      text: "2x 14.49€/kom",
      highlightText: "TOP ODABIR",
      bgColor: "green-500",
    },
    {
      value: 3,
      text: "3x 11.99€/kom",
      highlightText: "SUPER UŠTEDA",
      bgColor: "yellow-400",
    }
  ];

  const [selectedValue, setSelectedValue] = useState(1);
  const handleProductSelection = (value) => {
    setSelectedValue(value);
  };

  // const product = {
  //   name: "Product 1",
  //   color: "Black",
  //   image: "https://dokishop.hr/proizvod/ducket-motociklisticke-rukavice-7189/images/640ec65da46de.jpeg",
  //   sizes: ['L', 'XL', 'XXL']
  // };

  return (
    <div className='min-h-screen'>
      <h2 className='text-[25px] font-bold text-center text-[#222] mb-5'>Obrazac za narudžbu</h2>
      <div className='shadow-2xl bg-[#DAE9DB] p-3 flex gap-4 items-center rounded-lg'>
        <img src="./images/garantee.png" alt="" className='h-20 w-20' />
        <div>
          <h2 className='font-bold text-xl'>44-dnevno jamstvo na povrat novca</h2>
          <p>U slučaju da proizvod iz bilo kojeg razloga ne ispunjava tvoja očekivanja, jednostavno nam se javi i vratit ćemo ti novac.</p>
        </div>
      </div>

      {/* Item selection buttons (3) */}
      <div className='flex gap-5 items-end mt-10 bg-'>
        {amounts.map((item, index) => {
          const isActive = item.value === selectedValue;
          return (
            <div key={item.value} className='flex flex-col w-full border border-black-0/40'>
              {item.highlightText && (
                <div className={`text-center py-3 ${index === 1 ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black-3'} font-bold`}>
                  {item.highlightText}
                </div>
              )}
              <button
                className={` ${!isActive ? 'text-black-3 bg-white' : 'text-white bg-black-3'} py-3 font-bold`}
                onClick={() => handleProductSelection(item.value)}
              >
                {item.text}
              </button>
            </div>
          );
        })}
      </div>

      {/* Render ProductDetails based on selectedValue */}
      {[...Array(selectedValue)].map((_, index) => (
        <ProductDetails key={index} product={product} />
      ))}
    </div>
  );
};

const ProductDetails = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(product?.attributes[0]?.options[0] || 'L');

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className='pt-5'>
      <h2>{product.name}</h2>
      <p>Color: {product.color}</p>
      <img src={product.images[0].src} alt={product.name} className='w-[200px] h-[200px] border-2 rounded-xl my-5 border-black-0' />
      <p>Selected Size: {selectedSize}</p>
      <div className='grid grid-cols-4 gap-3 mt-5'>
        {/* Available Sizes: */}
        {product?.attributes[0]?.options.map((size, index) => (
          <button
            key={index}
            onClick={() => handleSizeSelect(size)}
            className={`px-3 py-2 border rounded font-bold text-xl ${selectedSize === size ? 'border-yellow-400' : ' border-gray-500'}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
