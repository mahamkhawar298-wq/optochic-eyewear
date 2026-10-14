import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { 
  Sparkles, Sliders, User, ShoppingBag, Heart, Info, X, Check, 
  Upload, Plus, Minus, Star, MessageCircle, ThumbsUp, Menu,
  Calendar, Clock, Share2, Bookmark, ArrowLeft, Award, Users, Globe, Shield,
  MapPin, Phone, Mail, Send, Eye, Droplet, Leaf, ChevronDown, Move,
  CreditCard, Truck, Map, UserCircle, Lock, LogIn, LogOut,
  Smartphone,  CreditCard as CardIcon, Receipt, Printer
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";

// ============================================================
// DATA
// ============================================================

const ASIAN_COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "AM", name: "Armenia" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BT", name: "Bhutan" },
  { code: "BN", name: "Brunei" },
  { code: "KH", name: "Cambodia" },
  { code: "CN", name: "China" },
  { code: "CY", name: "Cyprus" },
  { code: "GE", name: "Georgia" },
  { code: "HK", name: "Hong Kong" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IL", name: "Israel" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LB", name: "Lebanon" },
  { code: "MO", name: "Macau" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "MN", name: "Mongolia" },
  { code: "MM", name: "Myanmar" },
  { code: "NP", name: "Nepal" },
  { code: "KP", name: "North Korea" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PS", name: "Palestine" },
  { code: "PH", name: "Philippines" },
  { code: "QA", name: "Qatar" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SG", name: "Singapore" },
  { code: "KR", name: "South Korea" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" }
];

const PRODUCTS = [
  {
    id: 1,
    name: "K-Style Round Classic",
    price: 9.95,
    originalPrice: 42.00,
    type: "eyeglasses",
    style: "Round",
    rating: 4.9,
    reviews: 1420,
    gender: "Unisex",
    bestFor: ["Square", "Diamond", "Oval"],
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=500&q=80",
    features: ["Superflex Beta-Titanium", "Ultra Lightweight (8.6g)", "Blue Light Filter Included"],
    colors: [
      { name: "Champagne Gold", value: "#dfba73" },
      { name: "Obsidian Black", value: "#111111" },
      { name: "Silver Chrome", value: "#d1d5db" }
    ],
    svgPath: "M 15 25 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0 M 49 22 Q 60 14 71 22 M 69 25 a 18 18 0 1 0 36 0 a 18 18 0 1 0 -36 0",
    description: "Classic round frames with modern Korean design. Perfect for square and diamond face shapes.",
    reviews_list: [
      { user: "Sarah Kim", comment: "Absolutely love these! So lightweight and comfortable.", rating: 5, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      { user: "James Park", comment: "Great quality for the price. The blue light filter really works.", rating: 4.5, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      { user: "Ming Chen", comment: "Perfect fit for my face shape. Highly recommend!", rating: 5, avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
    ],
    lensOptions: [
      { name: "Blue Light Shield", icon: Eye, desc: "Blocks 98% harmful blue light", price: 19.95 },
      { name: "Polarized Pro", icon: Droplet, desc: "Ultimate glare reduction", price: 29.95 }
    ],
    modelRecommendation: { name: "Sora (Round)", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }
  },
  {
    id: 2,
    name: "Urban Maverick Aviator",
    price: 14.95,
    originalPrice: 65.00,
    type: "sunglasses",
    style: "Aviator",
    rating: 4.8,
    reviews: 2311,
    gender: "Men",
    bestFor: ["Round", "Oval", "Heart"],
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80",
    features: ["Aerospace Alloy Structure", "TruePolarized™ Lens Core", "Adjustable Silicone Nosepods"],
    colors: [
      { name: "Satin Gold", value: "#dfba73" },
      { name: "Stealth Gray", value: "#374151" },
      { name: "Polished Gunmetal", value: "#4b5563" }
    ],
    svgPath: "M 10 20 l 8 18 a 15 15 0 0 0 24 -2 l 6 -16 M 42 16 Q 60 10 78 16 M 72 20 l -8 18 a 15 15 0 0 1 -24 -2 l -6 -16",
    description: "Bold aviator sunglasses with aerospace-grade materials. Ultimate UV protection.",
    reviews_list: [
      { user: "Mike Johnson", comment: "Best aviators I've ever owned. The polarization is incredible.", rating: 5, avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
      { user: "Lisa Wang", comment: "Stylish and durable. Worth every penny!", rating: 4.8, avatar: "https://randomuser.me/api/portraits/women/22.jpg" }
    ],
    lensOptions: [
      { name: "TruePolarized™", icon: Droplet, desc: "Premium glare reduction", price: 34.95 },
      { name: "UV400 Shield", icon: Eye, desc: "Maximum UV protection", price: 24.95 }
    ],
    modelRecommendation: { name: "Yuji (Square)", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" }
  },
  {
    id: 3,
    name: "Shanghai Hexa Geometric",
    price: 13.95,
    originalPrice: 58.00,
    type: "sunglasses",
    style: "Geometric",
    rating: 4.7,
    reviews: 984,
    gender: "Unisex",
    bestFor: ["Round", "Oval", "Heart"],
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=500&q=80",
    features: ["Polished Stainless Steel", "UV400 Triple Protection", "Scratch-Shield Coating"],
    colors: [
      { name: "Warm Gold", value: "#e5c07b" },
      { name: "Deep Amber", value: "#b45309" },
      { name: "Steel Silver", value: "#9ca3af" }
    ],
    svgPath: "M 12 25 l 10 -15 l 16 0 l 10 15 l -10 15 l -16 0 z M 48 20 Q 60 14 72 20 M 68 25 l -10 -15 l -16 0 l -10 15 l 10 15 l 16 0 z",
    description: "Geometric frames with a modern edge. Stainless steel construction.",
    reviews_list: [
      { user: "Alex Turner", comment: "Unique design that stands out. Great conversation starter!", rating: 4.5, avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
      { user: "Emma Davis", comment: "Love the geometric shape. Very comfortable fit.", rating: 4.7, avatar: "https://randomuser.me/api/portraits/women/17.jpg" }
    ],
    lensOptions: [
      { name: "UV400 Triple", icon: Eye, desc: "Full spectrum protection", price: 27.95 },
      { name: "Scratch-Shield", icon: Shield, desc: "Durable coating", price: 19.95 }
    ],
    modelRecommendation: { name: "Mei-Ling (Heart)", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" }
  },
  {
    id: 4,
    name: "Seoul Stella Cat-Eye",
    price: 16.95,
    originalPrice: 78.00,
    type: "sunglasses",
    style: "Cat-Eye",
    rating: 4.9,
    reviews: 1876,
    gender: "Women",
    bestFor: ["Square", "Oval", "Diamond"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",
    features: ["Bio-Sourced Handmolded Acetate", "Optical-Grade Spring Hinges", "Gradient Shaded Lenses"],
    colors: [
      { name: "Tortoise Shell", value: "#4a3c31" },
      { name: "Crimson Rose", value: "#9d174d" },
      { name: "Gloss Obsidian", value: "#030712" }
    ],
    svgPath: "M 8 18 q 16 -12 32 8 q -12 16 -32 -2 M 40 22 Q 60 14 80 22 M 112 18 q -16 -12 -32 8 q 12 16 32 -2",
    description: "Elegant cat-eye sunglasses. Bio-sourced materials with optical-grade hinges.",
    reviews_list: [
      { user: "Sophie Lee", comment: "Absolutely stunning! These are my go-to sunglasses now.", rating: 5, avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
      { user: "Rachel Kim", comment: "The cat-eye shape is so flattering. Love the tortoise color.", rating: 5, avatar: "https://randomuser.me/api/portraits/women/50.jpg" }
    ],
    lensOptions: [
      { name: "Gradient Shade", icon: Droplet, desc: "Stylish fade effect", price: 29.95 },
      { name: "Bio-Acetate", icon: Leaf, desc: "Eco-friendly material", price: 14.95 }
    ],
    modelRecommendation: { name: "Xiao-Wei (Diamond)", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" }
  },
  {
    id: 5,
    name: "Sophia Bold Square",
    price: 15.95,
    originalPrice: 69.00,
    type: "eyeglasses",
    style: "Square",
    rating: 4.8,
    reviews: 2102,
    gender: "Women",
    bestFor: ["Round", "Oval", "Diamond"],
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=500&q=80",
    features: ["Beveled Outer Frame Edge", "Reinforced Metal Core", "Anti-Blue-Light Premium Filter"],
    colors: [
      { name: "Crystal Sage", value: "#a1a1aa" },
      { name: "Honey Amber", value: "#d97706" },
      { name: "Polished Black", value: "#09090b" }
    ],
    svgPath: "M 12 15 h 32 v 24 h -32 z M 44 22 h 32 M 76 15 h 32 v 24 h -32 z",
    description: "Bold square frames with beveled edges. Reinforced metal core for durability.",
    reviews_list: [
      { user: "Jessica Park", comment: "These frames are so sturdy and stylish. Perfect for everyday wear.", rating: 5, avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
      { user: "Amanda Chen", comment: "The anti-blue-light filter has reduced my eye strain significantly.", rating: 4.8, avatar: "https://randomuser.me/api/portraits/women/29.jpg" }
    ],
    lensOptions: [
      { name: "Anti-Blue-Light", icon: Eye, desc: "Premium filter technology", price: 24.95 },
      { name: "Reinforced Core", icon: Shield, desc: "Extra durability", price: 14.95 }
    ],
    modelRecommendation: { name: "Sora (Round)", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }
  },
  {
    id: 6,
    name: "Lumina Edge Half-Frame",
    price: 12.95,
    originalPrice: 48.00,
    type: "eyeglasses",
    style: "Browline",
    rating: 4.6,
    reviews: 673,
    gender: "Men",
    bestFor: ["Round", "Oval", "Heart"],
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=500&q=80",
    features: ["Composite Brow Block", "Stainless Steel Semi-Rim", "Engineered Flex-Temple Arms"],
    colors: [
      { name: "Tortoise Amber", value: "#603813" },
      { name: "Steel & Graphite", value: "#1f2937" }
    ],
    svgPath: "M 10 18 c 8 -6, 24 -6, 32 0 v 16 c -8 6, -24 6, -32 0 z M 42 20 Q 60 14 78 20 M 70 18 c 8 -6, 24 -6, 32 0 v 16 c -8 6, -24 6, -32 0 z",
    description: "Sleek half-frame design. Composite brow block with flex-temple arms.",
    reviews_list: [
      { user: "David Park", comment: "Lightweight and comfortable. Great for office use.", rating: 4.5, avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
      { user: "Tom Wilson", comment: "The half-frame design is unique and modern.", rating: 4.6, avatar: "https://randomuser.me/api/portraits/men/60.jpg" }
    ],
    lensOptions: [
      { name: "Flex-Temple", icon: Sliders, desc: "Adaptive comfort", price: 19.95 },
      { name: "Semi-Rim Steel", icon: Shield, desc: "Lightweight durability", price: 14.95 }
    ],
    modelRecommendation: { name: "Jae-Min (Oval)", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }
  }
];

const LENS_COLORS = [
  { 
    name: "Clear Blue Light", 
    value: "rgba(147,197,253,0.35)", 
    gender: "Unisex", 
    skinTones: ["All"], 
    modelSize: "Medium", 
    description: "Daily protection",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Sunset Pink", 
    value: "rgba(251,113,133,0.55)", 
    gender: "Women", 
    skinTones: ["Fair", "Medium", "Olive"], 
    modelSize: "Small-Medium", 
    description: "Warm rosy glow",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Polarized Dark", 
    value: "rgba(9,9,11,0.8)", 
    gender: "Men", 
    skinTones: ["Deep", "Dark", "Olive"], 
    modelSize: "Large", 
    description: "Maximum glare reduction",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Ocean Cyan", 
    value: "rgba(6,182,212,0.55)", 
    gender: "Unisex", 
    skinTones: ["Fair", "Medium", "Olive"], 
    modelSize: "Medium", 
    description: "Refreshing blue-green",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Amber Gradient", 
    value: "rgba(245,158,11,0.45)", 
    gender: "Unisex", 
    skinTones: ["Olive", "Deep", "Dark"], 
    modelSize: "Medium-Large", 
    description: "Warm honey tones",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Forest Green", 
    value: "rgba(22,163,74,0.5)", 
    gender: "Men", 
    skinTones: ["Deep", "Dark", "Olive"], 
    modelSize: "Large", 
    description: "Earthy green",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Lavender Haze", 
    value: "rgba(168,85,247,0.4)", 
    gender: "Women", 
    skinTones: ["Fair", "Medium"], 
    modelSize: "Small-Medium", 
    description: "Soft purple",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Smoke Graphite", 
    value: "rgba(75,85,99,0.65)", 
    gender: "Men", 
    skinTones: ["All"], 
    modelSize: "Large", 
    description: "Sleek grey",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Rose Gold", 
    value: "rgba(244,114,182,0.45)", 
    gender: "Women", 
    skinTones: ["Fair", "Medium", "Olive"], 
    modelSize: "Small-Medium", 
    description: "Luxurious pink-gold",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Crystal Ice", 
    value: "rgba(243,244,246,0.2)", 
    gender: "Unisex", 
    skinTones: ["All"], 
    modelSize: "Medium", 
    description: "Subtle frost",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Burgundy Wine", 
    value: "rgba(159,18,57,0.6)", 
    gender: "Women", 
    skinTones: ["Fair", "Medium", "Olive"], 
    modelSize: "Medium", 
    description: "Rich red",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  { 
    name: "Cobalt Blue", 
    value: "rgba(37,99,235,0.55)", 
    gender: "Men", 
    skinTones: ["Deep", "Dark", "Olive"], 
    modelSize: "Large", 
    description: "Intense blue",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
    productImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  }
];

const FACE_MODELS = [
  { id: "sora", name: "Sora (Round)", shape: "Round", gender: "Women", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80", offset: 0, scale: 1.05 },
  { id: "yuji", name: "Yuji (Square)", shape: "Square", gender: "Men", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80", offset: 10, scale: 1.0 },
  { id: "jaemin", name: "Jae-Min (Oval)", shape: "Oval", gender: "Men", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80", offset: -5, scale: 0.98 },
  { id: "meiling", name: "Mei-Ling (Heart)", shape: "Heart", gender: "Women", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80", offset: 15, scale: 0.95 },
  { id: "xiaowei", name: "Xiao-Wei (Diamond)", shape: "Diamond", gender: "Women", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80", offset: -8, scale: 1.02 }
];

const TESTIMONIALS = [
  { name: "Lisa Chen", role: "Fashion Influencer", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80", comment: "OptoChic completely changed my eyewear game. The Asian fit is unmatched!", rating: 5 },
  { name: "Marcus Kim", role: "Tech Reviewer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80", comment: "The blue light filter technology is superior. My eye strain has decreased by 80%.", rating: 5 },
  { name: "Yuki Tanaka", role: "Style Blogger", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", comment: "Finally, frames that don't slide down my nose! The engineering is incredible.", rating: 4.9 }
];

const BLOG_POSTS = [
  {
    slug: "asian-fit-eyewear-guide",
    title: "The Ultimate Guide to Asian-Fit Eyewear",
    excerpt: "Discover why traditional glasses don't fit Asian faces and how our engineered frames solve the problem.",
    author: "Dr. Sarah Kim",
    date: "June 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    category: "Education",
    tags: ["Asian Fit", "Face Shape", "Comfort"],
    content: `<p>For decades, the eyewear industry has largely ignored the unique facial characteristics of Asian populations.</p><h2>Why Traditional Frames Don't Fit</h2><p>The average Asian face has a flatter nose bridge, wider cheekbones, and less prominent brow ridges.</p><h2>The Anatomy of Asian-Fit Frames</h2><p>Asian-fit eyewear is engineered with specific modifications: Higher Nose Pads, Flatter Temple Angle, Reduced Lens Curvature.</p>`
  },
  {
    slug: "blue-light-protection-science",
    title: "The Science Behind Blue Light Protection",
    excerpt: "Learn how our premium blue light filters protect your eyes from digital eye strain.",
    author: "Dr. James Park",
    date: "June 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    tags: ["Blue Light", "Eye Health", "Technology"],
    content: `<p>In our digital age, we're exposed to more blue light than ever before.</p><h2>What is Blue Light?</h2><p>Blue light is a high-energy, short-wavelength light on the visible spectrum.</p>`
  },
  {
    slug: "korean-eyewear-trends-2026",
    title: "Top Korean Eyewear Trends for 2026",
    excerpt: "From bold geometric shapes to sustainable acetate frames, explore the hottest trends from Seoul.",
    author: "Min-ji Lee",
    date: "June 5, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    category: "Trends",
    tags: ["Trends", "K-Style", "Fashion"],
    content: `<p>Seoul continues to be at the forefront of global eyewear fashion.</p><h2>Geometric Boldness</h2><p>Hexagonal and octagonal frames are taking center stage.</p>`
  }
];

// ============================================================
// CONTEXT
// ============================================================

const AppContext = createContext();

function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentTab, setCurrentTab] = useState("home");
  const [toastMessage, setToastMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("optichic_cart");
    const savedFav = localStorage.getItem("optichic_favorites");
    const savedUser = localStorage.getItem("optichic_user");
    const savedOrders = localStorage.getItem("optichic_orders");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFav) setFavorites(JSON.parse(savedFav));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem("optichic_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("optichic_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) localStorage.setItem("optichic_user", JSON.stringify(user));
    else localStorage.removeItem("optichic_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("optichic_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, color, qty = 1) => {
    if (!user) {
      triggerToast("Please sign in to add items to your cart.");
      return false;
    }
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedColor === color);
      if (existing) {
        return prev.map(item => item.product.id === product.id && item.selectedColor === color ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { product, qty, selectedColor: color }];
    });
    triggerToast(`Added ${product.name} to your bag.`);
    return true;
  };

  const removeFromCart = (productId, color) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedColor === color)));
  };

  const updateCartQty = (productId, color, qty) => {
    if (qty <= 0) { removeFromCart(productId, color); return; }
    setCart(prev => prev.map(item => item.product.id === productId && item.selectedColor === color ? { ...item, qty } : item));
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) { triggerToast("Removed from wishlist."); return prev.filter(id => id !== productId); }
      triggerToast("Added to wishlist."); return [...prev, productId];
    });
  };

  const triggerToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3000); };
  const getCartTotal = () => cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const getCartCount = () => cart.reduce((count, item) => count + item.qty, 0);
  const clearCart = () => setCart([]);

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      cart, setCart, favorites, setFavorites, currentTab, setCurrentTab, 
      toastMessage, triggerToast, addToCart, removeFromCart, updateCartQty, 
      toggleFavorite, getCartTotal, getCartCount, clearCart,
      user, setUser, orders, addOrder,
      PRODUCTS, FACE_MODELS, TESTIMONIALS, BLOG_POSTS, LENS_COLORS, ASIAN_COUNTRIES
    }}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() { return useContext(AppContext); }

// ============================================================
// ThreeDBackground
// ============================================================

function ThreeDBackground() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouseX((e.clientX - rect.left) / rect.width - 0.5);
      setMouseY((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="three-d-bg" ref={containerRef}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="bg-orb"
          animate={{
            x: mouseX * (30 + i * 10),
            y: mouseY * (20 + i * 8),
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: 80 + i * 30,
            height: 80 + i * 30,
            background: `radial-gradient(circle, rgba(181,141,103,${0.04 + i * 0.01}), transparent 70%)`,
            left: `${10 + i * 12}%`,
            top: `${15 + i * 8}%`,
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />
      ))}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`box-${i}`}
          className="bg-box"
          animate={{
            x: mouseX * (-40 + i * 15),
            y: mouseY * (-30 + i * 12),
            rotateX: mouseX * 15 + i * 30,
            rotateY: mouseY * 20 + i * 25,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            width: 40 + i * 15,
            height: 40 + i * 15,
            border: `1px solid rgba(181,141,103,${0.05 + i * 0.02})`,
            background: `rgba(255,255,255,${0.02 + i * 0.01})`,
            backdropFilter: 'blur(4px)',
            left: `${5 + i * 16}%`,
            top: `${20 + i * 10}%`,
            position: 'absolute',
            borderRadius: '4px',
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// ScrollIndicator
// ============================================================

function ScrollIndicator() {
  return (
    <motion.div
      className="scroll-indicator"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>SCROLL</span>
        <ChevronDown size={20} />
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// RevealOnScroll
// ============================================================

function RevealOnScroll({ children, direction = "up", delay = 0, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useInView({ threshold = 0.1, triggerOnce = true }) {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin: "0px 0px -100px 0px" }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, triggerOnce]);

  return [setRef, inView];
}

// ============================================================
// HEADER
// ============================================================

function Header({ setCurrentTab, setIsCartOpen, currentTab }) {
  const { getCartCount, favorites, user, setUser, triggerToast, orders } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "customizer", label: "Try-On" },
    { id: "faceguide", label: "Face Guide" },
    { id: "tracking", label: "Track Order" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLogin) {
      const storedUsers = JSON.parse(localStorage.getItem("optichic_users") || "{}");
      if (storedUsers[authEmail] && storedUsers[authEmail].password === authPassword) {
        setUser({ email: authEmail, name: storedUsers[authEmail].name });
        triggerToast(`Welcome back, ${storedUsers[authEmail].name}!`);
        setShowAuthModal(false);
        setAuthEmail("");
        setAuthPassword("");
      } else {
        triggerToast("Invalid email or password.");
      }
    } else {
      if (authName.trim().length < 2) {
        triggerToast("Please enter your full name.");
        return;
      }
      if (authPassword.length < 4) {
        triggerToast("Password must be at least 4 characters.");
        return;
      }
      const storedUsers = JSON.parse(localStorage.getItem("optichic_users") || "{}");
      if (storedUsers[authEmail]) {
        triggerToast("This email is already registered.");
        return;
      }
      storedUsers[authEmail] = { name: authName, password: authPassword };
      localStorage.setItem("optichic_users", JSON.stringify(storedUsers));
      setUser({ email: authEmail, name: authName });
      triggerToast(`Welcome, ${authName}! You're now registered.`);
      setShowAuthModal(false);
      setAuthEmail("");
      setAuthPassword("");
      setAuthName("");
    }
  };

  const handleLogout = () => {
    setUser(null);
    triggerToast("Logged out.");
  };

  return (
    <>
      <motion.header
        className={`header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ThreeDBackground />
        <div className="top-banner">
          <div className="marquee"><span><Sparkles size={12} /> K-STYLE & CHINESE GLASSES REVOLUTION • FIRST PAIR FREE (PAY $9.95 SHIPPING) • CODE: SAVE20 FOR 20% EXTRA <Sparkles size={12} /></span></div>
        </div>
        <div className="header-main">
          <div className="header-inner">
            <div className="header-left">
              <motion.div className="logo" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentTab("home")}>
                <h1>OPTO<span>CHIC</span></h1>
                <span className="logo-sub">✦ ATELIER VISUEL ✦</span>
              </motion.div>
              <nav className="desktop-nav">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => { setCurrentTab(item.id); setIsMobileMenuOpen(false); }} className={`nav-link ${currentTab === item.id ? 'active' : ''}`}>
                    {item.label}
                    {currentTab === item.id && <motion.div className="nav-underline" layoutId="navUnderline" transition={{ duration: 0.3 }} />}
                  </button>
                ))}
              </nav>
            </div>
            <div className="header-right">
              {user ? (
                <div className="user-info">
                  <span className="user-name"><UserCircle size={18} /> {user.name}</span>
                  <motion.button className="icon-btn orders-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setCurrentTab("orders")}>
                    <Receipt size={18} />
                    {orders.length > 0 && <span className="badge">{orders.length}</span>}
                  </motion.button>
                  <motion.button className="icon-btn logout-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleLogout}>
                    <LogOut size={18} />
                  </motion.button>
                </div>
              ) : (
                <motion.button className="icon-btn login-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowAuthModal(true)}>
                  <LogIn size={20} />
                  <span className="login-label">Sign In</span>
                </motion.button>
              )}
              <motion.button className="icon-btn" whileHover={{ scale: 1.1, backgroundColor: 'rgba(181,141,103,0.1)' }} whileTap={{ scale: 0.9 }} onClick={() => setCurrentTab("favorites")}>
                <Heart size={20} />
                {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
              </motion.button>
              <motion.button className="cart-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={18} /> Bag <span className="cart-badge">{getCartCount()}</span>
              </motion.button>
              <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div className="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
              {navItems.map((item) => (
                <button key={item.id} className={`mobile-nav-link ${currentTab === item.id ? 'active' : ''}`} onClick={() => { setCurrentTab(item.id); setIsMobileMenuOpen(false); }}>{item.label}</button>
              ))}
              {user ? (
                <>
                  <button className="mobile-nav-link" onClick={() => { setCurrentTab("orders"); setIsMobileMenuOpen(false); }}>My Orders</button>
                  <button className="mobile-nav-link" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Logout</button>
                </>
              ) : (
                <button className="mobile-nav-link" onClick={() => { setShowAuthModal(true); setIsMobileMenuOpen(false); }}>Sign In / Register</button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {showAuthModal && (
          <motion.div className="modal-overlay" onClick={() => setShowAuthModal(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content auth-modal" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25 }}>
              <motion.button onClick={() => setShowAuthModal(false)} className="modal-close" whileHover={{ scale: 1.1, rotate: 90 }}><X size={16} /></motion.button>
              <h3 className="auth-title">{isLogin ? "Welcome Back" : "Create Account"}</h3>
              <form onSubmit={handleAuth} className="auth-form">
                {!isLogin && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} required placeholder="Your full name" />
                  </div>
                )}
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required placeholder="••••••••" minLength={4} />
                </div>
                <button type="submit" className="btn-gold auth-submit">{isLogin ? "Sign In" : "Register"}</button>
              </form>
              <p className="auth-switch">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button className="auth-switch-btn" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Register" : "Sign In"}</button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// ThreeDLensBox
// ============================================================

function ThreeDLensBox({ lens, onClick, isSelected }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFlipped) setRotationY(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isFlipped]);

  return (
    <motion.div 
      className={`three-d-lens-box ${isSelected ? 'selected' : ''}`}
      onClick={() => {
        setIsFlipped(!isFlipped);
        onClick && onClick(lens);
      }} 
      whileHover={{ scale: 1.08, zIndex: 10, boxShadow: '0 20px 60px rgba(181,141,103,0.3)' }} 
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="three-d-lens-inner" 
        animate={{ 
          rotateX: isFlipped ? 180 : 0, 
          rotateY: isFlipped ? 0 : rotationY 
        }} 
        transition={{ type: "spring", stiffness: 200, damping: 25 }} 
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        <div className="lens-face front" style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          background: `linear-gradient(135deg, ${lens.value}ee, ${lens.value}cc, rgba(255,255,255,0.1))`,
          borderRadius: '16px', border: isSelected ? '3px solid #B58D67' : '2px solid rgba(255,255,255,0.3)',
          boxShadow: isSelected ? '0 0 40px rgba(181,141,103,0.3)' : '0 8px 32px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          padding: '20px', overflow: 'hidden'
        }}>
          {lens.productImage && (
            <img 
              src={lens.productImage} 
              alt={lens.name}
              onLoad={() => setImageLoaded(true)}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'absolute', 
                opacity: imageLoaded ? 0.3 : 0,
                filter: 'blur(0px)',
                transition: 'opacity 0.5s ease'
              }} 
            />
          )}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 30% 30%, ${lens.value}44, ${lens.value}cc)`,
            borderRadius: '16px',
          }} />
          <div style={{ 
            fontSize: '56px', 
            fontWeight: '200', 
            color: 'white', 
            textShadow: '0 2px 30px rgba(0,0,0,0.6)',
            zIndex: 2,
            position: 'relative',
            letterSpacing: '2px'
          }}>
            {lens.name.charAt(0)}
          </div>
          <span style={{ 
            color: 'white', 
            fontSize: '13px', 
            fontWeight: '600', 
            textShadow: '0 2px 16px rgba(0,0,0,0.6)', 
            marginTop: '8px',
            textAlign: 'center',
            zIndex: 2,
            position: 'relative'
          }}>
            {lens.name}
          </span>
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginTop: '12px', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            zIndex: 2,
            position: 'relative'
          }}>
            <span style={{ 
              background: 'rgba(255,255,255,0.3)', 
              padding: '3px 14px', 
              borderRadius: '20px', 
              fontSize: '9px', 
              color: 'white',
              backdropFilter: 'blur(10px)',
              fontWeight: '600'
            }}>
              {lens.gender}
            </span>
            <span style={{ 
              background: 'rgba(255,255,255,0.3)', 
              padding: '3px 14px', 
              borderRadius: '20px', 
              fontSize: '9px', 
              color: 'white',
              backdropFilter: 'blur(10px)',
              fontWeight: '600'
            }}>
              {lens.modelSize}
            </span>
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: '12px', 
            right: '12px', 
            zIndex: 2, 
            color: 'rgba(255,255,255,0.6)',
            fontSize: '8px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            ✦ 3D Lens
          </div>
        </div>

        <div className="lens-face back" style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', 
          transform: 'rotateX(180deg)',
          background: `linear-gradient(145deg, ${lens.value}ee, ${lens.value}aa)`,
          borderRadius: '16px', border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          padding: '20px'
        }}>
          {lens.image && (
            <img 
              src={lens.image} 
              alt={lens.name}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'absolute', 
                opacity: 0.15,
                filter: 'blur(0px)'
              }} 
            />
          )}
          <div style={{ 
            color: 'white', 
            fontSize: '12px', 
            textAlign: 'center', 
            textShadow: '0 2px 16px rgba(0,0,0,0.5)', 
            lineHeight: '2.2',
            zIndex: 2,
            position: 'relative'
          }}>
            <strong style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9 }}>
              Skin Tones:
            </strong><br />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              {lens.skinTones.join(' • ')}
            </span>
            <br /><br />
            <strong style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.9 }}>
              Best For:
            </strong><br />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              {lens.gender} • {lens.modelSize}
            </span>
            <br /><br />
            <span style={{ fontSize: '10px', opacity: 0.7 }}>
              Click to flip back
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// ORDER TRACKING PAGE
// ============================================================

function OrderTrackingPage({ setCurrentTab }) {
  const { orders, user } = useApp();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackingStatus, setTrackingStatus] = useState("");
  const [statusProgress, setStatusProgress] = useState(0);

  const handleTrackOrder = (e) => {
    if (e) e.preventDefault();
    if (!trackingNumber.trim()) {
      setTrackingStatus("Please enter a tracking number.");
      return;
    }

    const foundOrder = orders.find(order => order.orderNumber === trackingNumber.trim().toUpperCase());
    
    if (foundOrder) {
      setTrackedOrder(foundOrder);
      setTrackingStatus(`✅ Order found! Order #${foundOrder.orderNumber}`);
      setStatusProgress(0);
      
      const statuses = [
        "📦 Order Confirmed",
        "🔄 Processing",
        "📋 Quality Check",
        "✈️ Shipped",
        "🚚 Out for Delivery",
        "✅ Delivered"
      ];
      
      let currentStatusIndex = 0;
      const statusInterval = setInterval(() => {
        if (currentStatusIndex < statuses.length - 1) {
          currentStatusIndex++;
          setTrackedOrder(prev => ({
            ...prev,
            trackingStatus: statuses[currentStatusIndex]
          }));
          setStatusProgress((currentStatusIndex / (statuses.length - 1)) * 100);
        } else {
          clearInterval(statusInterval);
        }
      }, 1500);
      
      setTimeout(() => clearInterval(statusInterval), 10000);
      
    } else {
      setTrackingStatus("❌ Order not found. Please check your tracking number.");
      setTrackedOrder(null);
      setStatusProgress(0);
    }
  };

  if (!user) {
    return (
      <motion.div className="tracking-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
        <div className="tracking-header"><h2>Order Tracking</h2></div>
        <div className="orders-empty">
          <Lock size={48} color="#B58D67" />
          <h3>Please Sign In</h3>
          <p>Sign in to track your orders.</p>
          <button className="btn-gold" onClick={() => setCurrentTab("home")}>Go to Home</button>
        </div>
      </motion.div>
    );
  }

  const statusSteps = ["Order Confirmed", "Processing", "Quality Check", "Shipped", "Out for Delivery", "Delivered"];

  return (
    <motion.div className="tracking-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="tracking-header">
        <h2><Truck size={28} color="#B58D67" /> Track Your Order</h2>
        <p>Enter your order number to track your delivery status</p>
      </div>

      <div className="tracking-search">
        <form onSubmit={handleTrackOrder} className="tracking-form">
          <input 
            type="text" 
            placeholder="Enter Order Number (e.g. OPTO-123456-789)" 
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="tracking-input"
          />
          <button type="submit" className="btn-gold tracking-btn">
            <Truck size={18} /> Track Order
          </button>
        </form>
        {trackingStatus && (
          <p className={`tracking-status ${trackedOrder ? 'success' : 'error'}`}>
            {trackingStatus}
          </p>
        )}
      </div>

      {trackedOrder && (
        <motion.div 
          className="tracking-result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="tracking-order-info">
            <div className="tracking-order-header">
              <h3>Order #{trackedOrder.orderNumber}</h3>
              <span className="tracking-date">{new Date(trackedOrder.date).toLocaleDateString()}</span>
            </div>
            <div className="tracking-customer-info">
              <span>👤 {trackedOrder.customer.name}</span>
              <span>📍 {trackedOrder.customer.address}, {trackedOrder.customer.city}</span>
              <span>📞 {trackedOrder.customer.phone}</span>
            </div>
          </div>

          <div className="tracking-progress">
            <h4>Delivery Status</h4>
            <div className="tracking-progress-bar">
              <motion.div 
                className="tracking-progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${statusProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="tracking-current-status">
              {trackedOrder.trackingStatus || "📦 Order Confirmed"}
            </p>
            <div className="tracking-status-steps">
              {statusSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`tracking-step ${statusProgress >= (idx / (statusSteps.length - 1)) * 100 ? 'completed' : ''}`}
                >
                  <div className="tracking-step-dot" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tracking-items">
            <h4>Items in Order</h4>
            {trackedOrder.items.map((item, idx) => (
              <div key={idx} className="tracking-item">
                <span>{item.name}</span>
                <span>Qty: {item.qty}</span>
                <span>${item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="tracking-total">
            <span>Total Paid</span>
            <span>${trackedOrder.total.toFixed(2)}</span>
          </div>
        </motion.div>
      )}

      <div className="tracking-recent-orders">
        <h3>Recent Orders</h3>
        {orders.length === 0 ? (
          <p>No orders to display.</p>
        ) : (
          <div className="recent-orders-list">
            {orders.slice(0, 5).map((order, idx) => (
              <motion.div 
                key={idx} 
                className="recent-order-item"
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setTrackingNumber(order.orderNumber);
                  handleTrackOrder({ preventDefault: () => {} });
                }}
              >
                <span className="recent-order-number">{order.orderNumber}</span>
                <span className="recent-order-date">{new Date(order.date).toLocaleDateString()}</span>
                <span className="recent-order-amount">${order.total.toFixed(2)}</span>
                <button className="recent-order-track-btn">Track</button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================
// PAYMENT MODAL
// ============================================================

function PaymentModal({ isOpen, onClose, total, onPaymentComplete }) {
  const { user, cart,clearCart, addOrder, triggerToast, ASIAN_COUNTRIES } = useApp();
  const [step, setStep] = useState("checkout");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [easyPaisaNumber, setEasyPaisaNumber] = useState("");
  const [selectedApp, setSelectedApp] = useState("jazzcash");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [statusProgress, setStatusProgress] = useState(0);
  
  const [checkoutData, setCheckoutData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    country: "South Korea",
    deliveryInstructions: ""
  });

  const paymentApps = [
    { id: "jazzcash", name: "JazzCash", icon: Smartphone, color: "#e11d48" },
    { id: "easypaisa", name: "EasyPaisa", icon: Smartphone, color: "#7c3aed" },
    { id: "paypal", name: "PayPal", icon: CreditCard, color: "#003087" },
    { id: "googlepay", name: "Google Pay", icon: Smartphone, color: "#4285f4" },
    { id: "applepay", name: "Apple Pay", icon: Smartphone, color: "#1a1a1a" },
  ];

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!checkoutData.fullName || !checkoutData.email || !checkoutData.phone || 
        !checkoutData.address || !checkoutData.city || !checkoutData.postalCode || !checkoutData.country) {
      triggerToast("Please fill in all required fields.");
      return;
    }
    setStep("payment");
  };

  const generateOrderNumber = () => {
    const prefix = "OPTO";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStatus("Processing payment...");
    setStatusProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setStatusProgress(progress);
      
      if (progress <= 30) {
        setPaymentStatus(`⏳ Verifying payment details... ${progress}%`);
      } else if (progress <= 60) {
        setPaymentStatus(`⏳ Processing transaction... ${progress}%`);
      } else if (progress <= 90) {
        setPaymentStatus(`⏳ Confirming with bank... ${progress}%`);
      } else {
        setPaymentStatus(`✅ Payment successful! Finalizing order...`);
        clearInterval(interval);
        
        setTimeout(() => {
          const newOrderNumber = generateOrderNumber();
          setOrderNumber(newOrderNumber);
          
          const order = {
            orderNumber: newOrderNumber,
            date: new Date().toISOString(),
            items: cart.map(item => ({
              name: item.product.name,
              qty: item.qty,
              price: item.product.price,
              total: item.product.price * item.qty
            })),
            total: total,
            paymentMethod: paymentMethod === "card" ? "Credit Card" : 
                           paymentMethod === "easypaisa" ? "EasyPaisa" :
                           paymentMethod === "app" ? selectedApp : "Cash",
            trackingStatus: "📦 Order Confirmed",
            customer: {
              name: checkoutData.fullName,
              email: checkoutData.email,
              phone: checkoutData.phone,
              address: checkoutData.address,
              apartment: checkoutData.apartment,
              city: checkoutData.city,
              country: checkoutData.country,
              postalCode: checkoutData.postalCode
            },
            deliveryInstructions: checkoutData.deliveryInstructions
          };
          
          addOrder(order);
          clearCart();
          setIsProcessing(false);
          setStep("receipt");
          triggerToast("Payment successful! Your order has been confirmed.");
        }, 500);
      }
    }, 300);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (!isOpen) return null;

  if (step === "receipt") {
    return (
      <motion.div className="modal-overlay" onClick={() => {}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="modal-content receipt-modal" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25 }}>
          <div className="receipt-container" id="receipt">
            <div className="receipt-header">
              <h2>OPTOCHIC</h2>
              <p>✦ ATELIER VISUEL ✦</p>
              <div className="receipt-divider"></div>
            </div>
            <div className="receipt-body">
              <div className="receipt-order-info">
                <span className="receipt-label">Order #</span>
                <span className="receipt-value">{orderNumber}</span>
              </div>
              <div className="receipt-order-info">
                <span className="receipt-label">Date</span>
                <span className="receipt-value">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="receipt-order-info">
                <span className="receipt-label">Customer</span>
                <span className="receipt-value">{checkoutData.fullName}</span>
              </div>
              <div className="receipt-order-info">
                <span className="receipt-label">Email</span>
                <span className="receipt-value">{checkoutData.email}</span>
              </div>
              <div className="receipt-order-info">
                <span className="receipt-label">Phone</span>
                <span className="receipt-value">{checkoutData.phone}</span>
              </div>
              <div className="receipt-order-info">
                <span className="receipt-label">Delivery Address</span>
                <span className="receipt-value">{checkoutData.address}{checkoutData.apartment ? `, ${checkoutData.apartment}` : ''}, {checkoutData.city}, {checkoutData.country} {checkoutData.postalCode}</span>
              </div>
              <div className="receipt-divider"></div>
              <div className="receipt-items">
                <div className="receipt-items-header">
                  <span>Item</span>
                  <span>Qty</span>
                  <span>Total</span>
                </div>
                {cart.map((item, idx) => (
                  <div key={idx} className="receipt-item">
                    <span>{item.product.name}</span>
                    <span>{item.qty}</span>
                    <span>${(item.product.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="receipt-divider"></div>
              <div className="receipt-totals">
                <div className="receipt-total-row">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="receipt-total-row">
                  <span>Delivery</span>
                  <span>$9.95</span>
                </div>
                <div className="receipt-total-row grand">
                  <span>Grand Total</span>
                  <span>${(total + 9.95).toFixed(2)}</span>
                </div>
              </div>
              <div className="receipt-divider"></div>
              <div className="receipt-payment">
                <span className="receipt-label">Payment Method</span>
                <span className="receipt-value">
                  {paymentMethod === "card" ? "💳 Credit Card" : 
                   paymentMethod === "easypaisa" ? "📱 EasyPaisa" :
                   paymentMethod === "app" ? `📱 ${paymentApps.find(a => a.id === selectedApp)?.name}` : "Cash"}
                </span>
              </div>
              {checkoutData.deliveryInstructions && (
                <div className="receipt-order-info" style={{ marginTop: '8px' }}>
                  <span className="receipt-label">Delivery Instructions</span>
                  <span className="receipt-value">{checkoutData.deliveryInstructions}</span>
                </div>
              )}
            </div>
            <div className="receipt-footer">
              <p>Thank you for your purchase!</p>
              <p className="receipt-thanks">Your frames will be delivered within 3-5 business days.</p>
              <p className="receipt-track">📦 Track your order with: <strong>{orderNumber}</strong></p>
            </div>
          </div>
          <div className="receipt-actions">
            <motion.button onClick={handlePrintReceipt} className="btn-gold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Printer size={16} /> Print Receipt
            </motion.button>
            <motion.button onClick={() => { onClose(); onPaymentComplete(); }} className="btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Done
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  if (step === "payment") {
    return (
      <motion.div className="modal-overlay" onClick={() => {}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="modal-content payment-modal" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25 }}>
          <motion.button onClick={() => setStep("checkout")} className="modal-back" whileHover={{ scale: 1.1 }}><ArrowLeft size={16} /> Back</motion.button>
          <motion.button onClick={onClose} className="modal-close" whileHover={{ scale: 1.1, rotate: 90 }}><X size={16} /></motion.button>
          
          <div className="payment-header">
            <h3><CreditCard size={24} color="#B58D67" /> Payment</h3>
            <p>Total: <strong>${(total + 9.95).toFixed(2)}</strong></p>
          </div>

          {isProcessing ? (
            <div className="payment-processing">
              <div className="spinner-large"></div>
              <div className="payment-progress-bar">
                <motion.div 
                  className="payment-progress-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: `${statusProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="payment-status-text">{paymentStatus}</p>
              <p className="payment-progress-percent">{Math.round(statusProgress)}%</p>
            </div>
          ) : (
            <form onSubmit={handlePayment} className="payment-form">
              <div className="payment-methods">
                <h4>Select Payment Method</h4>
                <div className="payment-method-grid">
                  <motion.div 
                    className={`payment-method-option ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CardIcon size={24} color="#B58D67" />
                    <span>Credit / Debit Card</span>
                    {paymentMethod === 'card' && <Check size={16} color="#059669" />}
                  </motion.div>
                  <motion.div 
                    className={`payment-method-option ${paymentMethod === 'easypaisa' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('easypaisa')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Smartphone size={24} color="#B58D67" />
                    <span>EasyPaisa</span>
                    {paymentMethod === 'easypaisa' && <Check size={16} color="#059669" />}
                  </motion.div>
                  <motion.div 
                    className={`payment-method-option ${paymentMethod === 'app' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('app')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Smartphone size={24} color="#B58D67" />
                    <span>Mobile Wallet</span>
                    {paymentMethod === 'app' && <Check size={16} color="#059669" />}
                  </motion.div>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="card-details">
                  <h4>Card Details</h4>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="1234 5678 9012 3456" required />
                  </div>
                  <div className="form-group">
                    <label>Name on Card</label>
                    <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="John Doe" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry</label>
                      <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} placeholder="MM/YY" required />
                    </div>
                    <div className="form-group">
                      <label>CVC</label>
                      <input type="text" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} placeholder="123" required />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'easypaisa' && (
                <div className="easypaisa-details">
                  <h4>EasyPaisa Details</h4>
                  <div className="form-group">
                    <label>EasyPaisa Mobile Number</label>
                    <input type="tel" value={easyPaisaNumber} onChange={(e) => setEasyPaisaNumber(e.target.value)} placeholder="03XX-XXXXXXX" required />
                  </div>
                  <div className="easypaisa-info">
                    <p>📱 You will receive a payment request on your EasyPaisa app.</p>
                    <p>🔒 Please confirm the payment to complete your order.</p>
                  </div>
                </div>
              )}

              {paymentMethod === 'app' && (
                <div className="app-details">
                  <h4>Select Mobile Wallet</h4>
                  <div className="app-grid">
                    {paymentApps.map((app) => (
                      <motion.div 
                        key={app.id}
                        className={`app-option ${selectedApp === app.id ? 'active' : ''}`}
                        onClick={() => setSelectedApp(app.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ borderColor: selectedApp === app.id ? app.color : 'transparent' }}
                      >
                        <app.icon size={28} color={app.color} />
                        <span>{app.name}</span>
                        {selectedApp === app.id && <Check size={14} color="#059669" />}
                      </motion.div>
                    ))}
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input type="tel" placeholder="03XX-XXXXXXX" required />
                  </div>
                </div>
              )}

              <motion.button 
                type="submit" 
                className="btn-gold payment-submit" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                disabled={isProcessing}
              >
                Pay ${(total + 9.95).toFixed(2)}
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // Step: Checkout
  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-content checkout-modal" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25 }}>
        <motion.button onClick={onClose} className="modal-close" whileHover={{ scale: 1.1, rotate: 90 }}><X size={16} /></motion.button>
        <h3 className="checkout-title"><Truck size={24} color="#B58D67" /> Delivery Details</h3>
        <form onSubmit={handleCheckoutSubmit} className="checkout-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="fullName" value={checkoutData.fullName} onChange={handleCheckoutChange} required placeholder="Your full name" />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={checkoutData.email} onChange={handleCheckoutChange} required placeholder="you@example.com" />
            </div>
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input type="tel" name="phone" value={checkoutData.phone} onChange={handleCheckoutChange} required placeholder="+82 10-1234-5678" />
          </div>
          <div className="form-group">
            <label>Street Address *</label>
            <input type="text" name="address" value={checkoutData.address} onChange={handleCheckoutChange} required placeholder="Street address" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Apartment / Suite</label>
              <input type="text" name="apartment" value={checkoutData.apartment} onChange={handleCheckoutChange} placeholder="Apt, suite, etc." />
            </div>
            <div className="form-group">
              <label>Postal Code *</label>
              <input type="text" name="postalCode" value={checkoutData.postalCode} onChange={handleCheckoutChange} required placeholder="Postal code" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input type="text" name="city" value={checkoutData.city} onChange={handleCheckoutChange} required placeholder="City" />
            </div>
            <div className="form-group">
              <label>Country *</label>
              <select 
                name="country" 
                value={checkoutData.country} 
                onChange={handleCheckoutChange} 
                required 
                className="country-select"
              >
                <option value="">Select an Asian Country</option>
                {ASIAN_COUNTRIES.map(country => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label><Map size={16} /> Delivery Location</label>
            <div className="map-container">
              <div className="map-placeholder">
                <Map size={32} color="#B58D67" />
                <p>{checkoutData.city || "Seoul"}, {checkoutData.country || "South Korea"}</p>
                <span className="map-sub">📍 Delivery address will be used for location</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Delivery Instructions (Optional)</label>
            <input type="text" name="deliveryInstructions" value={checkoutData.deliveryInstructions} onChange={handleCheckoutChange} placeholder="Gate code, landmark, etc." />
          </div>
          <div className="checkout-summary-mini">
            <div className="summary-row">
              <span>Items: {cart.length}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span>$9.95</span>
            </div>
            <div className="summary-row grand-total">
              <span>Total</span>
              <span>${(total + 9.95).toFixed(2)}</span>
            </div>
          </div>
          <button type="submit" className="btn-gold checkout-submit">
            Proceed to Payment → ${(total + 9.95).toFixed(2)}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// CART DRAWER
// ============================================================

function CartDrawer({ isOpen, setIsOpen }) {
  const { cart, removeFromCart, updateCartQty, getCartTotal, triggerToast, user } = useApp();
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const totalSubtotal = getCartTotal();
  const discountAmount = totalSubtotal * discountPercent;
  const deliveryCharges = totalSubtotal > 0 ? 9.95 : 0;
  const grandTotal = totalSubtotal - discountAmount + deliveryCharges;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "SAVE20") { setDiscountPercent(0.20); setPromoMessage("Promo Applied: 20% Discount!"); }
    else if (code === "FIRST10") { setDiscountPercent(0.10); setPromoMessage("Promo Applied: 10% Discount!"); }
    else { setPromoMessage("Invalid code. Try 'SAVE20' or 'FIRST10'"); setDiscountPercent(0); }
  };

  const handleCheckout = () => {
    if (!user) {
      triggerToast("Please sign in to proceed with checkout.");
      return;
    }
    if (cart.length === 0) {
      triggerToast("Your cart is empty.");
      return;
    }
    setShowPayment(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div className="cart-overlay" onClick={() => setIsOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="cart-drawer" onClick={e => e.stopPropagation()} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25 }}>
          <div className="cart-header">
            <h3><ShoppingBag size={20} color="#B58D67" /> My Styled Selection</h3>
            <motion.button onClick={() => setIsOpen(false)} className="cart-close" whileHover={{ scale: 1.1, rotate: 90 }}><X size={20} /></motion.button>
          </div>
          {!user && (
            <div className="cart-login-warning">
              <Lock size={16} color="#B58D67" />
              <span>Please <strong>Sign In</strong> to add items and checkout.</span>
            </div>
          )}
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Checkout bag is empty.</p>
                <p className="sub-text">Select frame in tryon or catalog to custom build.</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <motion.div key={idx} className="cart-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                  <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h5 className="cart-item-name">{item.product.name}</h5>
                    <div className="cart-item-color"><span>Color:</span><span className="color-swatch" style={{ background: item.selectedColor }} /></div>
                    <div className="cart-item-footer">
                      <span className="cart-item-price">${item.product.price.toFixed(2)}</span>
                      <div className="cart-item-qty">
                        <button onClick={() => updateCartQty(item.product.id, item.selectedColor, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateCartQty(item.product.id, item.selectedColor, item.qty + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                  <motion.button onClick={() => removeFromCart(item.product.id, item.selectedColor)} className="cart-item-remove" whileHover={{ scale: 1.2, color: '#ef4444' }}><X size={16} /></motion.button>
                </motion.div>
              ))
            )}
          </div>
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row"><span>Subtotal:</span><span>${totalSubtotal.toFixed(2)}</span></div>
              <div className="cart-promo">
                <input type="text" placeholder="TRY 'SAVE20' OR 'FIRST10'" value={promoCode} onChange={e => setPromoCode(e.target.value)} />
                <motion.button onClick={applyPromo} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Apply</motion.button>
              </div>
              {promoMessage && <motion.p className="promo-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{promoMessage}</motion.p>}
              {discountAmount > 0 && <div className="cart-total-row" style={{ color: '#059669', fontWeight: '700' }}><span>Discount:</span><span>-${discountAmount.toFixed(2)}</span></div>}
              <div className="cart-total-row"><span>Delivery:</span><span>${deliveryCharges.toFixed(2)}</span></div>
              <div className="cart-grand-total"><span>Grand total:</span><span>${grandTotal.toFixed(2)}</span></div>
            </div>
            <motion.button 
              className="cart-checkout" 
              onClick={handleCheckout}
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              disabled={cart.length === 0 || !user}
            >
              {!user ? "Sign In to Checkout" : `PROCEED TO CHECKOUT — $${grandTotal.toFixed(2)}`}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showPayment && (
          <PaymentModal 
            isOpen={showPayment} 
            onClose={() => setShowPayment(false)}
            total={totalSubtotal}
            onPaymentComplete={() => {
              setIsOpen(false);
              setShowPayment(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// ORDERS PAGE
// ============================================================

function OrdersPage({ setCurrentTab }) {
  const { orders, user } = useApp();

  if (!user) {
    return (
      <motion.div className="orders-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
        <div className="orders-header"><h2>My Orders</h2></div>
        <div className="orders-empty">
          <Lock size={48} color="#B58D67" />
          <h3>Please Sign In</h3>
          <p>Sign in to view your order history.</p>
          <button className="btn-gold" onClick={() => setCurrentTab("home")}>Go to Home</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div className="orders-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="orders-header">
        <h2>My Orders</h2>
        <p>{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>
      </div>
      {orders.length === 0 ? (
        <div className="orders-empty">
          <Receipt size={48} color="#B58D67" />
          <h3>No Orders Yet</h3>
          <p>Start shopping to place your first order!</p>
          <button className="btn-gold" onClick={() => setCurrentTab("shop")}>Browse Collection</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, idx) => (
            <motion.div key={idx} className="order-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
              <div className="order-header">
                <div>
                  <span className="order-number">Order #{order.orderNumber}</span>
                  <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <span className="order-total">${order.total.toFixed(2)}</span>
              </div>
              <div className="order-customer">
                <span>📦 {order.customer.name}</span>
                <span>📍 {order.customer.address}, {order.customer.city}</span>
                <span>📞 {order.customer.phone}</span>
              </div>
              <div className="order-items">
                {order.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="order-item">
                    <span>{item.name}</span>
                    <span>Qty: {item.qty}</span>
                    <span>${item.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span className="order-payment">Payment: {order.paymentMethod}</span>
                <span className="order-status">✅ Delivered</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ============================================================
// PRODUCT CARD
// ============================================================

function ProductCard({ product, index, onProductClick }) {
  const { favorites, toggleFavorite, addToCart, user, triggerToast } = useApp();
  const isLiked = favorites.includes(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      triggerToast("Please sign in to add items to your cart.");
      return;
    }
    addToCart(product, product.colors[0].value);
  };

  return (
    <motion.div 
      className="product-card" 
      whileHover={{ y: -8, transition: { duration: 0.3 } }} 
      onClick={() => onProductClick && onProductClick(product)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <motion.button className="favorite-btn" onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
        <Heart size={16} fill={isLiked ? "#e74c3c" : "none"} color={isLiked ? "#e74c3c" : "rgba(26,26,26,0.4)"} />
      </motion.button>
      <div className="product-image">
        <motion.img src={product.image} alt={product.name} whileHover={{ scale: 1.1 }} transition={{ duration: 0.7 }} />
        <div className="product-badge">{product.type === "eyeglasses" ? "Prescription Framer" : "Polarized Sun"}</div>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span className="product-style">{product.style} Style</span>
          <div className="product-rating"><Star size={12} color="#f59e0b" fill="#f59e0b" /><span>{product.rating}</span></div>
        </div>
        <h4 className="product-name">{product.name}</h4>
        <p className="product-features">{product.features.join(" • ")}</p>
        <div className="product-price-row">
          <div><span className="original-price">${product.originalPrice.toFixed(2)}</span><span className="current-price">${product.price.toFixed(2)}</span></div>
          <motion.button className="add-to-cart-btn" onClick={handleAddToCart} whileHover={{ backgroundColor: "#1A1A1A", color: "white" }} whileTap={{ scale: 0.95 }}>
            <ShoppingBag size={14} /> Add Custom
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// HOME PAGE
// ============================================================

function HomePage({ setCurrentTab, setSelectedProduct }) {
  const { PRODUCTS, TESTIMONIALS } = useApp();
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <section className="hero">
        <div className="hero-bg-animation">
          <div className="floating-shapes">
            {[...Array(12)].map((_, i) => (
              <motion.div key={i} className="shape" initial={{ opacity: 0.1, scale: 0.5 }} animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.5, 1.2, 0.5], x: [0, (i % 3 - 1) * 100, 0], y: [0, (i % 2 === 0 ? 50 : -50), 0] }} transition={{ duration: 8 + i * 1.2, repeat: Infinity, delay: i * 0.5 }} style={{ width: 20 + i * 6, height: 20 + i * 6, background: `rgba(181, 141, 103, ${0.05 + i * 0.01})`, borderRadius: i % 2 === 0 ? '50%' : '4px', position: 'absolute', left: `${5 + i * 8}%`, top: `${10 + i * 7}%`, border: '1px solid rgba(181, 141, 103, 0.1)' }} />
            ))}
          </div>
        </div>
        <div className="hero-inner">
          <motion.div className="hero-content" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <motion.div className="hero-badge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
              <Sparkles size={14} /> KOREAN DESIGN LAB FOR ASIAN FEATURE BALANCING
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
              Perfect Frame Fit.<br /> No Slip. <span className="accent">No Slide.</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
              Designed carefully with customized higher nosebridges, adapted temple flares, and reduced face curvature specifically built to fit varied facial shapes flawlessly.
            </motion.p>
            <motion.div className="hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
              <button className="btn-primary" onClick={() => setCurrentTab("customizer")}>Instant Virtual Try-On</button>
              <button className="btn-secondary" onClick={() => setCurrentTab("shop")}>Browse Collection</button>
            </motion.div>
            <motion.div className="hero-stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}>
              <div><h4>K-Acetate</h4><p>Organic Fiber</p></div>
              <div><h4>Asian Fit</h4><p>Bridge Offset</p></div>
              <div><h4>$9.95 USD</h4><p>Clear Frame First</p></div>
            </motion.div>
          </motion.div>
          <motion.div className="hero-image" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}>
            <div className="hero-card">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" alt="Model" />
              <div className="hero-card-badge">Model Favorite</div>
              <div className="hero-card-footer">
                <div><h3>Xiao-Wei</h3><p>Diamond Shape Face Profile</p></div>
                <button className="icon-btn-small" onClick={() => setCurrentTab("customizer")}><Sliders size={16} /></button>
              </div>
            </div>
          </motion.div>
        </div>
        <ScrollIndicator />
      </section>

      <section className="steps-section">
        <div className="steps-grid">
          {[
            { num: "01", title: "Choose Face Geometry", desc: "Select from our 5 unique models configured with dynamic round, oval, square, or heart face offsets." },
            { num: "02", title: "Customize Material Hues", desc: "Interchange fine steel filaments, matte tortoiseshell acetates, or dynamic crystal-sage templates." },
            { num: "03", title: "Verify Face Match", desc: "Adjust tilt, rotation, and size overlays interactively with active blue light lens shading simulator." }
          ].map((step, i) => (
            <RevealOnScroll key={i} direction="up" delay={i * 0.15} className="step-item">
              <span className="step-number">{step.num}</span>
              <div><h4>{step.title}</h4><p>{step.desc}</p></div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="video-section">
        <div className="video-inner">
          <RevealOnScroll className="video-header">
            <span className="section-label">MODEL SHOWREEL VIDEO</span>
            <h3>The Modern Style in <span className="italic">Motion</span></h3>
          </RevealOnScroll>
          <RevealOnScroll direction="up" className="video-container">
            <div className="video-wrapper">
              <div style={{ 
                height: 0, 
                paddingBottom: 'calc(56.25%)', 
                position: 'relative', 
                width: '100%' 
              }}>
                <iframe 
                  allow="autoplay; gyroscope;" 
                  allowFullScreen 
                  height="100%" 
                  referrerPolicy="strict-origin" 
                  src="https://www.kapwing.com/e/6acff699d555c3e48678eed2" 
                  style={{
                    border: 0,
                    height: '100%',
                    left: 0,
                    overflow: 'hidden',
                    position: 'absolute',
                    top: 0,
                    width: '100%'
                  }} 
                  title="Embedded content made on Kapwing" 
                  width="100%"
                />
              </div>
              <p style={{ 
                fontSize: '12px', 
                textAlign: 'right',
                marginTop: '8px',
                color: 'rgba(255,255,255,0.3)'
              }}>
                Video edited on <a 
                  href="https://www.kapwing.com/video-editor" 
                  style={{ color: '#B58D67', textDecoration: 'none' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kapwing
                </a>
              </p>
            </div>
            <div className="video-footer">
              <div>
                <span className="video-tag">LIVE SHOWREEL</span>
                <p>Featuring active models across Seoul & Shanghai.</p>
              </div>
              <button className="btn-gold" onClick={() => setCurrentTab("shop")}>
                Shop Featured Looks
              </button>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-inner">
          <RevealOnScroll className="testimonials-header">
            <span className="section-label">CUSTOMER LOVE</span>
            <h3>What Our <span className="italic">Community</span> Says</h3>
          </RevealOnScroll>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((testimonial, idx) => (
              <RevealOnScroll key={idx} direction="up" delay={idx * 0.1} className="testimonial-card">
                <div className="testimonial-header"><img src={testimonial.image} alt={testimonial.name} /><div><h4>{testimonial.name}</h4><p>{testimonial.role}</p></div></div>
                <div className="testimonial-stars">{[...Array(5)].map((_, i) => <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />)}</div>
                <p className="testimonial-comment">"{testimonial.comment}"</p>
                <div className="testimonial-actions"><button><ThumbsUp size={14} /> Helpful ({(idx + 1) * 47})</button><button><MessageCircle size={14} /> Reply</button></div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-inner">
          <div className="featured-header">
            <RevealOnScroll direction="right">
              <span className="section-label">DISCOVER TRENDS</span>
              <h3>Curated Highlights</h3>
            </RevealOnScroll>
            <button className="view-all-btn" onClick={() => setCurrentTab("shop")}>View All →</button>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} onProductClick={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      <section className="fit-analysis">
        <div className="fit-analysis-inner">
          <RevealOnScroll direction="left" className="fit-content">
            <span className="fit-tag">FIT ANALYSIS PROTOCOL</span>
            <h3>How We Engineer for Different Jaws & <span className="italic">Cheekbones</span></h3>
            <p>Unlike Western frames built deep and curved, we design around the <strong>Asian Bone Profile</strong>. Standard frames slip because of the flat nasal bridge; we maximize the nosepad height by 14% and flair the temple angles outward by 12 degrees.</p>
            <div className="fit-features">
              {[
                { title: "Reduced Curvature", desc: "Slightly flatter front chassis avoids irritating cheek contact during smiling." },
                { title: "Higher Nose-pads", desc: "Dual-point silicone structures hold glasses neatly above the nostrils." }
              ].map((item, i) => (
                <motion.div key={i} className="fit-feature" whileHover={{ y: -5, transition: { duration: 0.2 } }}><h4>{item.title}</h4><p>{item.desc}</p></motion.div>
              ))}
            </div>
            <button className="btn-dark" onClick={() => setCurrentTab("faceguide")}><Info size={16} /> Read our Full Anatomy Guide</button>
          </RevealOnScroll>
          <RevealOnScroll direction="right" className="fit-matrix">
            <div className="matrix-card">
              <h4><Sparkles size={20} color="#B58D67" /> Face Silhouette Balance Matrix</h4>
              {[
                { face: "Round Face", rule: "Best matched with Sharp Angular Squares or Hexagonal styles", percent: "98% Symmetry" },
                { face: "Oval Face", rule: "All designs, especially premium Aviators and Classic Wireframes", percent: "99% Symmetry" },
                { face: "Square Face", rule: "Soften jaw prominence with Round Acetate frame loops", percent: "95% Symmetry" },
                { face: "Heart Face", rule: "Balance forehead width with modern Rimless or Cat-Eye lines", percent: "93% Symmetry" }
              ].map((item, idx) => (
                <motion.div key={idx} className="matrix-item" whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                  <div><span className="matrix-face">{item.face}</span><p>{item.rule}</p></div>
                  <span className="matrix-percent">{item.percent}</span>
                </motion.div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </motion.div>
  );
}

// ============================================================
// SHOP PAGE
// ============================================================

function ShopPage({ setCurrentTab, setSelectedProduct }) {
  const { PRODUCTS } = useApp();
  const [filterType, setFilterType] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [filterFaceShape, setFilterFaceShape] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter(p => {
    const typeOk = filterType === "all" || p.type === filterType;
    const genderOk = filterGender === "all" || p.gender === filterGender || p.gender === "Unisex";
    const shapeOk = filterFaceShape === "all" || p.bestFor.includes(filterFaceShape);
    const searchOk = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.style.toLowerCase().includes(searchQuery.toLowerCase());
    return typeOk && genderOk && shapeOk && searchOk;
  });

  return (
    <motion.div className="shop-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="shop-header">
        <div className="shop-header-inner">
          <div><span className="section-label">CATALOG MATRIX</span><h2>Our Styled Collection</h2></div>
          <div className="shop-search">
            <input type="text" placeholder="Format: wireframe, polarized..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            {searchQuery && <button onClick={() => setSearchQuery("")}><X size={16} /></button>}
          </div>
        </div>
      </div>
      <div className="shop-content">
        <div className="shop-filters">
          {[
            { title: "Select Style Core", options: [{ id: "all", label: "All Form Factors" }, { id: "eyeglasses", label: "Eyeglasses (Clear)" }, { id: "sunglasses", label: "Sunglasses (Tinted)" }], setter: setFilterType, current: filterType, color: '#1A1A1A' },
            { title: "Target Fit", options: [{ id: "all", label: "Men & Women" }, { id: "Men", label: "Men's Structured" }, { id: "Women", label: "Women's Exclusive" }], setter: setFilterGender, current: filterGender, color: '#1A1A1A' },
            { title: "Face Silhouette", options: [{ id: "all", label: "Show All Silhouettes" }, { id: "Oval", label: "Oval Face Matched" }, { id: "Round", label: "Round Face Matched" }, { id: "Square", label: "Square Face Matched" }, { id: "Heart", label: "Heart Face Matched" }, { id: "Diamond", label: "Diamond Face Matched" }], setter: setFilterFaceShape, current: filterFaceShape, color: '#B58D67' }
          ].map((group, gi) => (
            <div key={gi} className="filter-group">
              <h4>{group.title}</h4>
              {group.options.map((opt) => (
                <motion.button key={opt.id} onClick={() => group.setter(opt.id)} className={`filter-option ${group.current === opt.id ? 'active' : ''}`} style={{ backgroundColor: group.current === opt.id ? group.color : 'transparent', color: group.current === opt.id ? 'white' : 'rgba(26,26,26,0.6)' }} whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }}>
                  {opt.label}
                  {group.current === opt.id && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Check size={14} color="#B58D67" /></motion.div>}
                </motion.button>
              ))}
            </div>
          ))}
        </div>
        <div className="shop-products">
          {filteredProducts.length === 0 ? (
            <div className="no-products"><p>No spectacles match your active filters.</p><button onClick={() => { setFilterGender("all"); setFilterType("all"); setFilterFaceShape("all"); setSearchQuery(""); }}>Reset All Filters</button></div>
          ) : (
            <div className="products-grid">{filteredProducts.map((product, idx) => <ProductCard key={product.id} product={product} index={idx} onProductClick={setSelectedProduct} />)}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// FACE GUIDE PAGE
// ============================================================

function FaceGuidePage() {
  return (
    <motion.div className="faceguide-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="faceguide-header"><span className="section-label">PROFESSIONAL EYEWEAR ANATOMY METHODOLOGY</span><h2>Face Shape Advisor Matrix</h2></div>
      <div className="faceguide-content">
        {[
          { shape: "Oval Face Profile", desc: "Balanced dimensions across cheek and forehead width. Ideal canvas for almost all styles.", bestFrames: ["K-Style Round Classic", "Urban Maverick Aviator", "Sophia Bold Square"], tip: "With oval profiles, avoid oversized wireframes that conceal your elegant cheek lines. Go with natural bridges.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
          { shape: "Round Face Profile", desc: "Chubby cheeks or softer, curving jawlines requiring immediate definition structure.", bestFrames: ["Sophia Bold Square", "Lumina Edge Half-Frame"], tip: "Angular rectangles create vertical lines that slim and strengthen the lower face silhouette.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
          { shape: "Square Face Profile", desc: "Broad, impactful cheekbones with prominent mandibular jaw corners.", bestFrames: ["K-Style Round Classic", "Shanghai Hexa Geometric", "Seoul Stella Cat-Eye"], tip: "Choose round rimless glass structures to break structural rigidness and harmonize profile balance.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" }
        ].map((advisor, idx) => (
          <RevealOnScroll key={idx} direction="up" delay={idx * 0.1} className="faceguide-card">
            <div className="faceguide-card-image"><img src={advisor.image} alt={advisor.shape} /></div>
            <div className="faceguide-card-content">
              <h3>{advisor.shape}</h3>
              <p>{advisor.desc}</p>
              <div className="faceguide-matched"><span>Matched:</span>{advisor.bestFrames.map(frm => <span key={frm} className="matched-tag">{frm}</span>)}</div>
              <div className="faceguide-tip"><span>FITTER GUIDE TIP</span><p>{advisor.tip}</p></div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// FAVORITES PAGE
// ============================================================

function FavoritesPage({ setCurrentTab, setSelectedProduct }) {
  const { PRODUCTS, favorites } = useApp();
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <motion.div className="favorites-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="favorites-header"><h2>My Saved Frames</h2><p>Total curated: {favorites.length} pair{favorites.length !== 1 ? "s" : ""}</p></div>
      {favorites.length === 0 ? (
        <div className="favorites-empty"><Heart size={32} color="#B58D67" /><p>No frames saved yet.</p><button onClick={() => setCurrentTab("shop")}>Browse Spectacles</button></div>
      ) : (
        <div className="products-grid">{favProducts.map((product) => <ProductCard key={product.id} product={product} index={0} onProductClick={setSelectedProduct} />)}</div>
      )}
    </motion.div>
  );
}

// ============================================================
// BLOG PAGE
// ============================================================

function BlogPage({ setCurrentTab, setSelectedBlogPost }) {
  const { BLOG_POSTS } = useApp();
  const handlePostClick = (post) => { setSelectedBlogPost(post); setCurrentTab("blogpost"); };

  return (
    <motion.div className="blog-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="blog-header"><div className="blog-header-inner"><span className="section-label">OPTOCHIC BLOG</span><h1>Insights & <span className="italic">Inspiration</span></h1><p>Expert advice, style guides, and the latest trends in eyewear fashion.</p></div></div>
      <div className="blog-content">
        <div className="blog-grid">
          {BLOG_POSTS.map((post, idx) => (
            <RevealOnScroll key={post.slug} direction="up" delay={idx * 0.08}>
              <motion.article className="blog-card" whileHover={{ y: -8, transition: { duration: 0.3 } }} onClick={() => handlePostClick(post)}>
                <div className="blog-card-image"><img src={post.image} alt={post.title} /><span className="blog-category">{post.category}</span></div>
                <div className="blog-card-content">
                  <div className="blog-meta"><span><User size={14} /> {post.author}</span><span><Calendar size={14} /> {post.date}</span><span><Clock size={14} /> {post.readTime}</span></div>
                  <h3>{post.title}</h3><p>{post.excerpt}</p>
                  <div className="blog-tags">{post.tags.map(tag => <span key={tag} className="tag">#{tag}</span>)}</div>
                  <span className="read-more">Read More →</span>
                </div>
              </motion.article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// BLOG POST PAGE
// ============================================================

function BlogPostPage({ post, onBack }) {
  if (!post) return null;
  return (
    <motion.div className="blog-post-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="blog-post-header">
        <button className="back-btn" onClick={onBack}><ArrowLeft size={20} /> Back to Blog</button>
        <div className="blog-post-meta"><span><User size={16} /> {post.author}</span><span><Calendar size={16} /> {post.date}</span><span><Clock size={16} /> {post.readTime}</span></div>
        <h1>{post.title}</h1>
        <div className="blog-post-actions"><button><Share2 size={18} /> Share</button><button><Bookmark size={18} /> Save</button></div>
      </div>
      <div className="blog-post-image"><img src={post.image} alt={post.title} /></div>
      <div className="blog-post-content">
        <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="blog-post-sidebar">
          <div className="sidebar-card"><h4>About the Author</h4><div className="author-card"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" alt={post.author} /><div><h5>{post.author}</h5><p>Eyewear Expert & Optometrist</p></div></div><p className="author-bio">Dr. Sarah Kim has over 15 years of experience in optometry and is a leading expert in Asian-fit eyewear design.</p></div>
          <div className="sidebar-card"><h4>Related Posts</h4><div className="related-posts">{["face-shape-matching-guide", "sustainable-eyewear-materials", "virtual-try-on-technology"].map(related => (<button key={related} className="related-post" onClick={onBack}><span>→</span><span>{related.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</span></button>))}</div></div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================

function AboutPage() {
  const values = [
    { icon: Award, title: "Premium Quality", desc: "Every frame is crafted with precision and care using the finest materials." },
    { icon: Users, title: "Asian-Fit Focus", desc: "Designed specifically for Asian facial structures with expert engineering." },
    { icon: Globe, title: "Global Inspiration", desc: "Drawing from Korean, Chinese, and Japanese design aesthetics." },
    { icon: Shield, title: "Lifetime Warranty", desc: "We stand behind our products with comprehensive warranty coverage." }
  ];
  const team = [
    { name: "Min-ji Park", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1494790108375-be9c35b29330?auto=format&fit=crop&w=300&q=80" },
    { name: "Jae-hoon Kim", role: "Head of Design", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
    { name: "Sofia Chen", role: "Creative Director", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
    { name: "David Lee", role: "Master Optician", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" }
  ];

  return (
    <motion.div className="about-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="about-hero"><div className="about-hero-inner"><span className="section-label">ABOUT OPTOCHIC</span><h1>Redefining Eyewear for <span className="italic">Asian Faces</span></h1><p>We're on a mission to create eyewear that actually fits. No sliding, no pinching, just perfect comfort.</p></div></div>
      <div className="about-content">
        <section className="about-story">
          <div className="about-story-inner">
            <RevealOnScroll direction="left" className="about-story-text">
              <h2>Our Story</h2>
              <p>Founded in 2024, OptoChic was born from a simple frustration: finding glasses that actually fit. Our founder, Min-ji Park, spent years struggling with frames that slipped down her nose and pinched her temples. When she discovered that standard eyewear was designed for Western faces, she decided to create something better.</p>
              <p>Today, OptoChic is a leading brand in Asian-fit eyewear, combining traditional craftsmanship with modern technology. We work with master artisans in Seoul and Shanghai to create frames that are both beautiful and functional.</p>
            </RevealOnScroll>
            <RevealOnScroll direction="right" className="about-story-image">
              <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" alt="Workshop" />
            </RevealOnScroll>
          </div>
        </section>
        <section className="about-values"><h2>Our Values</h2>
          <div className="values-grid">{values.map((value, idx) => { const IconComponent = value.icon; return (<RevealOnScroll key={idx} direction="up" delay={idx * 0.1} className="value-card"><IconComponent size={32} color="#B58D67" /><h3>{value.title}</h3><p>{value.desc}</p></RevealOnScroll>); })}</div>
        </section>
        <section className="about-team"><h2>Meet the Team</h2>
          <div className="team-grid">{team.map((member, idx) => (<RevealOnScroll key={idx} direction="up" delay={idx * 0.1} className="team-card"><img src={member.image} alt={member.name} /><h3>{member.name}</h3><p>{member.role}</p></RevealOnScroll>))}</div>
        </section>
      </div>
    </motion.div>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================

function ContactPage() {
  const { triggerToast } = useApp();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleSubmit = (e) => { e.preventDefault(); triggerToast("Message sent successfully! We'll get back to you within 24 hours."); setFormData({ name: "", email: "", message: "" }); };

  return (
    <motion.div className="contact-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="contact-hero"><div className="contact-hero-inner"><span className="section-label">GET IN TOUCH</span><h1>Let's <span className="italic">Connect</span></h1><p>Have questions about our frames? Need help finding your perfect fit? We're here for you.</p></div></div>
      <div className="contact-content">
        <motion.div className="contact-form" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required placeholder="How can we help you?" rows="5" />
            </div>
            <button type="submit" className="submit-btn"><Send size={16} /> Send Message</button>
          </form>
        </motion.div>
        <motion.div className="contact-info" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h2>Contact Information</h2>
          <div className="contact-info-items">
            <div className="contact-info-item"><MapPin size={24} color="#B58D67" /><div><h4>Visit Us</h4><p>123 Gangnam District, Seoul, South Korea</p></div></div>
            <div className="contact-info-item"><Phone size={24} color="#B58D67" /><div><h4>Call Us</h4><p>+82 2-1234-5678</p></div></div>
            <div className="contact-info-item"><Mail size={24} color="#B58D67" /><div><h4>Email Us</h4><p>hello@optochic.com</p></div></div>
            <div className="contact-info-item"><Clock size={24} color="#B58D67" /><div><h4>Business Hours</h4><p>Mon-Fri: 9AM - 8PM KST</p></div></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================
// SIZE GUIDE PAGE
// ============================================================

function SizeGuidePage() {
  return (
    <motion.div className="sizeguide-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="sizeguide-header"><span className="section-label">FITTING GUIDE</span><h1>Find Your Perfect <span className="italic">Size</span></h1><p>Learn how to measure your face and choose the right frame size.</p></div>
      <div className="sizeguide-content">
        <div className="sizeguide-section"><h2>How to Measure Your Face</h2>
          <div className="sizeguide-steps">
            <RevealOnScroll direction="up" delay={0.1} className="sizeguide-step">
              <div className="step-number">1</div>
              <div><h3>Measure Your Temple Width</h3><p>Measure the distance between your temples (widest part of your face). This determines the frame width you need.</p></div>
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={0.2} className="sizeguide-step">
              <div className="step-number">2</div>
              <div><h3>Measure Your Bridge</h3><p>Measure the distance between your pupils and the bridge of your nose. This helps determine the right bridge size.</p></div>
            </RevealOnScroll>
            <RevealOnScroll direction="up" delay={0.3} className="sizeguide-step">
              <div className="step-number">3</div>
              <div><h3>Measure Your Lens Height</h3><p>Measure from the center of your pupil to the bottom of your eye. This determines the optimal lens height.</p></div>
            </RevealOnScroll>
          </div>
        </div>
        <RevealOnScroll direction="up" className="sizeguide-section"><h2>Frame Size Chart</h2>
          <div className="sizeguide-chart">
            <div className="chart-row header"><span>Face Size</span><span>Temple Width</span><span>Bridge Size</span><span>Lens Width</span></div>
            <div className="chart-row"><span>Small</span><span>120-130mm</span><span>14-16mm</span><span>47-50mm</span></div>
            <div className="chart-row"><span>Medium</span><span>130-140mm</span><span>16-18mm</span><span>50-53mm</span></div>
            <div className="chart-row"><span>Large</span><span>140-150mm</span><span>18-20mm</span><span>53-56mm</span></div>
            <div className="chart-row"><span>Extra Large</span><span>150-160mm</span><span>20-22mm</span><span>56-59mm</span></div>
          </div>
        </RevealOnScroll>
        <RevealOnScroll direction="up" className="sizeguide-tips"><h2>Pro Tips for the Perfect Fit</h2>
          <ul><li><strong>Check the nose pads:</strong> They should sit comfortably on your nose without pinching or slipping.</li><li><strong>Test the temples:</strong> The arms should rest gently behind your ears without pressure.</li><li><strong>Smile test:</strong> Your glasses shouldn't touch your cheeks when you smile.</li><li><strong>Look down:</strong> Your glasses should stay in place when you look down at the ground.</li></ul>
        </RevealOnScroll>
      </div>
    </motion.div>
  );
}

// ============================================================
// CUSTOMIZER PAGE
// ============================================================

function CustomizerPage() {
  const { PRODUCTS, FACE_MODELS, LENS_COLORS, addToCart, triggerToast, user } = useApp();
  const [customizerModel, setCustomizerModel] = useState(FACE_MODELS[0]);
  const [customizerProduct, setCustomizerProduct] = useState(PRODUCTS[0]);
  const [selectedFrameColor, setSelectedFrameColor] = useState(PRODUCTS[0].colors[0].value);
  const [selectedLens, setSelectedLens] = useState(LENS_COLORS[0]);
  const [selectedLensOpacity, setSelectedLensOpacity] = useState(0.6);
  const [engravingText, setEngravingText] = useState("");
  const [glassesScale, setGlassesScale] = useState(100);
  const [glassesYOffset, setGlassesYOffset] = useState(0);
  const [glassesRotation, setGlassesRotation] = useState(0);
  const [glassesRotationY, setGlassesRotationY] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [show3DBoxes, setShow3DBoxes] = useState(true);
  const [leftEyePower, setLeftEyePower] = useState("0.00");
  const [rightEyePower, setRightEyePower] = useState("0.00");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [glassesPosition, setGlassesPosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef(null);
  const glassesRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => { 
        if (typeof reader.result === "string") { 
          setUploadedImage(reader.result); 
          triggerToast("Custom photo uploaded successfully!"); 
        } 
      };
      reader.readAsDataURL(file);
    }
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    triggerToast("Uploaded image cleared.");
  };

  const handleAddToCart = () => {
    if (!user) {
      triggerToast("Please sign in to add items to your cart.");
      return;
    }
    addToCart(customizerProduct, selectedFrameColor);
    triggerToast(`${selectedLens.name} lens added to your bag!`);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setGlassesPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  },);

  const eyePowerOptions = ["-6.00", "-5.50", "-5.00", "-4.50", "-4.00", "-3.50", "-3.00", "-2.50", "-2.00", "-1.75", "-1.50", "-1.25", "-1.00", "-0.75", "-0.50", "-0.25", "0.00", "+0.25", "+0.50", "+0.75", "+1.00", "+1.25", "+1.50", "+1.75", "+2.00", "+2.50", "+3.00", "+3.50", "+4.00"];

  return (
    <motion.div className="customizer-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="customizer-header">
        <span className="section-label">3D SPECIFICATION DESIGNER & VIRTUAL MIRROR</span>
        <h2>Interactive Customizer Studio</h2>
        <p>Select your lens, adjust the fit, and see how you'd look with different tints and styles.</p>
        {!user && (
          <div className="customizer-login-warning">
            <Lock size={16} color="#B58D67" />
            <span>Please <strong>Sign In</strong> to add items to your cart.</span>
          </div>
        )}
      </div>

      <div className="customizer-grid">
        <div className="customizer-viewer">
          <div className="viewer-header">
            <div className="viewer-status">
              <motion.span className="status-dot" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              <span>LIVE PREVIEW: {selectedLens.name}</span>
            </div>
            <div className="viewer-actions">
              <motion.button onClick={() => fileInputRef.current?.click()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Upload size={14} /> Upload Photo
              </motion.button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />
              {uploadedImage && (
                <motion.button onClick={clearUploadedImage} whileHover={{ scale: 1.1 }} style={{ color: '#ef4444' }}>
                  Clear
                </motion.button>
              )}
            </div>
          </div>

          <div className="viewer-canvas">
            <div className="viewer-frame">
              <div className="viewer-model-container">
                <img src={uploadedImage || customizerModel.image} alt="Model" className="viewer-model-image" />
                <div className="viewer-model-overlay">
                  <span className="model-shape-tag">{customizerModel.shape}</span>
                </div>
              </div>
              <motion.div 
                ref={glassesRef}
                className="glasses-overlay" 
                animate={{ 
                  scale: glassesScale / 100, 
                  rotate: glassesRotation,
                  skewX: glassesRotationY,
                }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }} 
                style={{ 
                  position: 'absolute',
                  left: `calc(50% + ${glassesPosition.x}px)`,
                  top: `calc(50% + ${glassesPosition.y + glassesYOffset}px)`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'auto',
                  zIndex: 5,
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
                onMouseDown={handleMouseDown}
              >
                <svg viewBox="0 0 120 45" style={{ width: '240px', height: '90px' }}>
                  <defs>
                    <filter id="lensReflection">
                      <feGaussianBlur stdDeviation="1" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="lensShine" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                      <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                  <path
                    d={customizerProduct.svgPath}
                    fill="none"
                    stroke={selectedFrameColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d={customizerProduct.svgPath}
                    fill={selectedLens.value}
                    fillOpacity={selectedLensOpacity}
                    filter="url(#lensReflection)"
                  />
                  <path
                    d={customizerProduct.svgPath}
                    fill="url(#lensShine)"
                    fillOpacity={0.3}
                  />
                  <path
                    d="M 18 18 q 8 -4 10 -2 M 74 18 q 8 -4 10 -2"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <ellipse cx="38" cy="20" rx="10" ry="5" fill="rgba(255,255,255,0.15)" stroke="none" />
                  <ellipse cx="78" cy="20" rx="10" ry="5" fill="rgba(255,255,255,0.15)" stroke="none" />
                </svg>
                <div className="drag-handle">
                  <Move size={12} />
                  <span>Drag to position</span>
                </div>
              </motion.div>
              <div className="viewer-label">{customizerModel.shape} Silhouette • {selectedLens.name}</div>
            </div>
          </div>

          <div className="viewer-controls">
            {[
              { label: "Scale", value: `${glassesScale}%`, dec: () => setGlassesScale(s => Math.max(70, s - 5)), inc: () => setGlassesScale(s => Math.min(130, s + 5)) },
              { label: "Vertical", value: `${glassesYOffset}px`, dec: () => setGlassesYOffset(s => Math.max(-30, s - 2)), inc: () => setGlassesYOffset(s => Math.min(30, s + 2)) },
              { label: "Tilt", value: `${glassesRotation}°`, dec: () => setGlassesRotation(s => s - 2), inc: () => setGlassesRotation(s => s + 2) },
              { label: "3D Slant", value: `${glassesRotationY}°`, dec: () => setGlassesRotationY(s => Math.max(-25, s - 5)), inc: () => setGlassesRotationY(s => Math.min(25, s + 5)) }
            ].map((ctrl, i) => (
              <div key={i} className="control-group">
                <label>{ctrl.label}</label>
                <div className="control-buttons">
                  <motion.button onClick={ctrl.dec} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><Minus size={14} /></motion.button>
                  <span>{ctrl.value}</span>
                  <motion.button onClick={ctrl.inc} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><Plus size={14} /></motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="customizer-panel">
          <div>
            <h4><User size={16} color="#B58D67" /> Model Presets</h4>
            <div className="model-grid">
              {FACE_MODELS.map((model) => (
                <motion.button 
                  key={model.id} 
                  onClick={() => { setCustomizerModel(model); setGlassesPosition({ x: 0, y: 0 }); }} 
                  className={`model-btn ${customizerModel.id === model.id ? 'active' : ''}`} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={model.image} alt={model.name} />
                </motion.button>
              ))}
            </div>
            <p className="model-info">Currently: <strong>{customizerModel.shape} face shape</strong></p>
          </div>

          <div>
            <h4><Sparkles size={16} color="#B58D67" /> Frame Style</h4>
            <div className="style-grid">
              {PRODUCTS.map((prod) => (
                <motion.button 
                  key={prod.id} 
                  onClick={() => { setCustomizerProduct(prod); setSelectedFrameColor(prod.colors[0].value); }} 
                  className={`style-btn ${customizerProduct.id === prod.id ? 'active' : ''}`} 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  {prod.name}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h4><Eye size={16} color="#B58D67" /> Lens Tint Selection</h4>
            <div className="lens-selection-grid">
              {LENS_COLORS.map((lens, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedLens(lens)}
                  className={`lens-selection-btn ${selectedLens.name === lens.name ? 'active' : ''}`}
                  style={{
                    background: lens.value,
                    border: selectedLens.name === lens.name ? '2px solid #B58D67' : '1px solid rgba(0,0,0,0.1)'
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={lens.name}
                >
                  {lens.image && (
                    <img 
                      src={lens.image} 
                      alt={lens.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.5,
                        borderRadius: '50%'
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
            <div className="lens-opacity-control">
              <label>Lens Darkness: {Math.round(selectedLensOpacity * 100)}%</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={selectedLensOpacity}
                onChange={(e) => setSelectedLensOpacity(parseFloat(e.target.value))}
                className="opacity-slider"
              />
            </div>
          </div>

          <div>
            <h4>Frame Color</h4>
            <div className="color-grid">
              {customizerProduct.colors.map(col => (
                <motion.button 
                  key={col.name} 
                  onClick={() => setSelectedFrameColor(col.value)} 
                  className={`color-btn ${selectedFrameColor === col.value ? 'active' : ''}`} 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="color-swatch" style={{ background: col.value }} />
                  {col.name}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="eye-prescription-section">
            <h4><Eye size={16} color="#B58D67" /> Prescription</h4>
            <div className="prescription-grid">
              <div className="prescription-item">
                <label>Left Eye (SPH)</label>
                <select value={leftEyePower} onChange={(e) => setLeftEyePower(e.target.value)}>
                  {eyePowerOptions.map(p => <option key={`left-${p}`} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="prescription-item">
                <label>Right Eye (SPH)</label>
                <select value={rightEyePower} onChange={(e) => setRightEyePower(e.target.value)}>
                  {eyePowerOptions.map(p => <option key={`right-${p}`} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h4><Sliders size={16} color="#B58D67" /> Engraving</h4>
            <input 
              type="text" 
              placeholder="e.g. YOUR NAME (Max 12 chars)" 
              maxLength={12} 
              value={engravingText} 
              onChange={e => setEngravingText(e.target.value)} 
              className="engraving-input" 
            />
          </div>

          <div className="customizer-footer">
            <div>
              <span className="calc-label">LENS: {selectedLens.name}</span>
              <span className="calc-price">${customizerProduct.price.toFixed(2)}</span>
            </div>
            <motion.button 
              onClick={handleAddToCart}
              className="add-to-bag-btn" 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag size={16} /> {user ? `ADD TO BAG ($${customizerProduct.price.toFixed(2)})` : "SIGN IN TO ADD"}
            </motion.button>
          </div>
        </div>
      </div>

      <section className="three-d-section">
        <div className="three-d-header">
          <span className="section-label">3D LENS GALLERY</span>
          <div className="three-d-header-content">
            <h3>Real Lens <span className="italic">Collection</span></h3>
            <motion.button 
              className="toggle-3d-btn" 
              onClick={() => setShow3DBoxes(!show3DBoxes)} 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              {show3DBoxes ? 'Hide 3D View' : 'Show 3D View'}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {show3DBoxes && (
            <motion.div 
              className="three-d-container" 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <div className="three-d-box-grid">
                {LENS_COLORS.map((lens, idx) => (
                  <ThreeDLensBox 
                    key={idx} 
                    lens={lens} 
                    onClick={(selectedLens) => setSelectedLens(selectedLens)}
                    isSelected={selectedLens.name === lens.name}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}

// ============================================================
// PRODUCT MODAL
// ============================================================

function ProductModal({ product, onClose }) {
  const { addToCart, LENS_COLORS, user, triggerToast } = useApp();
  const [selectedLens, setSelectedLens] = useState(null);
  const [selectedLensColor, setSelectedLensColor] = useState(LENS_COLORS[0]);
  
  if (!product) return null;

  const handleAddToCart = () => {
    if (!user) {
      triggerToast("Please sign in to add items to your cart.");
      return;
    }
    addToCart(product, product.colors[0].value);
    onClose();
  };

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-content" onClick={e => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25 }}>
        <motion.button onClick={onClose} className="modal-close" whileHover={{ scale: 1.1, rotate: 90 }}><X size={16} /></motion.button>
        <div className="modal-grid">
          <div className="modal-image">
            <img src={product.image} alt={product.name} />
            {product.modelRecommendation && <div className="modal-model-tag"><img src={product.modelRecommendation.image} alt="model" /><span>Recommended for {product.modelRecommendation.name}</span></div>}
          </div>
          <div className="modal-details">
            <span className="modal-style">{product.style} Form Factor</span>
            <h3>{product.name}</h3>
            <div className="modal-rating"><Star size={16} color="#f59e0b" fill="#f59e0b" /><span>{product.rating} / 5.0</span><span>({product.reviews.toLocaleString()} reviews)</span></div>
            <p className="modal-description">{product.description}</p>
            {product.lensOptions && (
              <div className="modal-lens-section"><span className="modal-section-title">Lens Options</span>
                <div className="modal-lens-grid">{product.lensOptions.map((lens, idx) => { const IconComponent = lens.icon; return (<motion.div key={idx} className={`modal-lens-card ${selectedLens === idx ? 'active' : ''}`} onClick={() => setSelectedLens(selectedLens === idx ? null : idx)} whileHover={{ scale: 1.02 }}><IconComponent size={18} color="#B58D67" /><div><strong>{lens.name}</strong><p>{lens.desc}</p></div><span className="lens-price">+${lens.price.toFixed(2)}</span></motion.div>); })}</div>
              </div>
            )}
            <div className="modal-lens-section"><span className="modal-section-title">Lens Tint Palette</span>
              <div className="modal-lens-color-grid">{LENS_COLORS.map((lens, idx) => (<motion.button key={idx} className={`lens-color-btn ${selectedLensColor.value === lens.value ? 'active' : ''}`} onClick={() => setSelectedLensColor(lens)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title={`${lens.name} (${lens.gender})`}><span className="lens-color-swatch" style={{ background: lens.value, border: '1px solid rgba(0,0,0,0.1)' }} /></motion.button>))}</div>
              <p className="lens-color-label">{selectedLensColor.name} · {selectedLensColor.gender}</p>
            </div>
            <div className="modal-features"><span>Features Included:</span>{product.features.map(feat => (<div key={feat}><Check size={14} color="#059669" /><span>{feat}</span></div>))}</div>
            <div className="modal-reviews"><span>Customer Reviews:</span>{product.reviews_list.map((review, idx) => (<motion.div key={idx} className="modal-review" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}><div className="modal-review-header"><div>{review.avatar && <img src={review.avatar} alt={review.user} className="review-avatar" />}<span>{review.user}</span></div><div>{[...Array(5)].map((_, i) => <Star key={i} size={10} color="#f59e0b" fill={i < Math.floor(review.rating) ? "#f59e0b" : "none"} />)}</div></div><p>"{review.comment}"</p></motion.div>))}</div>
            <div className="modal-footer">
              <div>
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="current-price">${product.price.toFixed(2)}</span>
                {selectedLens !== null && product.lensOptions && <span className="lens-total">+ ${product.lensOptions[selectedLens].price.toFixed(2)}</span>}
              </div>
              <motion.button 
                onClick={handleAddToCart} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="modal-add-btn"
              >
                {user ? "Instant Buy Spec Pair" : "Sign In to Buy"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// FOOTER
// ============================================================

function Footer({ setCurrentTab }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand"><h4 className="footer-logo">OptoChic</h4><p className="footer-text">Premium handcrafted opticals and custom prescription sunframes. Calibrated around Asian anthropometrical landmarks.</p><div className="footer-badges"><span className="footer-badge">SEOUL DESIGN DISTRICT</span><span className="footer-badge">SHANGHAI HUB</span></div></div>
        <div className="footer-column"><h5>Digital Studio</h5><button className="footer-link" onClick={() => setCurrentTab("customizer")}>Virtual try-on</button><button className="footer-link" onClick={() => setCurrentTab("faceguide")}>Find model shape</button><button className="footer-link" onClick={() => setCurrentTab("shop")}>Clear Eyeglasses</button><button className="footer-link" onClick={() => setCurrentTab("shop")}>Polarized sunglasses</button></div>
        <div className="footer-column"><h5>Client Care</h5><span className="footer-link">Glaze prescriptions</span><span className="footer-link">Global deliveries</span><span className="footer-link">Return policy</span><span className="footer-link">Warranty support</span></div>
        <div className="footer-column"><h5>Brand Hub</h5><button className="footer-link" onClick={() => setCurrentTab("about")}>Anatomical engineering</button><button className="footer-link" onClick={() => setCurrentTab("blog")}>Cellulose materials</button><button className="footer-link" onClick={() => setCurrentTab("blog")}>Boutique reviews</button><button className="footer-link" onClick={() => setCurrentTab("contact")}>Affiliates group</button></div>
      </div>
      <div className="footer-bottom"><p>© {currentYear} OptoChic. All Rights Reserved.</p><div className="footer-bottom-links"><span>Privacy strategy</span><span>Terms of access</span></div></div>
    </footer>
  );
}

// ============================================================
// TOAST
// ============================================================

function Toast() {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;
  return (
    <motion.div className="toast" initial={{ opacity: 0, y: 50, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: 50, x: 20 }} transition={{ type: "spring" }}>
      <Check size={16} color="#059669" /><span>{toastMessage}</span>
    </motion.div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  const renderPage = () => {
    if (currentTab === "blogpost" && selectedBlogPost) {
      return <BlogPostPage post={selectedBlogPost} onBack={() => { setCurrentTab("blog"); setSelectedBlogPost(null); }} />;
    }
    if (currentTab === "orders") {
      return <OrdersPage setCurrentTab={setCurrentTab} />;
    }
    if (currentTab === "tracking") {
      return <OrderTrackingPage setCurrentTab={setCurrentTab} />;
    }
    switch (currentTab) {
      case "home": return <HomePage setCurrentTab={setCurrentTab} setSelectedProduct={setSelectedProduct} />;
      case "shop": return <ShopPage setCurrentTab={setCurrentTab} setSelectedProduct={setSelectedProduct} />;
      case "customizer": return <CustomizerPage />;
      case "faceguide": return <FaceGuidePage />;
      case "favorites": return <FavoritesPage setCurrentTab={setCurrentTab} setSelectedProduct={setSelectedProduct} />;
      case "blog": return <BlogPage setCurrentTab={setCurrentTab} setSelectedBlogPost={setSelectedBlogPost} />;
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "size-guide": return <SizeGuidePage />;
      default: return <HomePage setCurrentTab={setCurrentTab} setSelectedProduct={setSelectedProduct} />;
    }
  };

  return (
    <AppProvider>
      <div className="app">
        <Header setCurrentTab={setCurrentTab} setIsCartOpen={setIsCartOpen} currentTab={currentTab} />
        <main className="main-content"><AnimatePresence mode="wait">{renderPage()}</AnimatePresence></main>
        <Footer setCurrentTab={setCurrentTab} />
        <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
        <AnimatePresence>{selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}</AnimatePresence>
        <Toast />
      </div>
    </AppProvider>
  );
}