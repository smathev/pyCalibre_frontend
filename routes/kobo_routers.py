from quart import Blueprint, jsonify, render_template

from loguru import logger

# Create a Blueprint for the Quart application
kobo_auth_bp = Blueprint('kobo_auth_bp', __name__)

# Define the endpoint to serve the HTML page
@kobo_auth_bp.route('/kobo/generate_auth_token/<int:user_id>', methods=['GET'])
async def generate_auth_token_page(user_id):
    logger.info(f"Generating Kobo Auth URL for user_id: {user_id}")
    return await render_template("generate_kobo_auth_url.html", user_id=user_id)
