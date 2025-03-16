import Link from "next/link";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data;
};

const Products = async() => {
const allProducts =await fetchProducts();
console.log(allProducts);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">
        All Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.products.map((product) => (
          <Link href={`/products/${product.id}`} 
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              className="w-80 h-56 object-cover"
              src={product.thumbnail}
              alt={product.title}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {product.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{product.description.substring(0, 80)}...</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">${product.price}</span>
                <span className="text-sm font-medium text-gray-500">⭐ {product.rating}</span>
              </div>
              <p className="text-sm mt-2 text-gray-500">Stock: {product.stock > 0 ? "Available" : "Out of Stock"}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Buy Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;