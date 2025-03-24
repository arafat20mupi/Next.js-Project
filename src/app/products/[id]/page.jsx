
const getDetailsProducts = async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
}

const productDetails = async ({ params }) => {
    const product = await getDetailsProducts(params.id);
    return (
        <div className="container mx-auto p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
                <img
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                    src={product.thumbnail}
                    alt={product.title}
                />
            </div>
            <div className="w-full md:w-1/2">
                <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
                <p className="text-gray-500 text-sm">Brand: {product.brand}</p>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-xl font-semibold text-gray-900 mt-4">Price: ${product.price}</p>
                <p className="text-sm text-gray-500 mt-1">Discount: {product.discountPercentage}%</p>
                <p className="text-sm text-gray-500 mt-1">Stock: {product.stock > 0 ? product.availabilityStatus : "Out of Stock"}</p>
                <p className="text-lg text-yellow-500 mt-2">⭐ {product.rating}</p>
                <p className="text-sm text-gray-500 mt-2">Return Policy: {product.returnPolicy}</p>
                <p className="text-sm text-gray-500 mt-2">Warranty: {product.warrantyInformation}</p>
                <p className="text-sm text-gray-500 mt-2">Shipping: {product.shippingInformation}</p>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Reviews:</h3>
                    <ul className="mt-2">
                        {product.reviews.map((review, index) => (
                            <li key={index} className="text-gray-700 text-sm border-b py-2">
                                <strong>{review.reviewerName}</strong> ({review.rating}★): {review.comment}
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="mt-4 w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default productDetails;