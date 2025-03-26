const gallery = document.getElementById("gallery");
const yearLinks = document.querySelectorAll("#year-list a");

const loadImages = (year) => {
  gallery.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const img = document.createElement("img");
    img.src = `images/${year}/${i}.jpg`;
    img.alt = `${year} image ${i}`;
    gallery.appendChild(img);
  }
};

yearLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const year = link.dataset.year;
    loadImages(year);
  });
});

loadImages("2023");