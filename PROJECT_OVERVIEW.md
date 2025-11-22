# Nature Medica - E-Commerce Platform Project Overview

## 📋 Project Summary

**Nature Medica** is a full-stack e-commerce platform built with Next.js for selling natural health and Ayurvedic wellness products. The platform features a complete admin dashboard, customer shopping experience, payment integration, and shipping management.

### Tech Stack

- **Framework**: Next.js 15.5.6 (with Turbopack)
- **UI Library**: React 19.1.0
- **State Management**: Redux Toolkit (@reduxjs/toolkit)
- **Database**: MongoDB (Mongoose ODM)
- **Styling**: Tailwind CSS v4
- **Image Hosting**: Cloudinary
- **Payment Gateways**: PhonePe, Cashfree, Razorpay
- **Shipping Providers**: Shiprocket, Delhivery, Ekart

---

## 🏗️ Project Structure

```
my-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # About page
│   │   ├── addresses/          # User address management
│   │   ├── admin/              # Admin dashboard pages
│   │   │   ├── banners/        # Banner management
│   │   │   ├── categories/     # Category management
│   │   │   ├── collections/    # Collections management
│   │   │   ├── contacts/       # Contact messages
│   │   │   ├── coupons/        # Coupon management
│   │   │   ├── orders/         # Order management
│   │   │   ├── products/       # Product management
│   │   │   ├── returns/        # Return requests
│   │   │   └── reviews/        # Review management
│   │   ├── api/                # API routes
│   │   │   ├── admin/          # Admin API endpoints (41 items)
│   │   │   ├── auth/           # Authentication endpoints (10 items)
│   │   │   ├── cashfree/       # Cashfree payment integration
│   │   │   ├── phonepe/        # PhonePe payment integration
│   │   │   ├── razorpay/       # Razorpay payment integration
│   │   │   ├── orders/         # Order APIs
│   │   │   ├── payments/       # Payment APIs
│   │   │   ├── returns/        # Return APIs
│   │   │   ├── shipments/      # Shipping APIs
│   │   │   └── user/           # User APIs (9 items)
│   │   ├── auth/               # Auth pages (login, register, etc.)
│   │   ├── cart/               # Shopping cart page
│   │   ├── categories/         # Category listing
│   │   ├── checkout/           # Checkout flow
│   │   ├── contact/            # Contact page
│   │   ├── faq/                # FAQ page
│   │   ├── help/               # Help center
│   │   ├── notifications/      # User notifications
│   │   ├── orders/             # User order history
│   │   ├── payment/            # Payment pages
│   │   ├── payment-processing/ # Payment processing
│   │   ├── privacy/            # Privacy policy
│   │   ├── products/           # Product pages
│   │   ├── profile/            # User profile
│   │   ├── refund/             # Refund policy
│   │   ├── shipping/           # Shipping policy
│   │   ├── terms/              # Terms & conditions
│   │   ├── thankyou/           # Order confirmation
│   │   ├── track/              # Order tracking
│   │   ├── layout.js           # Root layout
│   │   ├── page.js             # Homepage
│   │   ├── globals.css         # Global styles
│   │   └── loading.jsx         # Loading component
│   ├── components/             # React components
│   │   ├── admin/              # Admin components (23 files)
│   │   │   ├── AdminHeader.jsx
│   │   │   ├── AdminSidebar.jsx
│   │   │   ├── BannerList.jsx
│   │   │   ├── CategoryList.jsx
│   │   │   ├── CouponList.jsx
│   │   │   ├── DashboardStats.jsx
│   │   │   ├── OrdersTable.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductEditForm.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   └── ...more components
│   │   ├── customer/           # Customer-facing components (38 files)
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductInfo.jsx
│   │   │   ├── CategoryGrid.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   ├── ReviewSection.jsx
│   │   │   ├── NewsletterPopup.jsx
│   │   │   └── ...more components
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── ui/                 # Reusable UI components
│   │   ├── CartHydrator.jsx    # Client-side cart hydration
│   │   ├── Providers.jsx       # App providers
│   │   └── StoreProvider.jsx   # Redux store provider
│   ├── models/                 # MongoDB models
│   │   ├── User.js             # User model
│   │   ├── Product.js          # Product model
│   │   ├── Order.js            # Order model
│   │   ├── Category.js         # Category model
│   │   ├── Banner.js           # Banner model
│   │   ├── Coupon.js           # Coupon model
│   │   ├── Review.js           # Review model
│   │   ├── ReturnRequest.js    # Return request model
│   │   ├── Notification.js     # Notification model
│   │   ├── ContactMessage.js   # Contact message model
│   │   └── Analytics.js        # Analytics model
│   ├── lib/                    # Utility libraries
│   │   ├── mongodb.js          # MongoDB connection
│   │   ├── jwt.js              # JWT utilities
│   │   ├── email.js            # Email service
│   │   ├── emailNotifications.js # Email notification templates
│   │   ├── cloudinary.js       # Cloudinary integration
│   │   ├── phonepe.js          # PhonePe payment integration
│   │   ├── cashfree.js         # Cashfree integration
│   │   ├── shiprocket.js       # Shiprocket shipping
│   │   ├── delhivery.js        # Delhivery shipping
│   │   ├── ekart.js            # Ekart shipping
│   │   ├── userService.js      # User service utilities
│   │   └── validators.js       # Input validators
│   ├── store/                  # Redux store
│   │   ├── store.js            # Store configuration
│   │   ├── index.js            # Store exports
│   │   └── slices/             # Redux slices
│   │       ├── cartSlice.js    # Shopping cart state
│   │       ├── userSlice.js    # User state
│   │       └── adminSlice.js   # Admin state
│   ├── hooks/                  # Custom React hooks
│   ├── middleware/             # Custom middleware
│   └── assets/                 # Static assets
├── public/                     # Public assets
│   ├── logo.png
│   ├── categories/
│   ├── fonts/
│   └── *.mp4                   # Product videos
├── scripts/                    # Utility scripts
├── .env.local                  # Environment variables
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Tailwind CSS config
├── package.json                # Dependencies
└── README.md                   # Project readme
```

