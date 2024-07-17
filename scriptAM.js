(function(){
    'use strict';
    console/log('reading js');

    document.addEventListener('DOMContentLoaded', function() {
        // Select all cards
        const cards = document.querySelectorAll('.card');
        
        // Add the flip class to each card to trigger the flip animation
        cards.forEach(card => {
            card.classList.add('flip');
        });
    });

    const spotsButton = document.getElementById('spots');
    spotsButton.addEventListener('click', function() {
        window.location.href = 'spots.html';
    });

    const gstButton = document.getElementById('gStreet');
    gstButton.addEventListener('click', function() {
        window.location.href = 'gStreet.html';
    });

    const umeButton = document.getElementById('gStreet');
    umeButton.addEventListener('click', function() {
        window.location.href = 'ume.html';
    });

}());