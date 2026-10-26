import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Search,
  ShoppingBag,
  Home,
  Bell,
  User,
  Plus,
  Minus,
  MapPin,
  Star,
  Coffee,
  CheckCircle,
} from "lucide-react";
import "./App.css";

const coffees = [
  {
    id: 1,
    name: "Caffe Mocha",
    subtitle: "Deep Foam",
    price: 4.53,
    rating: 4.8,
    category: "Cappuccino",
    image:
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    name: "Flat White",
    subtitle: "Rich Espresso",
    price: 3.53,
    rating: 4.8,
    category: "Latte",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    name: "Cappuccino",
    subtitle: "With steamed milk",
    price: 4.2,
    rating: 4.7,
    category: "Cappuccino",
    image:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 4,
    name: "Americano",
    subtitle: "Rich and smooth",
    price: 3,
    rating: 4.6,
    category: "Americano",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 5,
    name: "Caramel Latte",
    subtitle: "Smooth and creamy",
    price: 3.8,
    rating: 4.9,
    category: "Latte",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 6,
    name: "Caramel Macchiato",
    subtitle: "Sweet caramel",
    price: 4.8,
    rating: 4.9,
    category: "Macchiato",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=85",
  },
];

const categories = [
  "All Coffee",
  "Cappuccino",
  "Macchiato",
  "Latte",
  "Americano",
];

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [selectedCoffee, setSelectedCoffee] = useState(coffees[0]);
  const [activeCategory, setActiveCategory] = useState("All Coffee");
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("Delivery");
  const [deliveryAddress, setDeliveryAddress] = useState(
    "123 Coffee Street, Chennai",
  );
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const filteredCoffees = coffees.filter((coffee) => {
    const matchesCategory =
      activeCategory === "All Coffee" || coffee.category === activeCategory;

    const matchesSearch = (coffee.name + " " + coffee.subtitle)
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const openDetails = (coffee) => {
    setSelectedCoffee(coffee);
    setSelectedSize("M");
    setQuantity(1);
    setScreen("details");
  };

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const addToCart = () => {
    setCart((current) => [
      ...current,
      {
        ...selectedCoffee,
        size: selectedSize,
        quantity,
        cartId: Date.now(),
      },
    ]);
    setScreen("cart");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const displayedCoffees =
    screen === "wishlist"
      ? coffees.filter((coffee) => wishlist.includes(coffee.id))
      : screen === "home"
        ? filteredCoffees
        : [];

  const pageTitle = {
    wishlist: "My Wishlist",
    cart: "My Cart",
  };

  return (
    <main className="phone">
      {screen === "welcome" && (
        <section className="welcome">
          <div className="welcome-image">
            <span className="welcome-logo">
              <Coffee size={30} />
              <span className="logo-text">
                COFFEE with <b>LOVE</b>
              </span>
            </span>
          </div>

          <div className="welcome-content">
            <span className="eyebrow">YOUR DAILY COFFEE RITUAL</span>
            <h1>Fall in Love with Coffee in Blissful Delight!</h1>
            <p>
              Discover your favourite coffee, freshly prepared and delivered
              with love.
            </p>
            <button onClick={() => setScreen("home")}>
              Get Started <ArrowLeft className="button-arrow" size={20} />
            </button>
          </div>
        </section>
      )}

      {(screen === "home" || screen === "wishlist") && (
        <section className="home-screen">
          <header className="home-header">
            <div>
              <p className="location">Delivering to</p>
              <h3>
                <MapPin size={16} /> Saidapet, Chennai
              </h3>
            </div>
            <button
              className="profile-button"
              onClick={() => setScreen("profile")}
              aria-label="Profile"
            >
              <User size={21} />
            </button>
          </header>

          {screen === "home" && (
            <>
              <label className="search-box">
                <Search size={20} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search your coffee"
                />
                <button
                  className="search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  {search ? "×" : ""}
                </button>
              </label>

              <div className="promo">
                <span className="promo-label">SPECIAL OFFER</span>
                <h2>Buy one get one FREE</h2>
                <p>Enjoy your favourite coffee with a friend.</p>
                <div className="promo-decoration">☕</div>
              </div>

              <div className="section-heading">
                <h2>Choose your coffee</h2>
                <button onClick={() => setActiveCategory("All Coffee")}>
                  See all
                </button>
              </div>

              <div className="category-tabs">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={
                      activeCategory === category ? "active-category" : ""
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </>
          )}

          {screen === "wishlist" && (
            <div className="section-heading page-section-heading">
              <h2>{pageTitle.wishlist}</h2>
            </div>
          )}

          <div className="coffee-grid">
            {displayedCoffees.map((coffee) => (
              <article
                className="coffee-card"
                key={coffee.id}
                onClick={() => {
                  setSelectedCoffee(coffee);
                  setScreen("details");
                }}
              >
                <div className="product-image-wrap">
                  <button
                    className="favorite-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(coffee.id);
                    }}
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      size={18}
                      fill={wishlist.includes(coffee.id) ? "#c67c4e" : "none"}
                      color={wishlist.includes(coffee.id) ? "#c67c4e" : "#777"}
                    />
                  </button>
                  <button
                    className="product-image-button"
                    onClick={() => openDetails(coffee)}
                    aria-label={`View ${coffee.name}`}
                  >
                    <img
                      className="coffee-product-image"
                      src={coffee.image}
                      alt={coffee.name}
                    />
                  </button>
                  <span className="coffee-rating">
                    <Star size={12} fill="currentColor" />
                    {coffee.rating}
                  </span>
                </div>

                <button
                  className="product-title-button"
                  onClick={() => openDetails(coffee)}
                >
                  <h3>{coffee.name}</h3>
                </button>
                <p>{coffee.subtitle}</p>

                <div className="coffee-price-row">
                  <b>${coffee.price.toFixed(2)}</b>
                  <button
                    onClick={() => openDetails(coffee)}
                    aria-label={`Add ${coffee.name}`}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {displayedCoffees.length === 0 && (
            <div className="empty-state">
              <Coffee size={38} />
              <h3>
                {screen === "wishlist"
                  ? "Your wishlist is empty"
                  : "No coffee found"}
              </h3>
              <p>
                {screen === "wishlist"
                  ? "Tap the heart on a coffee to save it here."
                  : "Try another search or category."}
              </p>
              <button onClick={() => setScreen("home")}>Explore Coffee</button>
            </div>
          )}

          <nav className="bottom-nav">
            <button
              className={screen === "home" ? "nav-active" : ""}
              onClick={() => setScreen("home")}
              aria-label="Home"
            >
              <Home size={22} />
              <span>Home</span>
            </button>
            <button
              className={screen === "wishlist" ? "nav-active" : ""}
              onClick={() => setScreen("wishlist")}
              aria-label="Wishlist"
            >
              <Heart size={22} />
              <span>Favorite</span>
            </button>
            <button
              className={screen === "cart" ? "nav-active" : ""}
              onClick={() => setScreen("cart")}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={22} />
              <span>Cart ({cart.length})</span>
            </button>
            <button onClick={() => setScreen("tracking")} aria-label="Orders">
              <Bell size={22} />
              <span>Orders</span>
            </button>
            <button
              className={screen === "profile" ? "nav-active" : ""}
              onClick={() => setScreen("profile")}
              aria-label="Profile"
            >
              <User size={22} />
              <span>Profile</span>
            </button>
          </nav>
        </section>
      )}

      {screen === "details" && (
        <section className="details-overlay">
          <div className="details-topbar">
            <button onClick={() => setScreen("home")}>
              <ArrowLeft size={20} />
            </button>
            <h3>Product Details</h3>
            <button onClick={() => toggleWishlist(selectedCoffee.id)}>
              <Heart
                size={20}
                fill={wishlist.includes(selectedCoffee.id) ? "#c67c4e" : "none"}
                color="#c67c4e"
              />
            </button>
          </div>

          <img
            className="details-coffee-image"
            src={selectedCoffee.image}
            alt={selectedCoffee.name}
          />

          <div className="details-title-row">
            <div>
              <h2>{selectedCoffee.name}</h2>
              <p>{selectedCoffee.subtitle}</p>
            </div>
            <span className="details-rating">
              <Star size={15} fill="currentColor" /> {selectedCoffee.rating}
            </span>
          </div>

          <p className="details-description">
            A freshly prepared coffee made with carefully selected beans, rich
            aroma and a smooth finish. Perfect for your everyday coffee moment.
          </p>

          <div className="details-divider" />

          <h3>Choose Size</h3>
          <div className="size-options">
            {["S", "M", "L"].map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "selected-size" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="details-purchase-row">
            <div>
              <span>Price</span>
              <h2>${(selectedCoffee.price * quantity).toFixed(2)}</h2>
            </div>
            <div className="quantity-row">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button className="primary-action" onClick={addToCart}>
            <ShoppingBag size={19} /> Add to Cart
          </button>
          <button
            className="secondary-action"
            onClick={() => setScreen("order")}
          >
            Buy Now
          </button>
        </section>
      )}

      {screen === "cart" && (
        <section className="details-overlay">
          <div className="details-topbar">
            <button onClick={() => setScreen("home")}>
              <ArrowLeft size={20} />
            </button>
            <h3>My Cart</h3>
            <span>{cart.length} items</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag size={42} />
              <h2>Your cart is empty</h2>
              <p>Choose a coffee to get started.</p>
              <button onClick={() => setScreen("home")}>Explore Coffee</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <article className="cart-item" key={item.cartId}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>
                        Size {item.size} · Qty {item.quantity}
                      </p>
                      <b>${(item.price * item.quantity).toFixed(2)}</b>
                    </div>
                    <button
                      className="remove-cart-item"
                      onClick={() =>
                        setCart((current) =>
                          current.filter(
                            (entry) => entry.cartId !== item.cartId,
                          ),
                        )
                      }
                    >
                      ×
                    </button>
                  </article>
                ))}
              </div>
              <div className="cart-total">
                <p>
                  Subtotal <b>${total.toFixed(2)}</b>
                </p>
                <p>
                  Delivery fee <b>$1.00</b>
                </p>
                <h3>
                  Total <b>${(total + 1).toFixed(2)}</b>
                </h3>
              </div>
              <button
                className="primary-action"
                onClick={() => setScreen("order")}
              >
                Continue to Checkout
              </button>
            </>
          )}
        </section>
      )}

      {screen === "order" && (
        <section className="checkout-screen">
          <header className="checkout-header">
            <button onClick={() => setScreen("details")}>
              <ArrowLeft size={22} />
            </button>
            <h2>Order Summary</h2>
          </header>

          <div className="checkout-card">
            <h3>Order Type</h3>

            <div className="order-type-options">
              {["Delivery", "Pickup"].map((type) => (
                <button
                  key={type}
                  className={
                    orderType === type
                      ? "order-option selected"
                      : "order-option"
                  }
                  onClick={() => setOrderType(type)}
                >
                  {type === "Delivery" ? "🛵" : "☕"}
                  <span>{type}</span>
                  <small>
                    {type === "Delivery" ? "To your door" : "Collect at cafe"}
                  </small>
                </button>
              ))}
            </div>
          </div>

          {orderType === "Delivery" && (
            <div className="checkout-card">
              <h3>Delivery Address</h3>
              <p className="checkout-muted">
                Where should we deliver your coffee?
              </p>

              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your delivery address"
                rows={3}
              />
            </div>
          )}

          <div className="checkout-card">
            <h3>Payment Method</h3>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "Cash"}
                onChange={() => setPaymentMethod("Cash")}
              />
              <span>💵</span>
              <span>
                Cash on {orderType === "Delivery" ? "Delivery" : "Pickup"}
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "Wallet"}
                onChange={() => setPaymentMethod("Wallet")}
              />
              <span>👛</span>
              <span>Wallet</span>
            </label>
          </div>

          <div className="checkout-card price-summary">
            <h3>Price Summary</h3>

            <div>
              <span>
                {selectedCoffee.name} × {quantity}
              </span>
              <span>
                $
                {(
                  Number(String(selectedCoffee.price).replace("$", "")) *
                  quantity
                ).toFixed(2)}
              </span>
            </div>

            <div>
              <span>Delivery Fee</span>
              <span>{orderType === "Delivery" ? "$1.00" : "Free"}</span>
            </div>

            <div className="checkout-total">
              <strong>Total</strong>
              <strong>
                $
                {(
                  Number(String(selectedCoffee.price).replace("$", "")) *
                    quantity +
                  (orderType === "Delivery" ? 1 : 0)
                ).toFixed(2)}
              </strong>
            </div>
          </div>

          <button
            className="checkout-place-order"
            disabled={orderType === "Delivery" && !deliveryAddress.trim()}
            onClick={() => setScreen("tracking")}
          >
            Place Order · $
            {(
              Number(String(selectedCoffee.price).replace("$", "")) * quantity +
              (orderType === "Delivery" ? 1 : 0)
            ).toFixed(2)}
          </button>
        </section>
      )}

      {screen === "tracking" && (
        <section className="tracking-screen">
          <div className="tracking-header">
            <h2>Track Your Order</h2>
            <p>Your coffee is on its way! ☕</p>
          </div>

          <div className="delivery-map">
            <iframe
              title="Delivery Location Map"
              src="https://maps.google.com/maps?q=coffee%20shop%20Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>

          <div className="delivery-status-card">
            <div className="delivery-icon">🛵</div>
            <div>
              <h3>Your coffee is on the way</h3>
              <p>Our delivery partner is bringing your order.</p>
              <span className="delivery-status">Order confirmed</span>
            </div>
          </div>

          <div className="tracking-steps">
            <div className="tracking-step completed">
              <span>✓</span>
              <div>
                <strong>Order placed</strong>
                <p>Your order has been received.</p>
              </div>
            </div>

            <div className="tracking-step completed">
              <span>✓</span>
              <div>
                <strong>Preparing your coffee</strong>
                <p>Your coffee is being prepared.</p>
              </div>
            </div>

            <div className="tracking-step active">
              <span>🛵</span>
              <div>
                <strong>Out for delivery</strong>
                <p>Your order is on its way.</p>
              </div>
            </div>
          </div>

          <button className="primary-action" onClick={() => setScreen("home")}>
            Back to Home
          </button>
        </section>
      )}

      {screen === "profile" && (
        <section className="details-overlay">
          <div className="details-topbar">
            <button onClick={() => setScreen("home")}>
              <ArrowLeft size={20} />
            </button>
            <h3>My Profile</h3>
            <span />
          </div>
          <div className="profile-card">
            <div className="profile-avatar">
              <User size={34} />
            </div>
            <h2>Coffee Lover</h2>
            <p>Welcome to your coffee corner.</p>
          </div>
          <button
            className="primary-action"
            onClick={() => setScreen("wishlist")}
          >
            <Heart size={18} /> My Wishlist ({wishlist.length})
          </button>
          <button
            className="secondary-action"
            onClick={() => setScreen("cart")}
          >
            <ShoppingBag size={18} /> My Cart ({cart.length})
          </button>
          <button
            className="secondary-action"
            onClick={() => setScreen("tracking")}
          >
            <Bell size={18} /> My Orders
          </button>
        </section>
      )}
    </main>
  );
}
