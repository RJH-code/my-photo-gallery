const gallery = document.getElementById("gallery");
const yearLinks = document.querySelectorAll("#year-list a");
const subcategoryList = document.getElementById("subcategory-list");
const subcategoryTitle = document.getElementById("subcategory-title");

// Only list subcategories (no filenames needed!)
const imagesByYear = {
  "2025": { "Germany": true },
  "2024": { "Japan": true },
  "2023": { "Canada": true },
  "2022": { "Australia": true, "Estonia": true },
  "2021": { "Norway": true },
  "2020": { "Spain": true },
  "2019": { "France": true },
  "2018": { "Portugal": true },
  "2017": { "USA": true },
  "2016": { "Mexico": true },
  "2015": { "Thailand": true },
  "2014": { "UK": true },
  "2013": { "Italy": true }
};

let currentYear = "2025";

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

const loadImages = (year, subcategory) => {
  gallery.innerHTML = "<p>Loading images...</p>";

  fetch(`images/${year}/${subcategory}/manifest.txt`)
    .then(response => {
      if (!response.ok) throw new Error("Manifest not found");
      return response.text();
    })
    .then(text => {
      const files = text
        .split("\n")
        .map(line => line.trim())
        .filter(name => name.length > 0); // Ignore empty lines

      gallery.innerHTML = "";

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
    })
    .catch(err => {
      console.error(err);
      gallery.innerHTML = `<p>Could not load images for ${subcategory} in ${year}.</p>`;
    });
};

// Handle year clicks
yearLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const year = link.dataset.year;
    loadSubcategories(year);
  });
});

// Load default year
loadSubcategories(currentYear);
