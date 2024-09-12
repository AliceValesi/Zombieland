document.querySelector('.reservation-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const sejour = document.getElementById('sejour').value;
    const billets = document.getElementById('billets').value;
    const hotel = document.getElementById('hotel').checked;

    const reservationData = {
        sejour: parseInt(sejour),
        billets: parseInt(billets),
        hotel: hotel
    };

    try {
        const response = await fetch('/make-reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        });

        const result = await response.json();
        if (response.ok) {
            window.location.href = `/confirmation/${result.reservation.id}`;
        } else {
            alert('Erreur lors de la réservation : ' + result.message);
        }
    } catch (error) {
        alert('Erreur lors de la réservation : ' + error.message);
    }
});