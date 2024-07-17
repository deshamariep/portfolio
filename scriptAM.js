(function(){
    'use strict';
    console/log('reading js');

    // Get all .card elements
    const cards = document.querySelectorAll('.card');

    // Loop through each card and add click event listener
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            card.classList.toggle('flipped');
        });
    });

    

    

}());