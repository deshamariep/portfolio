(function(){
    'use strict';
    console/log('reading js');

    document.addEventListener('DOMContentLoaded', function() {
        // Optional: You can add a class to trigger animation via JavaScript if needed
        // For example, add 'animate' class to each .card
        const cards = document.querySelectorAll('.card');
        cards.forEach(function(card) {
            card.classList.add('animate');
        });
    });

    

    

}());