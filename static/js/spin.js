const roles = [
    '/static/images/jungle.png',
    '/static/images/mid.png',
    '/static/images/exp.png',
    '/static/images/gold.png',
    '/static/images/roam.png'
];

// Function to prevent double images in a row
let lastIndex = -1;

function changeImage() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * roles.length);
    } while (randomIndex === lastIndex);
    lastIndex = randomIndex;
    
    setTimeout(() => {
        $('.role-icons').attr('src', roles[randomIndex]);
    });
}

changeImage(); // Initial call to set the first image and directly loop the animation

setInterval(changeImage, 300); //Change image every 300ms

$('.player-input').on('input', function() {
    if ($(this).val().length > 0) {
        $('.roll-btn').prop('disabled', false);
    } else {
        $('.roll-btn').prop('disabled', true);
    }
});

$('.roll-btn').on('click', function() {
    setInterval(changeImage, 100); //Start changing-images animation every 100ms on button click
});