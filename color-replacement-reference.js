// Utility script to replace all color references
// This is a reference file for manual updates

const colorReplacements = {
  '#003366': '#006eb4',
  '#00509E': '#006eb4'
};

// Files that need updates:
const filesToUpdate = [
  '/src/app/pages/Login.tsx',
  '/src/app/pages/Home.tsx', 
  '/src/app/pages/Stores.tsx',
  '/src/app/pages/StoreProducts.tsx',
  '/src/app/pages/Sales.tsx',
  '/src/app/pages/Suggestion.tsx',
  '/src/app/pages/Contact.tsx',
  '/src/app/pages/Profile.tsx',
  '/src/app/pages/Favorites.tsx',
  '/src/app/pages/ProductDetail.tsx',
  '/src/app/pages/WhereToFind.tsx'
];

// Note: Most colors will automatically update through theme.css variables
// Only inline hex colors need manual replacement
