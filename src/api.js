// api.js
const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with your actual API URL

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function fetchBlogPosts() {
  const response = await fetch(`${API_BASE_URL}/blogposts`);
  if (!response.ok) throw new Error('Failed to fetch blog posts');
  return response.json();
}

export async function submitContactForm(data) {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to submit contact form');
  return response.json();
}