const gallery = document.getElementById("gallery");
const yearLinks = document.querySelectorAll("#year-list a");
const subcategoryList = document.getElementById("subcategory-list");
const subcategoryTitle = document.getElementById("subcategory-title");

// Image config: year → place → filenames
const imagesByYear = {
  "2025": {
    "Germany": ["1.jpg"]
  },
  "2024": {
    "Japan": ["1.jpg", "2.jpg"]
  },
  "2023": {
    "Canada": ["1.jpg", "2.jpg", "3.jpg"]
  },
  "2022": {
    "Australia": ["2023.jpg"],
    "Estonia": ["2022.jpg"]
  },
  "2021": {
    "Norway": ["1.jpg"]
  },
  "2020": {
    "Spain": ["1.jpg", "2.jpg"]
  },
  "2019": {
    "France": ["1.jpg"]
  },
  "2018": {
    "Portugal": ["1.jpg", "2.jpg"]
  },
  "2017": {
    "USA": ["1.jpg"]
  },
  "2016": {
    "Mexico": ["1.jpg"]
  },
  "2015": {
    "Thailand": ["1.jpg"]
  },
  "2014": {
    "UK": ["1.jpg"]
  },
  "2013": {
    "Italy": ["1.jpg"]
  }
};

let currentYear = "2025";

// Load list of places when a year is clicked
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

  gallery.innerHTML = subcategories.length
    ? "<p>Select a place to view photos.</p>"
    : `<p>No places listed for ${year} yet.</p>`;
};

// Load and display the images for a place
const loadImages = (year, subcategory) => {
  gallery.innerHTML = "";
  const files = (imagesByYear[year] && imagesByYear[year][subcategory]) || [];

  if (!files.length) {
    gallery.innerHTML = `<p>No images found for ${subcategory} in ${year}.</p>`;
    return;
  }

  files.forEach((file, index) => {
    const link = document.createElement("a");
    link.href = `images/${year}/${subcategory}/${file}`;
    link.setAttribute("data-lightbox", `${year}-${subcategory}`);
    link.setAttribute("data-title", `${subcategory} (${year}) — Image ${index + 1}`);

    const img = document.createElement("img");
    img.src = `images/${year}/${subcategory}/${file}`;
    img.alt = `${subcategory} image ${index + 1}`;

    link.appendChild(img);
    gallery.appendChild(link);
  });
};

// Set up event listeners for year links
yearLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const year = link.dataset.year;
    loadSubcategories(year);
  });
});

// Load default year on page load
loadSubcategories(currentYear);