---

## 🗃️ Database Models

### 1. **User Model** (`models/User.js`)

- **Fields:**
  - `name`, `email`, `phone`, `password`
  - `isEmailVerified`, `emailVerificationOTP`, `emailVerificationOTPExpires`
  - `resetPasswordOTP`, `resetPasswordOTPExpires`
  - `addresses[]` (embedded address schema)
  - `role` (customer/admin)
  - `isActive`, `lastLogin`
- **Methods:**
  - `comparePassword()` - bcrypt password comparison
  - `generateOTP()` - 6-digit OTP generation

### 2. **Product Model** (`models/Product.js`)

- **Fields:**
  - `title`, `slug`, `description`, `images[]`
  - `price`, `mrp`, `discountPercent`
  - `variants[]` (name, value, price, stock)
  - `category` (ref to Category)
  - `brand`, `stock`, `ingredients`
  - `specifications` (Map)
  - `ratingAvg`, `reviewCount`
  - `visibility` (boolean)
  - **Badge fields:** `isBestSeller`, `isNewArrival`, `isFeatured`
- **Indexes:**
  - Text index on title & description
  - Unique index on slug
  - Indexes on badge fields

### 3. **Order Model** (`models/Order.js`)

- **Fields:**
  - `orderId`, `user`, `userName`, `userEmail`
  - `items[]` (product, title, image, quantity, price, variant)
  - `totalPrice`, `discount`, `finalPrice`
  - `shippingAddress` (embedded)
  - `paymentMode` (online/cod)
  - `paymentStatus` (pending/paid/failed/refunded)
  - `orderStatus` (Pending/Processing/Shipped/Delivered/Cancelled)
  - **Shipping fields:**
    - `shippingProvider` (shiprocket/delhivery/manual)
    - `trackingId`, `courierName`, `estimatedDelivery`
    - Provider-specific IDs (shiprocket, delhivery, ekart)
  - **Payment fields:** Razorpay, PhonePe, Cashfree IDs
  - `statusHistory[]` (status tracking)

### 4. **Category Model**

- Name, slug, description, image
- Active status

### 5. **Banner Model**

- Type (home/category/promo)
- Image URL, link, order, active status

### 6. **Coupon Model**

- Code, discount type (percentage/fixed)
- Value, minimum order, expiry date

### 7. **Review Model**

- User, product, rating, comment
- Approved status

### 8. **ReturnRequest Model**

- Order reference, reason, status
- Refund details

### 9. **Notification Model**

- User reference, type, message
- Read status

### 10. **ContactMessage Model**

- Name, email, phone, message
- Status, replied status

### 11. **Analytics Model**

- Sales data, user growth, product performance

---

## 🔐 Authentication Flow

### Registration

1. User submits registration form
2. Password is hashed with bcrypt
3. 6-digit OTP is generated and sent to email
4. User account created with `isEmailVerified: false`

### Email Verification

1. User enters OTP
2. OTP is validated (must not be expired)
3. User's `isEmailVerified` set to true

### Login

1. User submits credentials
2. Email lookup in database
3. Password verification with bcrypt
4. JWT token generated and returned
5. `lastLogin` timestamp updated

### Password Reset

1. User requests password reset
2. OTP sent to registered email
3. User verifies OTP
4. New password is hashed and saved

---

## 🛒 Shopping Cart System

### Redux Cart Slice (`store/slices/cartSlice.js`)

**State Structure:**

