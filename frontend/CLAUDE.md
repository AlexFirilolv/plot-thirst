# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite frontend application with JWT-based authentication. The app communicates with a backend API server (not in this repository) running on `http://localhost:3000`.

## Development Commands

```bash
# Start development server (runs on default Vite port 5173)
npm run dev

# Build for production
npm run build

# Lint the codebase
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Design System

The app uses **ShadCN UI** components with **Tailwind CSS** following the Plot Thirst design language:
- **Color Palette**: Dark theme with dark red (passion), thorn green (danger), and steel gray (restraint)
- **Design Tokens**: CSS variables in `src/index.css` define the color system
- **Components**: Located in `src/components/ui/` (button, avatar, etc.)
- **Utilities**: `src/lib/utils.js` contains the `cn()` helper for merging Tailwind classes

See `docs/design.md` for complete design language specifications.

### Authentication Flow

The application implements a JWT-based authentication system with automatic token refresh:

1. **Session Verification**: On app load, `App.jsx:14-25` calls `/verify_token` to check if the user has a valid session
2. **Token Refresh**: The axios interceptor in `src/api/api.js:8-26` automatically handles 401 errors by calling `/refresh_token` and retrying the original request
3. **Authentication State**: The `isAuthenticated` state in `App.jsx` controls navigation and content visibility
4. **Navigation Integration**: NavigationBar component shows user menu when authenticated, login/signup buttons when not

### API Configuration

- **Base API Instance**: `src/api/api.js` exports a configured axios instance with:
  - Base URL: `http://localhost:3000`
  - Credentials: enabled (`withCredentials: true`) for cookie-based session management
  - Response interceptor for automatic token refresh on 401 errors

### Component Structure

```
src/
├── components/
│   ├── ui/                     # ShadCN UI components
│   │   ├── button.jsx
│   │   └── avatar.jsx
│   ├── NavigationBar.jsx       # Main navigation with auth integration
│   └── authentication/
│       ├── Login.jsx           # Login form component
│       ├── Register.jsx        # Registration form component
│       └── Authentication.css  # Shared styles for auth components
├── lib/
│   └── utils.js                # Tailwind utility functions (cn)
├── api/
│   └── api.js                  # Configured axios instance with interceptors
├── App.jsx                     # Root component with auth state management
└── main.jsx                    # React app entry point
```

### Authentication Components

Both `Login.jsx` and `Register.jsx` follow the same pattern:
- Use native `fetch` API (not the axios instance from `api.js`)
- Hardcode backend URL as `http://localhost:3000`
- Call `onAuthSuccess(true)` callback on successful authentication
- Use form submission handlers to prevent default behavior

**Note**: There's an inconsistency where Login/Register use `fetch` while the rest of the app uses the configured axios instance in `api.js`. Consider migrating auth components to use the shared axios instance for consistency.

### Backend API Endpoints

The frontend expects these backend endpoints:

- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout (called from NavigationBar)
- `GET /verify_token` - Verify JWT validity
- `POST /refresh_token` - Refresh expired JWT

## Key Implementation Details

### Token Management

- JWTs are handled automatically through cookies (not localStorage)
- The axios interceptor ensures seamless token refresh without user intervention
- Failed refresh attempts (e.g., expired refresh token) will reject the promise, requiring re-authentication

### Navigation Component

The `NavigationBar` component (`src/components/NavigationBar.jsx`) provides:
- **Brand Logo**: "Plot Thirst" with gradient styling
- **Authenticated State**:
  - User avatar with dropdown menu (Profile, Logout)
  - Navigation links (Browse Stories, My Library, Generate)
- **Unauthenticated State**: Login and Sign Up buttons
- **Callbacks**: Triggers modal display for login/register forms in App.jsx

## Code Patterns

- **State Management**: Uses React hooks (`useState`, `useEffect`) for local state
- **Styling**: Tailwind CSS utility classes with ShadCN UI components
- **Design Tokens**: CSS variables in HSL format for theming
- **Error Handling**: Basic try-catch with `alert()` for user feedback (consider replacing with a toast/notification system)
- **Form Handling**: Controlled components with individual state for each form field
- **Component Composition**: Forwarded refs pattern in UI components for better composability
