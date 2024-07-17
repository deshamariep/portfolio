(function(){
    'use strict';
    console/log('reading js');

    document.addEventListener('DOMContentLoaded', function() {
        // Select the card
        const card = document.querySelector('.card');
        
        // Add the class to flip to back
        card.classList.add('flip-to-back');
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