```javascript
{
  items: [],        // Cart items
  total: 0,         // Total price
  discount: 0,      // Coupon discount
  couponCode: null  // Applied coupon
}
```

**Actions:**

- `addToCart(product, quantity, variant)` - Add item to cart
- `removeFromCart(productId, variant)` - Remove item
- `updateQuantity(productId, variant, quantity)` - Update quantity
- `applyCoupon(code, discount)` - Apply coupon
- `removeCoupon()` - Remove coupon
- `clearCart()` - Empty cart
- `hydrateCart()` - Load cart from localStorage

**Persistence:**

- Cart data stored in `localStorage` with key `naturemedica_cart`
- 7-day expiry on stored cart data
- Client-side hydration on app load
- Auto-save on every cart modification

---

## 💳 Payment Integration

### Supported Payment Gateways:

#### 1. **PhonePe** (`lib/phonepe.js`)

- OAuth token generation
- Pay initialization API
- Payment status verification
- Sandbox and production environments

#### 2. **Cashfree** (`lib/cashfree.js`)

- Payment order creation
- Session management

#### 3. **Razorpay**

- Order creation
- Payment verification with signature

### Payment Flow:

1. User completes checkout
2. Order created with status "Pending"
3. Payment gateway initialization
4. User redirected to payment page
5. Payment callback/webhook updates order
6. Order status updated to "Paid" or "Failed"
7. Email notification sent

---

## 📦 Shipping Integration

### Supported Shipping Providers:

#### 1. **Shiprocket** (`lib/shiprocket.js`)

- Create shipment orders
- Generate AWB (Air Waybill)
- Track shipments
- Label generation

#### 2. **Delhivery** (`lib/delhivery.js`)

- Waybill creation
- Shipment tracking
- Pincode serviceability check

#### 3. **Ekart (Flipkart)** (`lib/ekart.js`, `lib/ekart-elite.js`)

- Reference ID generation
- Tracking integration
- Standard and Elite services

### Manual Shipping:

- Admin can manually add tracking details
- Custom courier name and tracking ID
- Notes field for additional info

---

## 👨‍💼 Admin Dashboard

### Features:

#### Dashboard (`admin/page.jsx`)

- Sales overview
- User growth chart
- Recent orders
- Category revenue chart
- Product performance metrics

#### Banner Management (`admin/banners/`)

- Create/edit/delete banners
- Image upload via Cloudinary
- Order sequencing
- Active/inactive toggle

#### Category Management (`admin/categories/`)

- CRUD operations
- Category analytics
- Product count per category

#### Product Management (`admin/products/`)

- Product form with:
  - Multiple image upload
  - Variants (size, color, etc.)
  - Stock management
  - Badge assignment (bestseller, new, featured)
  - Rich text description
  - Specifications
- Bulk operations
- Inventory tracking

#### Order Management (`admin/orders/`)

- Order listing with filters
- Order detail view with:
  - Customer info
  - Items breakdown
  - Shipping address
  - Payment details
  - Status history
- Manual shipment creation
- Shipping provider integration
- Order status updates
- Tracking ID management

#### Coupon Management (`admin/coupons/`)

- Create discount coupons
- Percentage or fixed amount
- Minimum order value
- Expiry dates
- Usage limits

#### Review Management (`admin/reviews/`)

- Approve/reject reviews
- Reply to reviews
- Moderate content

#### Return Management (`admin/returns/`)

- View return requests
- Approve/reject returns
- Process refunds
- Track return status

---

## 🛍️ Customer Features

### Homepage Components:

- `HeroBanner` - Carousel banners
- `CategoryGrid` - Browse by category
- `BrandMarquee` - Brand showcase
- `WellnessGoalCarousel` - Health goals
- `BestSellerSection` - Top products
- `NewArrivalSection` - Latest products
- `FeaturedSection` - Featured items
- `CustomerReviews` - Testimonials
- `FAQ` - Frequently asked questions
- `TrustedBySection` - Trust badges
- `InfoStrip` - Features (free shipping, etc.)

### Product Pages:

- `ProductImages` - Image gallery with zoom
- `ProductInfo` - Details, price, variants
- `ProductTabs` - Description, reviews, specifications
- `ReviewSection` - Customer reviews with ratings
- `RelatedProducts` - Similar items

### Checkout Flow:

1. Cart review
2. Address selection/creation
3. Payment method (Online/COD)
4. Coupon application
5. Order summary
6. Payment processing
7. Thank you page with order details

### User Profile:

- Order history
- Address management
- Profile settings
- Notification preferences

### Order Tracking:

- Real-time tracking status
- Courier details
- Estimated delivery date
- Status timeline

---

## 📧 Email Notifications

Implemented in `lib/emailNotifications.js`:

### Email Types:

