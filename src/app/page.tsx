"use client";

import Link from 'next/link';

export default function Home() {
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const message = `*New Wedding Album Order*%0A%0A` +
      `*Couple Names:* ${formData.get('groomName')} & ${formData.get('brideName')}%0A` +
      `*Wedding Date:* ${formData.get('weddingDate')}%0A` +
      `*Plan:* ${formData.get('plan')}%0A` +
      `*Events:* ${formData.get('events')}%0A` +
      `*Venue:* ${formData.get('venue')}%0A` +
      `*Phone:* ${formData.get('phone')}`;

    window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Immerse Your <span>Love Story</span>
          </h1>
          <p>
            Experience your wedding memories like never before. Stunning 3D interactive
            albums that bring your special moments to life.
          </p>
          <div className="hero-buttons">
            <Link href="#order" className="btn btn-primary">
              Order Now
            </Link>
            <Link href="/album" className="btn btn-secondary">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-title">
          <h2>Why Choose Us?</h2>
          <p>
            We create immersive 3D experiences that transform your wedding photos
            into interactive memories.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>3D Experience</h3>
            <p>
              Navigate through a virtual gallery where your photos come alive in
              stunning three-dimensional space.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>
              Works seamlessly on all devices. Touch, swipe, and explore your
              memories on any screen.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3>Background Music</h3>
            <p>
              Add your favorite soundtrack to create an emotional, cinematic
              experience for viewers.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Smooth Animations</h3>
            <p>
              Elegant transitions and animations that make browsing your album
              feel magical.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>Easy Sharing</h3>
            <p>
              Share a single link with family and friends. They can view it
              anywhere, anytime.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Quality</h3>
            <p>
              High-resolution images with professional color grading and
              enhancement.
            </p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="templates">
        <div className="section-title">
          <h2>Our Templates</h2>
          <p>
            Choose from our collection of beautifully designed 3D album templates
          </p>
        </div>
        <div className="templates-grid">
          <div className="template-card">
            <div className="template-preview royal">
              <span style={{ fontSize: '4rem' }}>🏰</span>
            </div>
            <div className="template-info">
              <h3>Royal Palace</h3>
              <p>Traditional Indian wedding theme with majestic royal elements</p>
              <span className="template-badge">Premium</span>
            </div>
          </div>
          <div className="template-card">
            <div className="template-preview garden">
              <span style={{ fontSize: '4rem' }}>🌸</span>
            </div>
            <div className="template-info">
              <h3>Garden Paradise</h3>
              <p>Beautiful outdoor garden setting with natural elements</p>
              <span className="template-badge">Premium</span>
            </div>
          </div>
          <div className="template-card">
            <div className="template-preview minimal">
              <span style={{ fontSize: '4rem' }}>⬜</span>
            </div>
            <div className="template-info">
              <h3>Modern Minimal</h3>
              <p>Clean and elegant floating gallery design</p>
              <span className="template-badge">Starter</span>
            </div>
          </div>
          <div className="template-card">
            <div className="template-preview floating">
              <span style={{ fontSize: '4rem' }}>✨</span>
            </div>
            <div className="template-info">
              <h3>Floating Gallery</h3>
              <p>Ethereal space with floating photo frames</p>
              <span className="template-badge">Premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="section-title">
          <h2>Simple Pricing</h2>
          <p>Choose the perfect package for your wedding album</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <div className="price">₹5,000</div>
            <p>Perfect for intimate weddings</p>
            <ul className="features-list">
              <li>Basic 3D Template</li>
              <li>1 Event Coverage</li>
              <li>Up to 20 Photos</li>
              <li>Basic Animations</li>
              <li>Shareable Link</li>
              <li>7 Days Delivery</li>
            </ul>
            <Link href="#order" className="btn btn-secondary">
              Select Plan
            </Link>
          </div>
          <div className="pricing-card featured">
            <h3>Premium</h3>
            <div className="price">₹15,000</div>
            <p>Most Popular Choice</p>
            <ul className="features-list">
              <li>All 4 Premium Templates</li>
              <li>All Events Coverage</li>
              <li>Unlimited Photos</li>
              <li>Premium Animations</li>
              <li>Background Music</li>
              <li>Priority Support</li>
              <li>7 Days Delivery</li>
            </ul>
            <Link href="#order" className="btn btn-primary">
              Select Plan
            </Link>
          </div>
          <div className="pricing-card">
            <h3>Luxury</h3>
            <div className="price">₹30,000</div>
            <p>The Ultimate Experience</p>
            <ul className="features-list">
              <li>Custom 3D Elements</li>
              <li>All Events Coverage</li>
              <li>Video Backgrounds</li>
              <li>Premium Animations</li>
              <li>Custom Music</li>
              <li>Extra Revisions</li>
              <li>Priority Support</li>
            </ul>
            <Link href="#order" className="btn btn-secondary">
              Select Plan
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-title">
          <h2>How It Works</h2>
          <p>Simple 3-step process to get your dream album</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Order</h3>
            <p>Fill the order form with your wedding details and select your preferred plan</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>We Create</h3>
            <p>We design your custom 3D album with all your photos and special moments</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Share</h3>
            <p>Get your exclusive link to share with family and friends around the world</p>
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section className="order-section" id="order">
        <div className="section-title">
          <h2>Place Your Order</h2>
          <p>Tell us about your special day</p>
        </div>
        <div className="order-container">
          <form className="order-form" onSubmit={handleOrderSubmit}>
            <div className="form-group">
              <label>Groom&apos;s Name</label>
              <input
                type="text"
                name="groomName"
                placeholder="Enter groom's name"
                required
              />
            </div>
            <div className="form-group">
              <label>Bride&apos;s Name</label>
              <input
                type="text"
                name="brideName"
                placeholder="Enter bride's name"
                required
              />
            </div>
            <div className="form-group">
              <label>Wedding Date</label>
              <input
                type="date"
                name="weddingDate"
                required
              />
            </div>
            <div className="form-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                placeholder="Wedding venue"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your WhatsApp number"
                required
              />
            </div>
            <div className="form-group">
              <label>Select Plan</label>
              <select name="plan">
                <option value="Starter">Starter - ₹5,000</option>
                <option value="Premium" selected>Premium - ₹15,000</option>
                <option value="Luxury">Luxury - ₹30,000</option>
              </select>
            </div>
            <div className="form-group">
              <label>Events to Include</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="events" value="Haldi" />
                  Haldi
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="events" value="Mehendi" />
                  Mehendi
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="events" value="Sangeet" />
                  Sangeet
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="events" value="Baraat" />
                  Baraat
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="events" value="Wedding" defaultChecked />
                  Wedding
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="events" value="Reception" />
                  Reception
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Special Requests</label>
              <textarea
                name="requests"
                rows={4}
                placeholder="Any special requests or messages..."
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Submit Order via WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h2>WedVerse</h2>
          <p>
            Creating magical 3D wedding album experiences.
            Your memories, beautifully preserved.
          </p>
          <div className="footer-links">
            <Link href="/album">View Demo</Link>
            <a href="#order">Order Now</a>
            <a href="https://wa.me/919999999999">Contact</a>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
            © 2026 WedVerse. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
