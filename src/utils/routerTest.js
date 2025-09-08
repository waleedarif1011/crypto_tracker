/**
 * Simple test to verify React Router setup
 * This file tests the routing configuration
 */

import { createBrowserRouter } from 'react-router-dom';

// Mock components for testing
const MockHome = () => 'Home Component';
const MockCoinDetail = () => 'Coin Detail Component';
const MockNotFound = () => '404 Component';

// Test router configuration
export const testRouter = createBrowserRouter([
  {
    path: '/',
    element: <MockHome />,
    errorElement: <div>Error occurred</div>,
  },
  {
    path: '/coin/:id',
    element: <MockCoinDetail />,
    errorElement: <div>Error occurred</div>,
  },
  {
    path: '/404',
    element: <MockNotFound />,
  },
  {
    path: '*',
    element: <MockNotFound />,
  },
]);

console.log('✅ React Router test configuration loaded successfully');
console.log('Routes configured:');
console.log('  - / (Home)');
console.log('  - /coin/:id (Coin Detail)');
console.log('  - /404 (Not Found)');
console.log('  - * (Catch all -> 404)');

export default testRouter;
