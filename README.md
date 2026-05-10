# Next Store
NOTE: This is advanced side project for learning and does not actually sell or ship anything. This is NOT a registered business. Do NOT use any real banking or payment details.

## About
A full-stack e-commerce web application built with Next.js App Router. Supports product browsing, search and filtering, shopping cart, checkout, user accounts, admin management, product reviews, image uploads, and payment processing via PayPal and Stripe.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/Radix UI |
| Language | TypeScript |
| Database | PostgreSQL via Prisma ORM (Neon serverless) |
| Auth | NextAuth v5 beta — credentials provider + Prisma adapter |
| Validation | Zod |
| Forms | React Hook Form |
| Payments | PayPal Checkout API, Stripe Webhooks |
| Uploads | UploadThing |
| Charts | Recharts |
| Testing | Jest + ts-jest |

---

## Project Structure

```
app/
  (root)/             Public storefront routes
  (auth)/             Sign-in and sign-up routes
  user/               Authenticated user dashboard routes
  admin/              Admin dashboard and management routes
  api/                Auth, upload, and webhook API routes

components/
  ui/                 Reusable UI primitives
  shared/             Storefront, product, checkout, admin, and header components

lib/
  actions/            Server actions and business logic
  constants/          App-wide constants and environment-backed defaults
  validators.ts       Zod validation schemas
  paypal.ts           PayPal API helper
  utils.ts            Formatting and utility helpers
  uploadthing.ts      UploadThing client helpers
  generated/prisma/   Generated Prisma client

db/
  prisma.ts           Prisma client setup (Neon adapter + Decimal serialization)
  seed.ts             Database seeding logic
  sample-data.ts      Sample catalog and user data

prisma/
  schema.prisma       Database schema
  migrations/         Prisma migrations

types/
  index.ts            Shared TypeScript types inferred from Zod schemas

tests/
  paypal.test.ts      PayPal integration tests
```

---

## Architecture Overview

The app follows the Next.js App Router model. Global concerns — metadata, fonts, theme, and toast providers — are set up in `app/layout.tsx`. The storefront route group (`app/(root)/layout.tsx`) wraps all public pages with the shared header and footer.

Business logic lives in server actions under `lib/actions`. Pages stay thin: they call server actions to fetch data, then pass results to reusable components.

The database schema (Prisma) covers products, users, carts, orders, order items, reviews, and NextAuth session/account tables. The custom Prisma client in `db/prisma.ts` uses the Neon adapter and converts `Decimal` fields (prices, totals) to strings for safe React serialization.

---

## Core Features

### Product Catalog
- Latest and featured product listings
- Product detail pages with images, ratings, and reviews
- Category grouping, search, filtering, sorting, and pagination

### Shopping Cart
- Supports anonymous users (via `sessionCartId` cookie) and authenticated users
- Cart is migrated to the user account on sign-in
- Totals (subtotal, shipping, tax, total) are recalculated server-side

### Checkout & Orders
Checkout requires an authenticated user, a non-empty cart, a shipping address, and a selected payment method. Order creation runs inside a Prisma transaction and clears the cart on success.

Orders track shipping address, payment method and result, price breakdown, paid/unpaid state, delivered/undelivered state, and associated order items.

### User Dashboard
Authenticated users can update their profile and view their order history.

### Admin Dashboard
Admin users have access to:
- Sales overview and revenue metrics
- Recent orders
- Full product, order, and user management

All admin pages include explicit role-based authorization checks.

---

## Payment Integrations

### PayPal
Implemented in `lib/paypal.ts`. The flow:
1. A local order is created in the database.
2. A PayPal order is created for the local order total.
3. The PayPal order ID is stored in the local payment result.
4. After buyer approval, the payment is captured via PayPal.
5. On confirmed capture, the local order is marked as paid and product stock is decremented in a transaction.

The PayPal API base URL defaults to the sandbox and is overridable via environment variable.

### Stripe
Implemented as a webhook in `app/api/webhooks/stripe/route.ts`. The route verifies the Stripe signature, handles `charge.succeeded` events, reads the local order ID from Stripe metadata, and marks the order as paid — keeping all payment confirmation server-side.

---

## Authentication & Authorization

Powered by NextAuth v5 beta with:
- Credentials provider (email/password with bcrypt)
- Prisma adapter for user persistence
- JWT session strategy
- Custom session and JWT callbacks that attach user ID, role, and name to the session
- Cart migration on sign-in/sign-up

Protected routes: shipping, payment method, place order, profile, user dashboard, order pages, and all admin routes. Admin routes additionally verify the `admin` role.

---

## Security

- **Zod validation** on all server action inputs (products, auth, cart, orders, reviews, etc.)
- **Server actions** handle all sensitive mutations
- **NextAuth callbacks** protect authenticated and admin-only routes
- **Role-based access** enforced on all admin pages
- **Bcrypt password hashing** before storage
- **Stripe webhook signature verification** on all incoming webhook requests
- **Authenticated uploads** — UploadThing requires an active session
- **Database transactions** for order creation and payment finalization

---

## Environment Variables

Create a `.env` file in the project root with the following:

```env
DATABASE_URL=

NEXT_PUBLIC_APP_NAME=
NEXT_PUBLIC_APP_DESCRIPTION=
NEXT_PUBLIC_SERVER_URL=

AUTH_SECRET=

PAYPAL_CLIENT_ID=
PAYPAL_APP_SECRET=
PAYPAL_API_URL=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

UPLOADTHING_TOKEN=

PAYMENT_METHODS=
DEFAULT_PAYMENT_METHOD=
PAGE_SIZE=
LATEST_PRODUCTS_LIMIT=
USER_ROLES=
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Other commands:

```bash
npm run lint     # Run ESLint
npm test         # Run Jest tests
npm run build    # Production build
```

> **Note:** Some PayPal tests call live sandbox APIs and require valid PayPal sandbox credentials and network access.

---

## New Contributor Guide

Start with these files to understand the application top-to-bottom:

| File | What it covers |
|---|---|
| `app/layout.tsx` | Global app shell |
| `app/(root)/layout.tsx` | Storefront layout |
| `app/(root)/page.tsx` | Homepage data flow |
| `app/(root)/product/[slug]/page.tsx` | Product detail flow |
| `lib/actions/product.actions.ts` | Catalog business logic |
| `lib/actions/cart.actions.ts` | Cart behavior |
| `lib/actions/order.actions.ts` | Checkout, payments, and admin order logic |
| `auth.ts` | Auth config, sessions, route protection, cart migration |
| `prisma/schema.prisma` | Full database model |
| `lib/validators.ts` | All Zod validation schemas |
