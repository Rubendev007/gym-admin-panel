### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/Rubendev007/gym-admin-panel.git

# 2. Navigate to project folder
cd gym-admin-panel

# 3. Install dependencies
npm install

# 4. Start development server
npm start


gym-admin-panel/
├── src/
│   ├── auth/                 # Authentication hooks
│   │   └── useAuth.js
│   ├── api/                  # API integration files
│   │   ├── auth.api.js
│   │   ├── members.api.js
│   │   └── ...
│   ├── components/           # Reusable components
│   │   └── ProtectedRoute.jsx
│   ├── context/              # React context
│   │   └── AuthProvider.jsx
│   ├── App.js               # Main app component
│   └── routes.config.js     # Route definitions
