// Data for products, categories, and cart simulation

const products = [
  {
    id: 1,
    brand: "Nike",
    name: "Air Presto",
    price: 192.00,
    image: "https://images.pexels.com/photos/1757363/pexels-photo-1757363.jpeg?auto=compress&cs=tinysrgb&w=600",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    colors: ["#000000", "#ffffff", "#3498db"],
    description: "Deskripsi singkat produk Nike Air Presto yang nyaman dan stylish untuk berbagai aktivitas.",
    category: "Sneakers"
  },
  {
    id: 2,
    brand: "Adidas",
    name: "Running Shoe X",
    price: 149.99,
    image: "https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg?auto=compress&cs=tinysrgb&w=600",
    sizes: ["US 6", "US 7", "US 8.5"],
    colors: ["#ff0000", "#f1c40f"],
    description: "Deskripsi singkat produk Adidas Running Shoe X yang ringan dan mendukung performa lari Anda.",
    category: "Running"
  },
  {
    id: 3,
    brand: "Puma",
    name: "Casual Sneaker",
    price: 120.00,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
    sizes: ["US 7", "US 8", "US 9"],
    colors: ["#2ecc71", "#e74c3c", "#34495e"],
    description: "Sneaker kasual Puma yang cocok untuk gaya sehari-hari dengan kenyamanan maksimal.",
    category: "Casual"
  },
  {
    id: 4,
    brand: "Reebok",
    name: "Sport Runner",
    price: 135.50,
    image: "https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=600",
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    colors: ["#000000", "#ffffff"],
    description: "Reebok Sport Runner yang dirancang untuk performa dan gaya olahraga.",
    category: "Running"
  },
  {
    id: 5,
    brand: "New Balance",
    name: "Classic Sneaker",
    price: 110.00,
    image: "https://images.pexels.com/photos/2529149/pexels-photo-2529149.jpeg?auto=compress&cs=tinysrgb&w=600",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    colors: ["#8e44ad", "#2980b9"],
    description: "New Balance Classic Sneaker dengan desain timeless dan kenyamanan sepanjang hari.",
    category: "Casual"
  }
];

const categories = [
  { name: "Sneakers", icon: "fas fa-shoe-prints" },
  { name: "Running", icon: "fas fa-running" },
  { name: "Casual", icon: "fas fa-socks" }
];

// Simulated cart data
let cartItems = [];
