from quart import Blueprint, render_template, jsonify
import config
from loguru import logger

shelves_index_bp= Blueprint('shelves_index', __name__)

@shelves_index_bp.route('/shelves/')
async def index():
    logger.info('Loading shelves page')
    return await render_template('shelves.html', skeleton_loader=config.SKELETON_LOADER_HTML)