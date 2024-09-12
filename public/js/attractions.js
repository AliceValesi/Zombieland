// Gestion des diaporamas multiples
const slideIndices = {
    'dead-encounter': 0,
    'feast-of-shadows': 0,
    'undead-plunge': 0,
    'zombie-parade': 0,
    'zombie-thrill': 0
};

function plusSlides(n, diaporama) {
    slideIndices[diaporama] += n;
    showSlides(slideIndices[diaporama], diaporama);
}

function showSlides(index, diaporama) {
    let slides = document.querySelectorAll(`.${diaporama}`);
    if (index >= slides.length) {
        slideIndices[diaporama] = 0;
    }
    if (index < 0) {
        slideIndices[diaporama] = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    slides[slideIndices[diaporama]].style.display = 'block';
}

// Initialisation des diaporamas
Object.keys(slideIndices).forEach(diaporama => {
    showSlides(0, diaporama);
});

// Filtrage des attractions par catégorie
function filterAttractions(category) {
    const attractions = document.querySelectorAll('.attraction');

    attractions.forEach(attraction => {
        if (category === 'all' || attraction.classList.contains(category)) {
            attraction.style.display = 'block';
        } else {
            attraction.style.display = 'none';
        }
    });
}

// Recherche par tags ou noms
document.getElementById('search').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const attractions = document.querySelectorAll('.attraction');

    attractions.forEach(attraction => {
        const tags = attraction.querySelector('.tags').textContent.toLowerCase();
        const title = attraction.querySelector('h2').textContent.toLowerCase();

        if (tags.includes(query) || title.includes(query)) {
            attraction.style.display = 'block';
        } else {
            attraction.style.display = 'none';
        }
    });
});

// Menu hamburger pour les écrans mobiles
document.getElementById('hamburger').addEventListener('click', function () {
    document.getElementById('nav-links').classList.toggle('show-nav');
});
