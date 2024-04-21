import { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls
import Hero from '../../components/Hero';

export default function ProductsPage({ perPage = 50 }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/get-products?perPage=${perPage}`);
        setProducts(response.data.products); // Assuming your API route returns an object with a 'products' array
        console.log(response.data.products)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [perPage]); // Re-fetch on perPage change

  return (
    <div>
      <div className="w-full bg-[#333] min-h-screen">
        <div className="w-[520px] mx-auto px-4 py-10 bg-white">
          <Hero />
        </div>
      </div>

      {error ? (
        <p>Error loading products: {error}</p>
      ) : (
        <ul>
          <h1 className="text-2xl font-bold">Products</h1>
          {products.map((product) => (
            <li key={product.id}>
              {/* Display product name */}
              <h2>{product.id}</h2>
              {/* Other product details (optional) */}
              {/* ... */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
