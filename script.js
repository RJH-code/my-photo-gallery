const gallery = document.getElementById("gallery");
const yearLinks = document.querySelectorAll("#year-list a");

const imagesByYear = {
  "2023": ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"],
  "2022": ["2022.jpg"]
};

const loadImages = (year) => {
  gallery.innerHTML = "";
  const files = imagesByYear[year] || [];

  files.forEach(file => {
    const img = document.createElement("img");
    img.src = `images/${year}/${file}`;
    img.alt = `${year} image`;
    gallery.appendChild(img);
  });
};

yearLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const year = link.dataset.year;
    loadImages(year);
  });
});

loadImages("2023");
