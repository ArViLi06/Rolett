import random
from flask import Blueprint, render_template

spin_bp = Blueprint('spin', __name__)

@spin_bp.route('/spin')
def spin():
    # List of images
    images = ['jungle','exp','gold','mid','roam']

    # Randomly select an image to display
    init_image = random.choice(images)

    return render_template('spin.html', image=init_image)