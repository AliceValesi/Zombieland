// Définir le premier index du diaporama
var slideIndex = 0;
showSlides(); // Commencer le diaporama automatiquement

// Avancer/reculer dans le diaporama
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Aller directement à une diapositive spécifique
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Gérer l'affichage des diapositives
function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides"); // Toutes les diapositives
  var dots = document.getElementsByClassName("dot"); // Tous les points de navigation

  // Masquer toutes les diapositives
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"; 
  }

  // Passer à la diapositive suivante
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1; // Revenir à la première diapositive
  }

  // Afficher la diapositive actuelle
  slides[slideIndex - 1].style.display = "block";

  // Désactiver tous les points actifs
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Activer le point correspondant à la diapositive actuelle
  dots[slideIndex - 1].className += " active";

  // Changer d'image toutes les 7 secondes
  setTimeout(showSlides, 7000);
}

// Ajouter une animation au bouton "Réservez ici" lors du clic
document.getElementById('reserveButton').addEventListener('click', function () {
  this.classList.add('animate__animated', 'animate__jello'); // Ajout d'une classe d'animation
  // Retirer l'animation après 1 seconde
  setTimeout(() => {
    this.classList.remove('animate__animated', 'animate__jello');
  }, 1000);
});

// Gérer l'affichage du menu hamburger lors du clic
document.getElementById('hamburger').addEventListener('click', function () {
  // Alterner entre montrer et cacher le menu
  document.getElementById('nav-links').classList.toggle('show-nav');
});
