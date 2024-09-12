// Simule l'annulation d'une réservation
const cancelButtons = document.querySelectorAll('.cancel-reservation');
cancelButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert("Réservation annulée !");
    });
});

// Fonctionnalité du menu hamburger
document.getElementById('hamburger').addEventListener('click', function () {
    document.getElementById('nav-links').classList.toggle('show-nav');
});
