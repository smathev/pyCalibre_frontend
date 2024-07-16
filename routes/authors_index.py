from quart import Blueprint, render_template, jsonify
import config
from loguru import logger

authors_index_bp= Blueprint('authors_index', __name__)

@authors_index_bp.route('/authors/')
async def index():
    logger.info('Loading shelves page')
    return await render_template('authors.html', skeleton_loader=config.SKELETON_LOADER_HTML)