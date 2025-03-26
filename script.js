const gallery = document.getElementById("gallery");
const yearLinks = document.querySelectorAll("#year-list a");
const subcategoryList = document.getElementById("subcategory-list");
const subcategoryTitle = document.getElementById("subcategory-title");

// Images organized by year -> subcategory -> files
const imagesByYear = {
  "2025": {
    "Australia": ["1.jpg", "2.jpg"],
    "Estonia": ["1.jpg"]
  },
  "2024": {
    "Japan": ["1.jpg"],
    "Norway": ["1.jpg", "2.jpg", "3.jpg"]
  },
  "2023": {
    "Canada": ["1.jpg"]
  }
  // Add more years/subcategories here...
};

let currentYear = "2025"; // Default

const loadSubcategories = (year) => {
  currentYear = year;
  const subcategories = Object.keys(imagesByYear[year] || {});
  subcategoryList.innerHTML = "";
  subcategoryTitle.style.display = subcategories.length ? "block" : "none";

  subcategories.forEach(sub => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = sub;
    a.dataset.sub = sub;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      loadImages(year, sub);
    });
    li.appendChild(a);
    subcategoryList.appendChild(li);
  });

  gallery.innerHTML = "<p>Select a place to view photos.</p>";
};

const loadImages = (year, subcategory) => {
  gallery.innerHTML = "";
  const files = (imagesByYear[year] && imagesByYear[year][subcategory]) || [];

  if (!files.length) {
    gallery.innerHTML = `<p>No images found for ${subcategory} in ${year}.</p>`;
    return;
  }

  files.forEach((file, index) => {
    const img = document.createElement("img");
    img.src = `images/${year}/${subcategory}/${file}`;
    img.alt = `${year} ${subcategory} image ${index + 1}`;
    gallery.appendChild(img);
  });
};

yearLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const year = link.dataset.year;
    loadSubcategories(year);
  });
});

// Load default year’s subcategories
loadSubcategories(currentYear);
