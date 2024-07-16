from quart import Blueprint, render_template, jsonify
import config
from loguru import logger

book_index_bp= Blueprint('book_index', __name__)

@book_index_bp.route('/library/')
async def index():
    return await render_template('index.html', skeleton_loader=config.SKELETON_LOADER_HTML)

    