// /**
//  * Internal Dependencies.
//  */
// import Products from '../src/components/products';
// import { HEADER_FOOTER_ENDPOINT } from '../src/utils/constants/endpoints';

// /**
//  * External Dependencies.
//  */
// import axios from 'axios';
// import { getProductsData } from '../src/utils/products';
// import Layout from '../src/components/layout';

// export default function Home({ headerFooter, products }) {
// 	const seo = {
// 		title: 'Next JS WooCommerce REST API',
// 		description: 'Next JS WooCommerce Theme',
// 		og_image: [],
// 		og_site_name: 'React WooCommerce Theme',
// 		robots: {
// 			index: 'index',
// 			follow: 'follow',
// 		},
// 	}
// 	return (
// 		<Layout headerFooter={ headerFooter || {} } seo={ seo }>
// 			<Products products={products}/>
// 		</Layout>
// 	)
// }

// export async function getStaticProps() {

// 	const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
// 	const { data: products } = await getProductsData();

// 	return {
// 		props: {
// 			headerFooter: headerFooterData?.data ?? {},
// 			products: products ?? {}
// 		},

// 		/**
// 		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
// 		 * if the data is changed, if it is changed then it will update the
// 		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
// 		 */
// 		revalidate: 1,
// 	};
// }



import { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls
import Hero from '../components/Hero';

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

	const product = products[0]

	return (
		<div>
			<div className="w-full bg-[#333] min-h-screen">
				<div className="w-[520px] mx-auto px-4 py-10 bg-white">
					{product && <Hero product={product} />}
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

