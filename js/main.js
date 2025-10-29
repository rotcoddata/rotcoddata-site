// ✅ Your live backend URL on Render
const BACKEND_URL = "https://rotcod-backend.onrender.com";

// Load bundles
async function loadBundles() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/bundles`);
    const data = await res.json();

    const container = document.getElementById("bundleList");
    container.innerHTML = "";

    data.forEach(b => {
      const item = document.createElement("div");
      item.className = "bundle-item";
      item.innerHTML = `
        <h3>${b.name}</h3>
        <p>Price: ${b.price}</p>
        <p>Data: ${b.data}</p>
        <button onclick="buyBundle('${b.name}', '${b.price}')">💳 Buy Now</button>
      `;
      container.appendChild(item);
    });
  } catch (err) {
    console.error("Error loading bundles:", err);
    alert("❌ Unable to load data bundles. Please try again later.");
  }
}

// Buy bundles
async function buyBundle(bundleName, price) {
  const confirmBuy = confirm(`Buy ${bundleName} for ${price}?`);
  if (!confirmBuy) return;

  try {
    const res = await fetch(`${BACKEND_URL}/api/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bundleName, price })
    });

    const data = await res.json();
    alert(`🎉 Thank you for buying Rotcod Data Bundle!\n\n${data.message}`);
  } catch (err) {
    console.error("Error buying bundle:", err);
    alert("❌ Purchase failed. Please try again.");
  }
}

loadBundles();
