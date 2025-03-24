import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Blogs =async () => {
    const blogs = [
        {
            "id": 1,
            "title": "ই-কমার্স ব্যবসা শুরু করার ১০টি গুরুত্বপূর্ণ টিপস",
            "slug": "ecommerce-business-tips",
            "category": "ব্যবসায়িক পরামর্শ",
            "author": "CodeCraftor Team",
            "date": "2025-03-15",
            "content": "ই-কমার্স ব্যবসা শুরু করতে গেলে কিছু গুরুত্বপূর্ণ বিষয় মাথায় রাখা দরকার...",
            "tags": ["ecommerce", "business", "startup"]
        },
        {
            "id": 2,
            "title": "২০২৫ সালে ই-কমার্সের জন্য ৫টি নতুন ট্রেন্ড",
            "slug": "ecommerce-trends-2025",
            "category": "ই-কমার্স ট্রেন্ড",
            "author": "CodeCraftor Team",
            "date": "2025-03-14",
            "content": "২০২৫ সালে ই-কমার্স খাতে AI-ভিত্তিক সুপারিশ, দ্রুত ডেলিভারি প্রযুক্তি...",
            "tags": ["ecommerce", "trends", "technology"]
        },
        {
            "id": 3,
            "title": "ই-কমার্সের জন্য সেরা মার্কেটিং স্ট্র্যাটেজি",
            "slug": "ecommerce-marketing-strategy",
            "category": "মার্কেটিং",
            "author": "CodeCraftor Team",
            "date": "2025-03-10",
            "content": "একটি সফল ই-কমার্স ব্যবসার জন্য সঠিক মার্কেটিং খুবই গুরুত্বপূর্ণ...",
            "tags": ["marketing", "ecommerce", "growth"]
        },
        {
            "id": 4,
            "title": "ই-কমার্স ব্যবসায় কিভাবে বেশি গ্রাহক আকর্ষণ করবেন?",
            "slug": "ecommerce-customer-attraction",
            "category": "গ্রাহক সেবা",
            "author": "CodeCraftor Team",
            "date": "2025-03-08",
            "content": "গ্রাহকদের আকর্ষণ করতে চাইলে কিছু কার্যকরী স্ট্র্যাটেজি অনুসরণ করা উচিত...",
            "tags": ["customer", "ecommerce", "service"]
        }
    ];
const session = await getServerSession(authOptions);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">ই-কমার্স ব্লগ</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
                        <p className="text-sm text-gray-500">লেখক: {blog.author} • {blog.date}</p>
                        <p className="mt-3 text-gray-700">{blog.content.slice(0, 100)}...</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {blog.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{tag}</span>
                            ))}
                        </div>
                        <button className="mt-4 block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">বিস্তারিত পড়ুন</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;