document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/profil';
    } else {
        alert('Erreur de connexion');
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('register-email').value;
    const mot_de_passe = document.getElementById('register-password').value;
    const adresse = document.getElementById('adresse').value;

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, prenom, email, mot_de_passe, adresse })
    });

    if (response.ok) {
        alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        document.getElementById('registerForm').reset();
    } else {
        alert('Erreur lors de l\'inscription');
    }
});