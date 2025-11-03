# YoPrintAnime - Anime Search Application

A modern, full-featured anime search application built with React, TypeScript, and Redux. Search through thousands of anime titles, view detailed information, and browse with server-side pagination.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd yoprint-app-main
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm start
```

The application will be available at [http://localhost:4000](http://localhost:4000)

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## ✨ Features

### Core Functionality

- **Instant Search**: Real-time anime search with 250ms debouncing
- **Server-side Pagination**: Efficient pagination handling for large datasets
- **Anime Details**: Detailed view with synopsis, ratings, genres, and more
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Full type safety throughout the application
- **Redux State Management**: Centralized state management with Redux and Redux Thunk

### Technical Stack

- **React 18** with Hooks (no class components)
- **TypeScript** for type safety
- **Redux** for state management
- **React Router DOM** for navigation
- **Material-UI** for UI components
- **Axios** for API calls
- **Jikan API** (MyAnimeList) for anime data

## 📁 Project Structure

```
src/
├── actions/          # Redux action creators
├── api/              # API service layer
├── containers/        # Page-level components
│   ├── anime/        # Search/list page
│   └── anime_detail/ # Detail page
├── hooks/            # Custom React hooks
├── reducers/         # Redux reducers
├── routes/           # Route configuration
├── thunks/           # Redux thunks for async operations
└── types.ts          # TypeScript type definitions
```

## 🎯 Bonus Implementation

This project includes several bonus features that enhance both user experience and technical excellence:

### User Experience Enhancements

#### 1. **Skeleton Loaders & Meaningful Loading States**

- Custom skeleton loaders for both list and detail views
- Smooth animations during loading states
- Proper loading indicators that match the content structure

#### 2. **Empty State & No Results Handling**

- User-friendly messaging when no results are found
- Helpful error messages for different scenarios
- Clear distinction between "no search results" and "connection issues"

#### 3. **Mobile Responsiveness**

- Fully responsive grid layout (5 items per row on desktop, 2 on tablet, 1 on mobile)
- Touch-friendly interface elements
- Optimized for various screen sizes

#### 4. **Additional UX Features**

- Scroll-to-top on pagination change
- Debounced search input (250ms) for better performance
- Clickable app title to navigate home
- Visual feedback on hover states

### Technical Excellence

#### 1. **Comprehensive Error Handling**

- **Network Failure Detection**: Detects and handles network connectivity issues
- **Rate Limiting Handling**: Gracefully handles API rate limits (429 errors) with user-friendly messages
- **Invalid API Response Validation**: Validates response structure before processing
- **HTTP Error Handling**: Proper handling of all HTTP status codes (404, 429, 500, etc.)
- **Custom Error Class**: `ApiError` class with specific error types and messages

#### 2. **Race Condition Handling**

- **Request Cancellation**: Uses `AbortController` to cancel in-flight requests
- **Search Race Conditions**: Prevents stale search results from overwriting new ones
- **Detail Page Race Conditions**: Handles rapid navigation between detail pages
- **Component Cleanup**: Proper cleanup on component unmount
- **State Update Guards**: Checks abort status before updating state

#### 3. **Code Quality**

- **TypeScript Best Practices**: Minimal use of `any` types, proper type definitions
- **React Best Practices**: Proper hook usage, efficient re-rendering, no anti-patterns
- **Clean Code Organization**: Logical folder structure, reusable components, separation of concerns
- **No Environment Variables**: App works immediately after installation

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode on port 4000
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## 📝 Technical Details

### State Management

- Redux store with middleware (Redux Thunk)
- Typed Redux hooks (`useAppDispatch`, `useAppSelector`)
- Centralized state for anime list, filters, and pagination

### API Integration

- Uses Jikan API v4 (MyAnimeList) - no API key required
- Request cancellation with AbortController
- Response validation and error handling

### Routing

- `/` - Anime search/list page
- `/:id` - Anime detail page

## 🎨 UI/UX Features

- Material-UI components for consistent design
- Smooth transitions and animations
- Loading skeletons that match content structure
- Error alerts with helpful messages
- Responsive grid layout
- Accessible components with proper ARIA labels

## 🛠️ Development

The project uses:

- **TypeScript** for type safety
- **ESLint** for code quality
- **Material-UI** for component library
- **React Router DOM** for navigation
- **Redux** for state management

## 📦 Dependencies

All dependencies are managed via npm (no yarn or pnpm). See `package.json` for the complete list.

---

Built with ❤️ using React and TypeScript
# yoprint
