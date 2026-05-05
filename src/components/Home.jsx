import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

// Asset Imports
import logoBlack from "../assets/logo_black.svg";
import searchIcon from "../assets/search_icon.svg";
import mapPinIcon from "../assets/map_pin_icon.svg";
import wishlistIcon from "../assets/wishlist_icon.svg";
import bellIcon from "../assets/bell_icon.svg";
import cartIcon from "../assets/cart_icon.svg";
import userIcon from "../assets/user_icon.svg";
import menuIcon from "../assets/menu_icon.svg";
import categoriesIcon from "../assets/Categories_icon.svg";
import newArrivalsIcon from "../assets/New_arrivals_icon.svg";
import trendingIcon from "../assets/Trending_collections_icon.svg";
import featuredIcon from "../assets/Featured_collections_icon.svg";
import bestSellersIcon from "../assets/Best_Sellers_icon.svg";
import contactUsIcon from "../assets/contact_us_icon.svg";
import settingsIcon from "../assets/settings_icon.svg";
import locationIcon from "../assets/location_icon.svg";
import heroImg1 from "../assets/hero_img_1.png";
import heroImg2 from "../assets/hero_img_2.avif";
import heroImg3 from "../assets/hero_img_3.jpg";
import shippingIcon from "../assets/shipping_icon.svg";
import qualityIcon from "../assets/quality_icon.svg";
import returnIcon from "../assets/return_icon.svg";
import ratingStarIcon from "../assets/ratingstar_icon.svg";
import menImg from "../assets/men.jpg";
import womenImg from "../assets/women.jpg";
import kidsImg from "../assets/kids.jpg";
import oversizedImg from "../assets/oversized.webp";
import minimalImg from "../assets/minimal.jpg";
import printedImg from "../assets/printed.jpg";
import productImg1 from "../assets/product-img-1.jpg";
import productImg2 from "../assets/product-img-2.jpg";
import productImg3 from "../assets/product-img-3.jpg";
import productImg4 from "../assets/product-img-4.jpg";
import starIcon from "../assets/star_icon.svg";
import wishlistIconFilled from "../assets/wishlist_icon_filled.svg";
import trendingImg1 from "../assets/trending_img_1.jpg";
import trendingImg2 from "../assets/trending_img_2.jpg";
import trendingImg3 from "../assets/trending_img_3.jpg";
import trendingImg4 from "../assets/trending_img_4.png";
import dropsIcon from "../assets/drops_icon.svg";
import fcImg1 from "../assets/fc-img-1.png";
import fcImg2 from "../assets/fc-img-2.png";
import fcImg3 from "../assets/fc-img-3.png";
import flashSaleIcon from "../assets/Flash_Sale_icon.svg";

