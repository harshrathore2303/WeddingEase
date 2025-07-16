import mongoose from "mongoose";
import { Service } from '../models/service.models.js';

await mongoose.connect(""); // enter mongodb credentials

const adminId = new mongoose.Types.ObjectId("6877cb1d8e066a523b033107");

const imagePool = [
  "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630161/decor_bgzh9s.jpg",
  "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630161/mandap_imfvhl.jpg",
  "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630160/dj-dance_g1yyu3.jpg",
  "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751630163/music_nohvaw.jpg",
  "https://res.cloudinary.com/dpsgxzjzw/image/upload/v1751188972/bxzgrzqe2k5qhgxtm8g0.jpg"
];

const tags = [
  "Hall", "Photographer", "Caterer", "Decorator", "Musician", "Dj",
  "Makeup Artist", "Mehendi Artist", "Planner", "Transporter", "Others"
];

const randomElement = arr => arr[Math.floor(Math.random() * arr.length)];

const getRandomImages = () => {
  const shuffled = imagePool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
};

const services = Array.from({ length: 30 }).map((_, i) => ({
  title: `${randomElement(["Elegant", "Royal", "Classic", "Elite", "Grand", "Shining", "Charming", "Glamorous"])} ${randomElement(tags)}`,
  price: Math.floor(Math.random() * 15000) + 10000,
  location: randomElement(["Jaipur", "Delhi", "Mumbai", "Bangalore", "Udaipur", "Agra", "Kolkata"]),
  dp: randomElement(imagePool),
  tag: randomElement(tags),
  imageSet: getRandomImages(),
  adminId
}));

await Service.insertMany(services);
console.log("✅ 30 Services inserted.");
await mongoose.disconnect();
