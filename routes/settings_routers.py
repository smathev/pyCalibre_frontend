from quart import Blueprint, jsonify, render_template

from loguru import logger

# Create a Blueprint for the Quart application
settings_bp= Blueprint('settings_bp', __name__)

# Define the endpoint to serve the HTML page
@settings_bp.route('/settings/<user_id>', methods=['GET'])
async def render_settings_page(user_id):
    logger.info(f"rendering settings page for user")
    return await render_template("settings.html", user_id=user_id)