function Home() {
  // --- STATE FOR HERO SLIDER ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideImages = [heroImg1, heroImg2, heroImg3];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [slideImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);

  // --- STATE FOR SIDE MENU ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- STATE FOR ADDRESS MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Inputs in the modal
  const [userAddressInput, setUserAddressInput] = useState("");
  const [deliveryAddressInput, setDeliveryAddressInput] = useState("");

  // Initialize state directly from localStorage
  const [headerAddress, setHeaderAddress] = useState(() => {
    return localStorage.getItem("userAddress") || "No: 101, Main Road, Chennai";
  });

  const [headerDelivery, setHeaderDelivery] = useState(() => {
    return localStorage.getItem("deliveryAddress") || ">>> Add delivery location";
  });

  // --- NEW ARRIVALS STATE & LOGIC ---
  const navigate = useNavigate();

  // Load wishlist and cart from local storage
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // For mobile "tap to view quick view"
  const [activeQuickView, setActiveQuickView] = useState(null);

  // Automatically save to local storage when state changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Click Handlers
  const toggleWishlist = (e, product) => {
    e.stopPropagation(); // Stop click from opening the product page
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id); // Remove
      return [...prev, product]; // Add
    });
  };

  const toggleCart = (e, product) => {
    e.stopPropagation(); // Stop click from opening the product page
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id); // Remove
      return [...prev, { ...product, quantity: 1 }]; // Add
    });
  };

  const openProduct = (productId) => {
    localStorage.setItem("selectedProduct", productId);
    navigate("/product"); // Ensure you have a route set up for "/product"
  };

  // --- SCROLL TO CATEGORY FUNCTION ---
  const scrollToCategory = () => {
    const section = document.getElementById("categorySection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
 
  // New Arrivals Product Data Array
  const newArrivals = [
    { 
      id: "p1", name: "Forest Green Minimal", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "120", image: productImg1, category: "Women",
      badgeText: "NEW", discount: "14%" 
    },
    { 
      id: "p2", name: "Purple Classic", price: "589.0", oldPrice: "650", rating: "4.6", reviews: "117", image: productImg2, category: "Men",
      badgeText: "HOT", discount: "20%" 
    },
    { 
      id: "p3", name: "White Graphic", price: "589.0", oldPrice: "650", rating: "4.4", reviews: "107", image: productImg3, category: "Women",
      badgeText: "NEW", discount: "15%" 
    },
    { 
      id: "p4", name: "White Hotel", price: "589.0", oldPrice: "650", rating: "4.5", reviews: "115", image: productImg4, category: "Men",
      badgeText: "NEW", discount: "12%" 
    }
  ];

  // Trending Now Product Data Array
  const trendingProducts = [
    { 
      id: "t1", name: "Black Classic Wear", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "117", image: trendingImg1, category: "Women",
      badgeText: "TRENDING" // Custom badge text
    },
    { 
      id: "t2", name: "White Oversized", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "117", image: trendingImg2, category: "Men",
      badgeText: "TRENDING" 
    },
    { 
      id: "t3", name: "Black Printed", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "117", image: trendingImg3, category: "Men",
      badgeText: "TRENDING" 
    },
    { 
      id: "t4", name: "White Minimal", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "117", image: trendingImg4, category: "Women",
      badgeText: "TRENDING" 
    }
  ];

  // Best Sellers Product Data Array
  const bestSellers = [
    { 
      id: "b1", name: "Forest Green Minimal", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "117", image: productImg1, category: "Men",
      badgeText: "BESTSELLER" // Custom badge text
    },
    { 
      id: "b2", name: "White Hotel", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "117", image: productImg4, category: "Men",
      badgeText: "BESTSELLER" 
    },
    { 
      id: "b3", name: "Grey Essential", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "117", image: trendingImg2, category: "Men",
      badgeText: "BESTSELLER" 
    },
    { 
      id: "b4", name: "Stay Wild Graphic", price: "589.0", oldPrice: "650", rating: "4.7", reviews: "117", image: trendingImg3, category: "Men",
      badgeText: "BESTSELLER" 
    }
  ];

  const handleSaveAddress = () => {
    if (userAddressInput.trim() === "") {
      alert("Please enter your address");
      return;
    }

    // Save to localStorage
    localStorage.setItem("userAddress", userAddressInput);
    localStorage.setItem("deliveryAddress", deliveryAddressInput);

    // Update Header Text
    setHeaderAddress(userAddressInput);
    if (deliveryAddressInput.trim() !== "") {
      setHeaderDelivery(deliveryAddressInput);
    }

    // Close Modal
    setIsModalOpen(false);
  };

  // --- FLASH SALE TIMER STATE & LOGIC ---
  const [timeLeft, setTimeLeft] = useState({ days: "02", hours: "14", minutes: "32", seconds: "00" });

  useEffect(() => {
    // Set target time (2 days, 14 hours, 32 mins from load)
    const flashSaleEnd = new Date();
    flashSaleEnd.setDate(flashSaleEnd.getDate() + 2);
    flashSaleEnd.setHours(flashSaleEnd.getHours() + 14);
    flashSaleEnd.setMinutes(flashSaleEnd.getMinutes() + 32);
    const targetTime = flashSaleEnd.getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      // If the sale is over, clear the timer
      if (distance < 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(interval);
        return;
      }

      // Calculate time left
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      // Format with leading zeros
      const formatTime = (time) => (time < 10 ? `0${time}` : time.toString());

      setTimeLeft({
        days: formatTime(d),
        hours: formatTime(h),
        minutes: formatTime(m),
        seconds: formatTime(s)
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // --- TESTIMONIALS STATE & LOGIC ---
  const carouselRef = useRef(null);

  // 1. Initial Hardcoded Reviews
  const [reviews, setReviews] = useState([
    { id: 1, name: "Priya M", location: "Bangalore", rating: 5, text: "Absolutely love the quality! Best T-Shirt I have ever purchased. The fabric feels premium and the fit is perfect. Will definitely order more.", image: productImg1, initial: "P" },
    { id: 2, name: "Rahul R", location: "Chennai", rating: 5, text: "The minimalist design is exactly what I was looking for. Highly recommend!", image: null, initial: "R" },
    { id: 3, name: "Sneha V", location: "Mumbai", rating: 4, text: "Great packaging and fast delivery. The oversized fit is super comfortable.", image: null, initial: "S" }
  ]);

  // 2. Math for Overall Rating
  const [stats, setStats] = useState({ count: 26, sum: 117 }); // 112 reviews * 4.5 avg = 504
  const averageRating = (stats.sum / stats.count).toFixed(1);
  const starPercentage = (averageRating / 5) * 100;

  // 3. Modals & Form State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, src: "" });
  const [newReview, setNewReview] = useState({ name: "", location: "", text: "", rating: 0, image: null, imageName: "Click here to upload photos" });
  const [hoverRating, setHoverRating] = useState(0); // For the interactive stars

  // Carousel Scrolling
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewReview({ ...newReview, image: URL.createObjectURL(file), imageName: file.name });
    }
  };

  // Submit New Review
  const submitReview = () => {
    if (!newReview.name || !newReview.location || !newReview.text || newReview.rating === 0) {
      alert("Please provide a name, location, rating, and review text.");
      return;
    }

    const newReviewObj = {
      id: Date.now(),
      name: newReview.name,
      location: newReview.location,
      rating: newReview.rating,
      text: newReview.text,
      image: newReview.image,
      initial: newReview.name.charAt(0).toUpperCase()
    };

    // Update Arrays & Math
    setReviews([newReviewObj, ...reviews]);
    setStats({ count: stats.count + 1, sum: stats.sum + newReview.rating });

    // Reset and Close
    setIsReviewModalOpen(false);
    setNewReview({ name: "", location: "", text: "", rating: 0, image: null, imageName: "Click here to upload photos" });
    setHoverRating(0);

    // --- THE FIX ---
    // Wait a tiny fraction of a second for React to render the new card, THEN scroll!
    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 100); 
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="header-logo">
          <img src={logoBlack} alt="ORIGIN" />
        </div>

        <div className="search-desktop">
          <img src={searchIcon} className="search-icon" alt="search" />
          <input type="text" placeholder="Search your perfect drop..." />
        </div>

        {/* CLICKABLE LOCATION */}
        <div className="location-desktop" onClick={() => setIsModalOpen(true)}>
          <img src={mapPinIcon} alt="pin" />
          <span>{headerAddress}</span>
        </div>

        <div className="icons">
          <Link to="#" style={{ position: "relative" }}>
            <img src={wishlistIcon} alt="Wishlist" />
            <span className={`nav-badge ${wishlist.length > 0 ? "show" : ""}`}>
              {wishlist.length}
            </span>
          </Link>
          
          <Link to="#"><img src={bellIcon} alt="Notifications" /></Link>

          <Link to="#" style={{ position: "relative" }}>
            <img src={cartIcon} alt="Cart" />
            <span className={`nav-badge ${cart.length > 0 ? "show" : ""}`}>
              {cart.length}
            </span>
          </Link>
          
          <Link to="#"><img src={userIcon} alt="User" /></Link>
          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
            <img src={menuIcon} alt="Menu" />
          </button>
        </div>
      </header>

      {/* ================= SIDE MENU ================= */}
      <div 
        className={`menu-overlay ${isMenuOpen ? "active" : ""}`} 
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div className={`side-menu ${isMenuOpen ? "active" : ""}`}>
        <div className="menu-header">
          <img src={logoBlack} className="menu-logo" alt="ORIGIN" />
          <button className="close-menu" onClick={() => setIsMenuOpen(false)}>&times;</button>
        </div>

        <ul className="menu-list">
          <li>
            <img src={categoriesIcon} alt="Categories" />
            <Link to="#" onClick={() => setIsMenuOpen(false)}>Categories</Link>
          </li>
          <li>
            <img src={newArrivalsIcon} alt="New Arrivals" />
            <Link to="#" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
          </li>
          <li>
            <img src={trendingIcon} alt="Trending" />
            <Link to="#" onClick={() => setIsMenuOpen(false)}>Trending Collections</Link>
          </li>
          <li>
            <img src={featuredIcon} alt="Featured" />
            <Link to="#" onClick={() => setIsMenuOpen(false)}>Featured Collections</Link>
          </li>
          <li>
            <img src={bestSellersIcon} alt="Best Sellers" />
            <Link to="#" onClick={() => setIsMenuOpen(false)}>Best Sellers</Link>
          </li>
          <hr />
          <li>
            <img src={userIcon} alt="Profile" />
            <Link to="#" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
          </li>
          <li>
            <img src={contactUsIcon} alt="Contact" />
            <Link to="#" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
          </li>
          <hr />
          <li>
            <img src={settingsIcon} alt="Settings" />
            <Link to="#" onClick={() => setIsMenuOpen(false)}>Settings</Link>
          </li>
        </ul>
      </div>

      {/* ================= MOBILE SEARCH + LOCATION ================= */}
      <div className="mobile-top">
        <div className="search-mobile">
          <img src={searchIcon} className="search-icon" alt="search" />
          <input type="text" placeholder="Search your perfect drop..." />
        </div>

        <div className="location-mobile-row">
          <div className="location-left" onClick={() => setIsModalOpen(true)}>
            <img src={mapPinIcon} alt="pin" />
            <span>{headerAddress}</span>
          </div>

          <div className="location-right" onClick={() => setIsModalOpen(true)}>
            {headerDelivery}
          </div>
        </div>
      </div>

      {/* ================= LOCATION POP-UP ================= */}
      {isModalOpen && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="address-modal">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2 className="address-title">Add Your Address</h2>

            <div className="address-form">
              <label>Enter Your Address</label>
              <div className="input-box">
                <img src={locationIcon} alt="location" />
                <input 
                  type="text" 
                  placeholder="Enter your location"
                  value={userAddressInput}
                  onChange={(e) => setUserAddressInput(e.target.value)}
                />
              </div>

              <label>Enter Delivery Address</label>
              <div className="input-box">
                <img src={locationIcon} alt="location" />
                <input 
                  type="text" 
                  placeholder="Enter delivery location"
                  value={deliveryAddressInput}
                  onChange={(e) => setDeliveryAddressInput(e.target.value)}
                />
              </div>

              <button className="save-address-btn" onClick={handleSaveAddress}>
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="slider">
          <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slideImages.map((imgSrc, index) => (
              <div className="slide" key={index}>
                <img src={imgSrc} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="overlay"></div>

          <div className="hero-content">
            <h1 className="gloock">Limited Edition</h1>
            <p>ORIGIN – Crafted with precision, designed for excellence.</p>
            <div className="buttons">
              <button className="shop">Shop Now →</button>
              <button className="view">View Collections</button>
            </div>
          </div>

          <button className="prev" onClick={prevSlide}>&#10094;</button>
          <button className="next" onClick={nextSlide}>&#10095;</button>

          <div className="dots">
            {slideImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <div className="feature-box">
          <div className="icon-box"><img src={shippingIcon} alt="Shipping" /></div>
          <div>
            <h4>Free Shipping</h4>
            <p>On orders above $999</p>
          </div>
        </div>
        <div className="feature-box">
          <div className="icon-box"><img src={qualityIcon} alt="Quality" /></div>
          <div>
            <h4>Premium Quality</h4>
            <p>100% organic fabric</p>
          </div>
        </div>
        <div className="feature-box">
          <div className="icon-box"><img src={returnIcon} alt="Returns" /></div>
          <div>
            <h4>Easy Returns</h4>
            <p>7 days return policy</p>
          </div>
        </div>
        <div className="feature-box">
          <div className="icon-box"><img src={ratingStarIcon} alt="Rating" /></div>
          <div>
            <h4>Top Rated</h4>
            <p>4.3/5 customer rating</p>
          </div>
        </div>
      </section>
      
      {/* ================= SHOP BY CATEGORY ================= */}
      <section className="shop-category" id="categorySection">
        <div className="container">
          <h2>Shop by Category</h2>
          <p className="subtitle">Find your perfect style</p>

          <div className="category-grid">
            {/* Card 1 */}
            <Link to="#" className="category-card">
              <img src={menImg} alt="Men" />
              <div className="category-overlay">
                <h3>Men</h3>
                <span>Shop Now</span>
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="#" className="category-card">
              <img src={womenImg} alt="Women" />
              <div className="category-overlay">
                <h3>Women</h3>
                <span>Shop Now</span>
              </div>
            </Link>

            {/* Card 3 */}
            <Link to="#" className="category-card">
              <img src={kidsImg} alt="Kids" />
              <div className="category-overlay">
                <h3>Kids</h3>
                <span>Shop Now</span>
              </div>
            </Link>

            {/* Card 4 */}
            <Link to="#" className="category-card">
              <img src={oversizedImg} alt="Oversized" />
              <div className="category-overlay">
                <h3>Oversized</h3>
                <span>Shop Now</span>
              </div>
            </Link>

            {/* Card 5 */}
            <Link to="#" className="category-card">
              <img src={minimalImg} alt="Minimal" />
              <div className="category-overlay">
                <h3>Minimal</h3>
                <span>Shop Now</span>
              </div>
            </Link>

            {/* Card 6 */}
            <Link to="#" className="category-card">
              <img src={printedImg} alt="Printed" />
              <div className="category-overlay">
                <h3>Printed</h3>
                <span>Shop Now</span>
              </div>
            </Link>
          </div>
        </div>
        </section>

      {/* ================= NEW ARRIVALS ================= */}
      <section className="product-section">
        <div className="section-header">
          <div>
            <h2>New Arrivals</h2>
            <span className="sub">JUST DROPPED</span>
          </div>
          <Link to="#" className="view-all">View All →</Link>
        </div>

        <div className="products-grid">
          {newArrivals.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            const isCarted = cart.some((item) => item.id === product.id);

            return (
              <div 
                key={product.id} 
                className={`product-card ${activeQuickView === product.id ? "show-quick" : ""}`}
                onClick={(e) => {
                  // Mobile tap logic to show quick view first
                  if (window.matchMedia("(hover: none)").matches) {
                    if (activeQuickView !== product.id) {
                      e.preventDefault();
                      setActiveQuickView(product.id);
                      return;
                    }
                  }
                  openProduct(product.id);
                }}
              >
                <div className="product-image">
                  {/* Dynamically render the "NEW" / "HOT" badge ONLY if it exists */}
          {product.badgeText && (
            <span className="badge new">{product.badgeText}</span>
          )}

          {/* Dynamically render the discount badge ONLY if it exists */}
          {product.discount && (
            <span className="badge discount">{product.discount}</span>
          )}

                  {/* Wishlist */}
                  <div 
                    className={`icon-wrapper wishlist-icon-filled ${isWishlisted ? "active" : ""}`}
                    onClick={(e) => toggleWishlist(e, product)}
                  >
                    <img src={wishlistIconFilled} alt="Wishlist" />
                  </div>

                  {/* Cart */}
                  <div 
                    className={`icon-wrapper cart-icon ${isCarted ? "added" : ""}`}
                    onClick={(e) => toggleCart(e, product)}
                  >
                    <img src={cartIcon} alt="Cart" />
                  </div>

                  <img src={product.image} className="product-img" alt={product.name} />
                  <button className="quick-view">Quick View</button>
                </div>

                <div className="product-info">
                  <div className="price-row">
                    <div className="price-group">
                      <span className="price">₹{product.price}</span>
                      <span className="old-price">₹{product.oldPrice}</span>
                    </div>
                    <div className="rating">
                      <img src={starIcon} className="star-icon" alt="Star" />
                      <span className="rating-value">{product.rating} </span>
                      <span className="rating-count">({product.reviews})</span>
                    </div>
                  </div>
                  <h4>{product.name}</h4>
                  <p className="category">{product.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* ================= TRENDING NOW ================= */}
      <section className="product-section">
        <div className="section-header">
          <div>
            <h2>Trending Now</h2>
            <span className="sub">WHAT EVERYONE'S WEARING</span>
          </div>
          <Link to="#" className="view-all">View All →</Link>
        </div>

        <div className="products-grid">
          {trendingProducts.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            const isCarted = cart.some((item) => item.id === product.id);

            return (
              <div 
                key={product.id} 
                className={`product-card ${activeQuickView === product.id ? "show-quick" : ""}`}
                onClick={(e) => {
                  if (window.matchMedia("(hover: none)").matches) {
                    if (activeQuickView !== product.id) {
                      e.preventDefault();
                      setActiveQuickView(product.id);
                      return;
                    }
                  }
                  openProduct(product.id);
                }}
              >
                <div className="product-image">
                  
                  {/* Trending Badge */}
                  {product.badgeText && (
                    <span className="badge trending">{product.badgeText}</span>
                  )}

                  {/* Wishlist */}
                  <div 
                    className={`icon-wrapper wishlist-icon-filled ${isWishlisted ? "active" : ""}`}
                    onClick={(e) => toggleWishlist(e, product)}
                  >
                    <img src={wishlistIconFilled} alt="Wishlist" />
                  </div>

                  {/* Cart */}
                  <div 
                    className={`icon-wrapper cart-icon ${isCarted ? "added" : ""}`}
                    onClick={(e) => toggleCart(e, product)}
                  >
                    <img src={cartIcon} alt="Cart" />
                  </div>

                  <img src={product.image} className="product-img" alt={product.name} />
                  <button className="quick-view">Quick View</button>
                </div>

                <div className="product-info">
                  <div className="price-row">
                    <div className="price-group">
                      <span className="price">₹{product.price}</span>
                      <span className="old-price">₹{product.oldPrice}</span>
                    </div>
                    <div className="rating">
                      <img src={starIcon} className="star-icon" alt="Star" />
                      <span className="rating-value">{product.rating} </span>
                      <span className="rating-count">({product.reviews})</span>
                    </div>
                  </div>
                  <h4>{product.name}</h4>
                  <p className="category">{product.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= EXCLUSIVE LIMITED EDITIONS ================= */}
      <section className="exclusive-section" id="exclusive">
        <div className="overlay"></div>

        <div className="exclusive-content">
          {/* Top Label */}
          <div className="label">
            <img src={dropsIcon} alt="icon" />
            <span>ORIGIN DROPS</span>
          </div>

          {/* Main Heading */}
          <h2>Exclusive Limited Editions</h2>

          {/* Sub Text */}
          <p>
            Be the first to get our exclusive drops. Limited quantities, unlimited style.
          </p>

          {/* CTA Button */}
          <button className="shop-btn" onClick={scrollToCategory}>
            Shop the Drop →
          </button>
        </div>
      </section>

      {/* ================= FEATURED COLLECTIONS ================= */}
      <section className="featured-collections">
        <div className="container">
          
          {/* Header */}
          <div className="section-header fc-header">
            <div>
              <h2>Featured Collections</h2>
              <span className="sub">COLLECTIONS</span>
            </div>
          </div>

          <div className="fc-grid">
            
            {/* LEFT BIG CARD */}
            <div className="fc-left-card">
              <img src={fcImg1} alt="Limited Edition" />

              <div className="fc-overlay">
                <span className="fc-badge">NEW COLLECTIONS</span>
                <h3>Limited Edition</h3>
                <p>Exclusive pieces, limited quantities</p>

                {/* ONLY THIS IS CLICKABLE */}
                <Link to="#" className="fc-link">Shop Now →</Link>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="fc-right">
              
              {/* CARD 1 */}
              <div className="fc-small-card">
                <img src={fcImg2} alt="Minimal Wear" />

                <div className="fc-content">
                  <h4>Minimal Wear</h4>
                  <p>Less is more</p>

                  {/* ONLY CLICKABLE */}
                  <Link to="#">Explore →</Link>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="fc-small-card">
                <img src={fcImg3} alt="Classic Originals" />

                <div className="fc-content">
                  <h4>Classic Originals</h4>
                  <p>Timeless essentials</p>

                  {/* ONLY CLICKABLE */}
                  <Link to="#">Explore →</Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="product-section">
        <div className="section-header">
          <div>
            <h2>Best Sellers</h2>
            <span className="sub">MOST LOVED BY OUR CUSTOMERS</span>
          </div>
          <Link to="#" className="view-all">View All →</Link>
        </div>

        <div className="products-grid">
          {bestSellers.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            const isCarted = cart.some((item) => item.id === product.id);

            return (
              <div 
                key={product.id} 
                className={`product-card ${activeQuickView === product.id ? "show-quick" : ""}`}
                onClick={(e) => {
                  if (window.matchMedia("(hover: none)").matches) {
                    if (activeQuickView !== product.id) {
                      e.preventDefault();
                      setActiveQuickView(product.id);
                      return;
                    }
                  }
                  openProduct(product.id);
                }}
              >
                <div className="product-image">
                  
                  {/* Bestseller Badge */}
                  {product.badgeText && (
                    <span className="badge bestseller">{product.badgeText}</span>
                  )}

                  {/* Wishlist */}
                  <div 
                    className={`icon-wrapper wishlist-icon-filled ${isWishlisted ? "active" : ""}`}
                    onClick={(e) => toggleWishlist(e, product)}
                  >
                    <img src={wishlistIconFilled} alt="Wishlist" />
                  </div>

                  {/* Cart */}
                  <div 
                    className={`icon-wrapper cart-icon ${isCarted ? "added" : ""}`}
                    onClick={(e) => toggleCart(e, product)}
                  >
                    <img src={cartIcon} alt="Cart" />
                  </div>

                  <img src={product.image} className="product-img" alt={product.name} />
                  <button className="quick-view">Quick View</button>
                </div>

                <div className="product-info">
                  <div className="price-row">
                    <div className="price-group">
                      <span className="price">₹{product.price}</span>
                      <span className="old-price">₹{product.oldPrice}</span>
                    </div>
                    <div className="rating">
                      <img src={starIcon} className="star-icon" alt="Star" />
                      <span className="rating-value">{product.rating} </span>
                      <span className="rating-count">({product.reviews})</span>
                    </div>
                  </div>
                  <h4>{product.name}</h4>
                  <p className="category">{product.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FLASH SALE BANNER ================= */}
      <section className="flash-sale-banner">
        <div className="flash-left">
          <div className="flash-icon-box">
            <img src={flashSaleIcon} alt="Flash Sale Icon" />
          </div>
          <div className="flash-text">
            <h3>Flash Sale Live!</h3>
            <p>Up to 40% off on selected styles</p>
          </div>
        </div>

        <div className="flash-timer">
          <div className="time-box-wrapper">
            <div className="time-box">{timeLeft.days}</div>
            <span className="time-label">Days</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box-wrapper">
            <div className="time-box">{timeLeft.hours}</div>
            <span className="time-label">Hours</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box-wrapper">
            <div className="time-box">{timeLeft.minutes}</div>
            <span className="time-label">Mins</span>
          </div>
          <span className="colon">:</span>
          <div className="time-box-wrapper">
            <div className="time-box">{timeLeft.seconds}</div>
            <span className="time-label">Secs</span>
          </div>
        </div>

        <div className="flash-right">
          <button className="flash-shop-btn" onClick={() => navigate("/shop")}>
            Shop the Drop &rarr;
          </button>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonials-section">
        <div className="testi-header">
          <h2 className="testi-title">What Our Customers Say</h2>
          
          <div className="testi-info-row">
            <div className="testi-left-info">
              <p className="testi-subtitle">Real reviews from real people</p>
              <div className="overall-rating">
                <span className="rating-number">{averageRating}</span>
                <div className="smooth-stars-outer">
                  <div className="smooth-stars-inner" style={{ width: `${starPercentage}%` }}></div>
                </div>
                <span className="total-reviews">Over {stats.count} Reviews</span>
              </div>
            </div>

            <button className="write-review-btn" onClick={() => setIsReviewModalOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              Write a Review
            </button>
          </div>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-btn left-btn" onClick={() => scrollCarousel("left")}>&#10094;</button>
          
          <div className="carousel-track" ref={carouselRef}>
            {reviews.map((rev) => (
              <div className="review-card" key={rev.id}>
                <div className="reviewer-info">
                  <div className="avatar">{rev.initial}</div>
                  <div>
                    <h4>{rev.name}</h4>
                    <span className="location">{rev.location}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {/* Generate stars based on rating */}
                  {"★".repeat(rev.rating).padEnd(5, "☆")}
                </div>
                <p className="review-text">{rev.text}</p>
                {rev.image && (
                  <img 
                    src={rev.image} 
                    className="review-image-thumb" 
                    onClick={() => setLightbox({ isOpen: true, src: rev.image })} 
                    alt="Customer Review" 
                  />
                )}
              </div>
            ))}
          </div>
          
          <button className="carousel-btn right-btn" onClick={() => scrollCarousel("right")}>&#10095;</button>
        </div>
      </section>

      {/* ================= WRITE A REVIEW MODAL ================= */}
      {isReviewModalOpen && (
        <div className="modal" style={{ display: "flex" }} onClick={(e) => e.target.className === "modal" && setIsReviewModalOpen(false)}>
          <div className="review-modal-content">
            <span className="close" onClick={() => setIsReviewModalOpen(false)}>&times;</span>
            <h2 className="review-title">Write a Review</h2>
            <p className="modal-sub">We value your feedback</p>

            {/* Interactive Stars */}
            <div className="interactive-stars" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg 
                  key={star}
                  viewBox="0 0 24 24" 
                  className={(hoverRating || newReview.rating) >= star ? "active" : ""}
                  onMouseEnter={() => setHoverRating(star)}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>

            {/* Form Details */}
            <input type="text" placeholder="Your Name" className="review-input" value={newReview.name} onChange={(e) => setNewReview({ ...newReview, name: e.target.value })} />
            <input type="text" placeholder="Your Location (e.g., Chennai)" className="review-input" value={newReview.location} onChange={(e) => setNewReview({ ...newReview, location: e.target.value })} />
            <textarea placeholder="Please share your experience with us..." className="review-textarea" value={newReview.text} onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}></textarea>

            {/* Custom Image Upload */}
            <div className="upload-wrapper">
              <input type="file" id="reviewImageUpload" accept="image/*" hidden onChange={handleImageUpload} />
              <label htmlFor="reviewImageUpload" className="upload-label">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <span>{newReview.imageName}</span>
              </label>
            </div>

            <button className="submit-review-btn" onClick={submitReview}>Submit your Review</button>
          </div>
        </div>
      )}

      {/* ================= IMAGE LIGHTBOX MODAL ================= */}
      {lightbox.isOpen && (
        <div className="modal" style={{ display: "flex" }} onClick={(e) => e.target.className === "modal" && setLightbox({ isOpen: false, src: "" })}>
          <span className="close lightbox-close" onClick={() => setLightbox({ isOpen: false, src: "" })}>&times;</span>
          <img src={lightbox.src} className="lightbox-content" alt="Enlarged Review" />
        </div>
      )}


    </>
  );
  

}

export default Home;