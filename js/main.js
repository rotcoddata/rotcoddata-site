// ✅ Set your live backend URL here
const BACKEND_URL = "https://rotcod-backend.onrender.com";

// ✅ Load bundles from backend
async function loadBundles() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/bundles`);
    if (!res.ok) throw new Error("Failed to fetch bundles");

    const data = await res.json();
    const container = document.getElementById("bundleList");

    if (!container) {
      console.error("❌ bundleList element not found in HTML");
      return;
    }

    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No bundles available right now.</p>";
      return;
    }

    data.forEach((b) => {
      const item = document.createElement("div");
      item.className = "bundle-item";
      item.innerHTML = `
        <h3>${b.name}</h3>
        <p>💰 Price: Ksh ${b.price}</p>
        <p>⏳ Duration: ${b.duration}</p>
        <button onclick="buyBundle('${b.name}', '${b.price}')">💳 Buy Now</button>
      `;
      container.appendChild(item);
    });
  } catch (err) {
    console.error("❌ Error loading bundles:", err);
  }
}

// ✅ Simulated Buy Function
async function buyBundle(bundleName, price) {
  const confirmBuy = confirm(`Buy ${bundleName} for Ksh ${price}?`);
  if (!confirmBuy) return;

  try {
    const res = await fetch(`${BACKEND_URL}/api/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bundleName, price }),
    });

    const data = await res.json();
    alert(`🎉 Thank you for buying ${bundleName}!\n\n${data.message || "Transaction successful."}`);
  } catch (err) {
    alert("❌ Failed to process your purchase.");
  }
}

// ✅ Initialize when page loads
document.addEventListener("DOMContentLoaded", loadBundles);
