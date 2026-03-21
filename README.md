# Postify 🚀
### A Modern Social Media Platform

Postify is a full-stack social media web application built with the **MEAN Stack**, enabling users to connect, share content, and engage with a community in real time.

---

## 🌟 Features

- 🔐 **Authentication & Authorization** — Secure JWT-based login, signup, and role-based access control
- 🟠 **Google OAuth** — One-click sign-in via Google accounts
- 📝 **Post Management** — Create, view, like, and comment on posts
- 🖼️ **Image Uploads** — Cloud-based media storage via Cloudinary
- 📱 **Responsive UI** — Single-page application with smooth navigation

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 16, TypeScript, RxJS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Auth | JWT, Google OAuth 2.0 |
| Media Storage | Cloudinary |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Vishwaslad8549/PostifyFE.git
cd PostifyFE

# Install dependencies
npm install

# Run the development server
npm start
```

App runs at `http://localhost:4200`

---

## 🔐 Environment Variables

Create a `src/environments/environment.ts` file:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  googleClientId: 'your_google_client_id'
};
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Route-level page components
│   ├── services/      # API & auth services
│   └── guards/        # Route guards
├── assets/
└── environments/
```

---

## 🔗 Related Repository

> 🔙 Backend repo: [PostifyBE](https://github.com/Vishwaslad8549/PostifyBE)
