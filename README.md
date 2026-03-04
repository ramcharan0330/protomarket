# ProtoMarket 🚀

**India's Prototype Marketplace** — A platform where engineers and builders list, sell, and take custom orders for software and hardware prototypes.

🔗 **Live Demo:** [protomarket-ozhr.vercel.app](https://protomarket-ozhr.vercel.app)

---

## What is ProtoMarket?

ProtoMarket connects prototype builders with buyers across 6 sectors — Healthcare, Agriculture, Education, Finance, Defense, and Energy. Buyers can browse ready-made prototypes, configure them, or commission fully custom builds directly from verified builders.

---

## Features

- 🔐 **Google OAuth Login** with buyer/seller role selection (Firebase Auth)
- 🛒 **Marketplace** with real-time search, sector filters, type filters, and sorting
- ⚙️ **Configuration Selector** — each prototype has multiple tiers with different prices
- 🔓 **Builder Contact Unlock** — escrow-style fee system to contact builders directly
- 📊 **Builder Dashboard** — view stats, manage listings, accept/decline custom requests
- 📈 **Trending Page** — leaderboard, rising sectors, live activity feed
- 🛠️ **Custom Orders** — browse builders by sector, submit custom build requests
- 🌙 **Dark / Light Mode** — persisted across sessions
- 📱 **Responsive Design** — works on mobile and desktop

---

## Tech Stack

| Tech | Usage |
|------|-------|
| React 18 | Frontend framework |
| Vite | Build tool |
| React Router v6 | Client-side routing |
| Firebase Auth | Google OAuth authentication |
| Lucide React | Icon library |
| Vercel | Deployment |

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, sectors, featured prototypes |
| `/marketplace` | Browse all prototypes with filters |
| `/model/:id` | Model detail with configs, reviews, buy panel |
| `/builder/:id` | Builder profile with listings and stats |
| `/trending` | Leaderboard, rising sectors, live activity |
| `/custom-orders` | Custom build request directory |
| `/dashboard` | Builder dashboard (builder login required) |
| `/login` | Google OAuth login with role selection |

---

## Getting Started
```bash
# Clone the repo
git clone https://github.com/ramcharan0330/protomarket.git
cd protomarket

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## Project Status

🚧 Currently in Beta — this is a frontend prototype with mocked data. Backend, payments, and real listings are planned for future development.

---

## Author

Built by ** Ram Charan** as a resume project to demonstrate React, Firebase, and full-stack UI skills.
```

Save it, then push to GitHub:
```
git add .
git commit -m "add README"
git push