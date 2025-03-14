"use client"

import { useEffect, useState } from 'react';

const data = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data;
};

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await data();
            setAllProducts(result.products);
        };
        fetchData();
    }, []);

    console.log(allProducts);

    return (
        <div>
            <h1 className="text-3xl text-center">All Products</h1>
            <ul>
                {allProducts?.map(product => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Products;