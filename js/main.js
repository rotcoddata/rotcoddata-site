// ✅ Rotcod Data Frontend Connection Script

const API_BASE_URL = "https://rotcod-backend.onrender.com"; // Your backend URL

// Example: Fetch data bundles
async function getBundles() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/bundles`);
    const data = await response.json();
    console.log("Available Bundles:", data);

    const container = document.getElementById("bundles-container");
    if (container) {
      container.innerHTML = data
        .map(
          (bundle) => `
          <div class="bundle-card">
            <h3>${bundle.name}</h3>
            <p>${bundle.price} KES</p>
          </div>
        `
        )
        .join("");
    }
  } catch (error) {
    console.error("Error fetching bundles:", error);
  }
}

// Example: Send a contact message
async function sendMessage(name, email, message) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const result = await res.json();
    console.log("Message sent:", result);
  } catch (error) {
    console.error("Failed to send message:", error);
  }
}

// Auto-load bundles when site opens
document.addEventListener("DOMContentLoaded", getBundles);
