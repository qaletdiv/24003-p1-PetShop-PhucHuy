// Common search functionality for all pages
// Redirects to product.html with search query parameter

document.addEventListener("DOMContentLoaded", function() {
  // Try to find search form by id first, then by class
  const searchForm = document.getElementById("search-form") || 
                     document.querySelector("form.search-form");
  
  // Try to find search input by id, name, or placeholder
  const searchInput = document.getElementById("search-input") || 
                      document.querySelector('input[name="search"]') ||
                      document.querySelector('input[placeholder*="Search"]');
  
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // Redirect to product.html with search query parameter
        window.location.href = `product.html?search=${encodeURIComponent(searchTerm)}`;
      } else {
        // If empty, just go to product page
        window.location.href = "product.html";
      }
    });
  }
});

