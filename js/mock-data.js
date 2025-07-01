const mockData = {
  products: [
    {
      id: 1,
      name: "Premium Dog Food",
      price: 29.99,
      categories: "Food",
      description: "High-quality dog food with all essential nutrients",
      image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4",
      featured: true,
    },
    {
      id: 2,
      name: "Cat Litter Box",
      price: 24.99,
      category: "Food",
      description: "High-quality dog food with all essential nutrients",
      image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4",
      featured: true,
    },
    {
      id: 3,
      name: "Dog leash ",
      price: 15.99,
      category: "Accessories",
      description: "Durable dog leash with comfortable handle",
      image: "https://images.unsplash.com/photo-1559131397-f94da358a7d2",
      featured: true,
    },
    {
      id: 4,
      name: "Cat Toy Set",
      price: 12.99,
      category: "Toys",
      description: "Set of 5interactive cat toys",
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84b6",
      featured: false,
    },
    {
      id: 5,
      name: "Dog Bed",
      price: 49.99,
      category: "Furniture",
      description: "Comfortable orthopedic dog bed",
      image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab2",
      featured: true,
    },
    {
      id: 6,
      name: "Fish Tank",
      price: 89.99,
      category: "Aquarium",
      description: "10-gallon glass fish tank with filter",
      image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353",
      featured: false,
    },
    {
      id: 7,
      name: "Bird Cage",
      price: 59.99,
      category: "Accessories",
      description: " Spacious bird cage with feeder",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3",
      featured: false,
    },
    {
      id: 8,
      name: "Dog Treats",
      price: 9.99,
      category: "Food",
      description: "Healthy dog treats with no additives",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
      featured: true,
    },
  ],
  categories: ["Food", "Accessories", "Toys", "Furniture", "Aquarium"],
};

//Initialize localStorage with mock data if empty.
function InitializeData() {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(mockData.products));
  }
}
