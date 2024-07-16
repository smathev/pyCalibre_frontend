from quart import Blueprint, render_template, jsonify, request, redirect, url_for
import time
from loguru import logger

book_details_bp = Blueprint('book_details', __name__)

@book_details_bp.route('/book_details/<id>')
async def book_details(id):
    return await render_template('book_details.html', id=id)