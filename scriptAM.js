(function(){
    'use strict';
    console.log('reading js');

    function updateGreeting() {
        const now = new Date();
        const hours = now.getHours();
        const greetingElement = document.getElementById('greeting');

        let greetingText = "👋 Hey there, good morning!";

        if (hours >= 12 && hours < 18) {
            greetingText = "👋 Hey there, good afternoon!";
        } else if (hours >= 18) {
            greetingText = "👋 Hey there, good evening!";
        }

        greetingElement.textContent = greetingText;
    }

    // Call the function on page load
    updateGreeting();

    

    

}());