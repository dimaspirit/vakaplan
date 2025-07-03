# Vakaplan

Vakaplan is a job application tracker designed to help candidates streamline their job search process. It allows users to create personalized job search tracks (e.g., for UI Designer or Frontend Developer roles), track the status of each application, and follow a checklist to prepare for interviews — all within a clean and intuitive interface.

Vakaplan is open-source and serverless. You can fork it, self-host it with Firebase, and securely store your job search data without relying on third-party databases.

## 🚀 Getting Started
1. Fork the project

2. Create a Firebase project
Set up a new Firebase project from Firebase Console. Enable Authentication and Firestore Database.

3. Add GitHub Actions secrets
In your forked repo:

Go to Settings → Actions → Secrets → New repository secret

Add the required Firebase environment variables for production builds.

4. Set up local environment
Create a .env.local file at the root of the project and add your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Update router basename
In `src/main.jsx`, update the basename in the BrowserRouter to match your forked project name:
```jsx
<BrowserRouter basename="/your-fork-name">
```

## 🛠️ Tech Stack
React Router – Client-side routing

shadcn/ui – Clean and accessible UI components

Zod – Schema validation for form data

Zustand – Lightweight state management