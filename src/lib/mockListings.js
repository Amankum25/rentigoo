// Mock listings data & helpers for Browse page.
// Replace with real API integration later.

export const CATEGORIES = [
  "Furniture",
  "Electronics",
  "Vehicles",
  "Tools",
  "Photography",
  "Gaming",
];

const sampleImages = {
  Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=60",
  Electronics: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=60",
  Vehicles: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
  Tools: "https://images.unsplash.com/photo-1581578731548-c64695cc6959?auto=format&fit=crop&w=800&q=60",
  Photography: "https://images.unsplash.com/photo-1508896694512-1eade558679a?auto=format&fit=crop&w=800&q=60",
  Gaming: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=60",
};

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Seattle", "Miami", "Austin", "Denver"];
const owners = ["Alex", "Mia", "Jordan", "Sam", "Taylor", "Ravi", "Chen", "Lina"]; 

export const listings = Array.from({ length: 125 }).map((_, i) => {
  const category = randomFrom(CATEGORIES);
  return {
    id: i + 1,
    title: `${category} item #${i + 1}`,
    category,
    image: sampleImages[category],
    pricePerDay: (Math.floor(Math.random() * 50) + 10),
    location: randomFrom(cities),
    owner: randomFrom(owners),
    rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
    reviewsCount: Math.floor(Math.random() * 200),
    availability: Math.random() > 0.15 ? "Available" : "Unavailable",
    createdAt: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30), // last 30 days
  };
});

// Filter & sort helpers
export function filterListings({ search = "", category = "All", minPrice = 0, maxPrice = 1000, onlyAvailable = false }) {
  return listings.filter(l => {
    if (category !== "All" && l.category !== category) return false;
    if (onlyAvailable && l.availability !== "Available") return false;
    if (l.pricePerDay < minPrice || l.pricePerDay > maxPrice) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!l.title.toLowerCase().includes(q) && !l.location.toLowerCase().includes(q) && !l.owner.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export function sortListings(list, sort) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      copy.sort((a, b) => a.pricePerDay - b.pricePerDay); break;
    case "price-desc":
      copy.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
    case "newest":
      copy.sort((a, b) => b.createdAt - a.createdAt); break;
    case "rating":
      copy.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); break;
    default:
      break;
  }
  return copy;
}
