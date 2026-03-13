import { useState, useEffect } from "react";
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
      <section className="shop-category">
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
    </>
  );
}

export default Home;