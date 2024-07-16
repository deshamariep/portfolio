(function(){
    'use strict';
    console/log('reading js');


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