1. **Welcome Email** - After registration
2. **OTP Verification** - Email verification
3. **Password Reset** - Reset OTP
4. **Order Confirmation** - Order placed
5. **Payment Confirmation** - Payment success
6. **Shipping Notification** - Order shipped
7. **Delivery Notification** - Order delivered
8. **Return Initiated** - Return request
9. **Refund Processed** - Refund completed

### Email Service (`lib/email.js`):

- Nodemailer integration
- HTML email templates
- Attachment support
- Error handling

---

## 🔧 Configuration Files

### `next.config.mjs`:

- Cloudinary image optimization
- Remote image patterns
- SVG support
- AVIF/WebP format support
- Turbopack experimental features

### `tailwind.config.js`:

- Custom color palette
- Typography settings
- Component utilities

### `package.json` Dependencies:

- **Core:** Next.js, React
- **State:** Redux Toolkit, React-Redux
- **Database:** Mongoose
- **Auth:** bcryptjs, jsonwebtoken
- **Payments:** cashfree-pg, razorpay, phonepe-pg-sdk-node
- **Media:** cloudinary, @react-pdf/renderer
- **UI:** lucide-react, react-icons, chart.js
- **Forms:** joi, zod
- **Styling:** Tailwind CSS, clsx
- **Utilities:** axios, date-fns, node-fetch

---

## 🚀 Running the Project

### Development:

```bash
npm run dev
```

Starts the development server with Turbopack on http://localhost:3000

### Build:

```bash
npm run build
```

Creates an optimized production build

### Start Production:

```bash
npm start
```

Runs the production server

### Lint:

```bash
npm run lint
```

Runs ESLint for code quality

---

## 🔑 Environment Variables

Required environment variables (in `.env.local`):

```bash
# Database
MONGO_URI=mongodb://...

# JWT
JWT_SECRET=your_secret_key

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PhonePe
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_CLIENT_ID=your_client_id
PHONEPE_CLIENT_SECRET=your_client_secret
PHONEPE_ENV=production|sandbox

# Cashfree
CASHFREE_APP_ID=your_app_id
CASHFREE_SECRET_KEY=your_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Shiprocket
SHIPROCKET_EMAIL=your_email
SHIPROCKET_PASSWORD=your_password

# Delhivery
DELHIVERY_API_KEY=your_api_key

# Ekart
EKART_API_KEY=your_api_key
```

---

## 📊 Key Features Summary

### Customer-Facing:

✅ Product browsing with filters & search  
✅ Shopping cart with persistence  
✅ Multiple payment options (PhonePe, Cashfree, Razorpay, COD)  
✅ Order tracking  
✅ Product reviews & ratings  
✅ Coupon system  
✅ Address management  
✅ Order history  
✅ Return requests  
✅ Responsive design  
✅ SEO optimized

### Admin Panel:

✅ Dashboard analytics  
✅ Product management  
✅ Order management  
✅ Inventory tracking  
✅ Shipping integration  
✅ Coupon management  
✅ Banner management  
✅ Review moderation  
✅ Return processing  
✅ Customer management

### Technical:

✅ Server-side rendering (SSR)  
✅ Static generation where possible  
✅ API routes for backend  
✅ MongoDB with Mongoose  
✅ Redux for state management  
✅ Cloudinary for image optimization  
✅ Email notifications  
✅ JWT authentication  
✅ Form validation  
✅ Error handling  
✅ Loading states  
✅ Custom 404 page

---

## 📝 Recent Fixes & Updates

Based on conversation history:

1. **Comment Display Fix** - Fixed comment extraction logic in LeadActionsModal
2. **Service Name Display** - Implemented service name extraction on leads pages
3. **Type-Only Import** - Fixed TypeScript import errors
4. **Syntax Highlighter Types** - Resolved missing declaration files
5. **Admin Leads Pages** - Added meeting scheduled and quotation sent tracking

---

## 🎨 Design Philosophy

- **Modern & Clean** - Minimal, bold design with premium aesthetics
- **Responsive** - Mobile-first approach
- **Performance** - Optimized images, lazy loading, code splitting
- **Accessibility** - Semantic HTML, ARIA labels
- **User Experience** - Smooth transitions, micro-interactions
- **Trust Building** - Reviews, testimonials, trust badges

---

## 🔮 Potential Enhancements

- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Live chat support
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Inventory alerts
- [ ] Automated email marketing
- [ ] Social media integration
- [ ] PWA support
- [ ] Voice search

---

## 📞 Support & Documentation

For questions or issues, refer to:

- Next.js Docs: https://nextjs.org/docs
- MongoDB Docs: https://docs.mongodb.com
- Tailwind CSS: https://tailwindcss.com/docs
- Redux Toolkit: https://redux-toolkit.js.org

---

**Project Status:** ✅ Active Development  
**Last Updated:** January 2025  
**Version:** 0.1.0
