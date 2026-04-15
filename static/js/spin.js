const roles = [
    '/static/images/jungle.png',
    '/static/images/mid.png',
    '/static/images/exp.png',
    '/static/images/gold.png',
    '/static/images/roam.png'
];

// Function to prevent double images in a row
let lastIndex = -1;
let currentTimeout = null;
let speed = 300; // Initial speed of the animation
let isStopping = false;

function changeImage() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * roles.length);
    } while (randomIndex === lastIndex);
    lastIndex = randomIndex;
    $('.role-icons').attr('src', roles[randomIndex]);
}

function animationLoop() {
    changeImage();

    if(isStopping) {
        speed += 100; // Increase the delay to slow down the animation
        if(speed >= 1000) { // Stop the animation after it has slowed down enough
            stopAnimation();
            return;
        }
    }
    currentTimeout = setTimeout(animationLoop, speed);
}

animationLoop(); // Start the animation loop


function validateInput() {
    const playerName = $('.player-input').val().trim();
    if(playerName === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Player Name Required',
            text: "Please enter player's name before rolling.",
            confirmButtonText: 'Copy That'
        });
        return false;
    }
    return true;
}

$(document).ready(function() {
    $('.roll-btn').on('click', function() {
        let btn = $(this);
        if(!validateInput()) {
            return;
        }

        if(!isStopping && speed === 300) {
            // ROLL: Accelerate the animation
            speed = 10;
            btn.text('Stop').css('background-color', 'red');
        } else if(btn.text() === 'Stop') {
            // STOP: Start slowing down the animation
            isStopping = true;
            btn.prop('disabled', true); // Disable the button
            btn.text('Roll').css('background-color', 'gray');
        }
    });
});

function stopAnimation() {
    clearTimeout(currentTimeout); // Stop the animation loop
    isStopping = false;
    speed = 300; // Reset speed for the next spin

    const chosenRole = $('.role-icons').attr('src'); // Get the currently displayed role
    const playerName = $('.player-input').val(); // Get the player's name
    showWinner(chosenRole, playerName); // Show the winner after stopping
}

function showWinner(role, player) {
    const roleName = role.split('/').pop().split('.')[0].toUpperCase(); // Extract role name from the image path
    Swal.fire({
        title: 'Wow!',
        html: `
            <div class="winner-info">
                <p class="winner-text"><strong>${player}</strong>'s assigned role:</p>
                <img src="${role}" class="chosen-role">
                <strong>${roleName}</strong>
            </div>
        `,
        confirmButtonText: 'Nice!',
        customClass: {
            popup: 'winner-popup',
            title: 'winner-title',
            confirmButton: 'winner-btn'
        },
        allowOutsideClick: false,
        allowEscapeKey: false
    });
    animationLoop(); // Restart the animation loop for the next spin
}