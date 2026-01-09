# Submission Details

## Test Account Credentials

**username:** chowdhuryshakur@gmail.com
**password:** Pass@123

## How to Run the Application

1. Clone the repository
2. Install dependencies: `npm install`
3. Set environment variable in `.env.local`:
    a) NEXT_PUBLIC_API_BASE_URL=http://4.213.57.100:3100/api
4. Run development server: `npm run dev`
5. Open http://localhost:3000

## Features Implemented

✅ **Login Page**
- Username/password authentication
- API integration with JWT
- Error handling and loading states

✅ **Inventory Page**
- List items with search functionality
- Pagination support
- Loading skeletons and empty states
- Responsive grid layout
- Click to view item details

✅ **Item Details Page**
- Fetch and display item details
- Show all item fields (name, quantity, location, labels, notes)
- Created/updated timestamps
- Edit and delete buttons (UI only)

✅ **Locations Page** (Optional but implemented)
- Tree view of locations
- Location details panel
- Responsive layout

✅ **Technical Requirements**
- Next.js 16 with App Router
- TypeScript for type safety
- TanStack Query for data fetching
- Zustand for state management
- Tailwind CSS for styling
- API client layer with interceptors
- Authentication flow with localStorage
- Fully responsive design
- Basic accessibility features

## Key Implementation Details

### Authentication
- Tokens stored in localStorage with Zustand persistence
- Axios interceptors for automatic token attachment
- Protected routes using middleware
- Automatic logout on 401 errors

### API Integration
- Type-safe API client with interceptors
- Environment-based API URL configuration
- Proper error handling for all API calls
- Loading states for better UX

### State Management
- Zustand for auth state (simple and effective)
- TanStack Query for server state (caching, background updates)
- No unnecessary global state

### UI/UX
- Loading skeletons for better perceived performance
- Empty states with helpful messages
- Error boundaries with retry options
- Responsive design (mobile-first)
- Accessible form controls and navigation

## Tradeoffs & Assumptions

1. **API Schema Assumptions**: Made assumptions about API response structure based on Swagger documentation.

2. **Edit Functionality**: Edit buttons are present but not fully implemented (would need modal/drawer).

3. **File Upload**: Not implemented as not shown in requirements.

4. **Advanced Search**: Basic search implemented; advanced filters would need more API support.

5. **Real-time Updates**: Not implemented (would need WebSockets).

## Next Steps (If More Time)

1. Complete CRUD operations for items/locations
2. Implement drag-and-drop for inventory organization
3. Add barcode scanning support
4. Implement offline mode with IndexedDB
5. Add data export/import features
6. Implement role-based access control
7. Add comprehensive test suite
8. Implement image upload for items

## Video Demo

[Unlisted YouTube video link will be added here]

---

**Built with ❤️ using Next.js 16, TypeScript, and Tailwind CSS**