from quart import Quart, jsonify
import logging
from loguru import logger
from models.loguru_logger_setup import AppLogger, InterceptHandler
from routes.book_index import book_index_bp
from routes.book_details import book_details_bp
from routes.shelves_index import shelves_index_bp
from routes.authors_index import authors_index_bp
from routes.kobo_routers import kobo_auth_bp
from routes.settings_routers import settings_bp
from routes.login_router import login_bp
from constants.application_constants import SECRET_KEY
import httpx
import asyncio
import config

app = Quart(__name__)
app.secret_key = SECRET_KEY 

# Set up logging
app_logger = AppLogger("AppLogger", "MyFastAPIApp")
logging.getLogger("uvicorn").handlers = [InterceptHandler()]
logging.getLogger("sqlalchemy.engine").handlers = [InterceptHandler()]

app.register_blueprint(book_index_bp)
app.register_blueprint(shelves_index_bp)
app.register_blueprint(authors_index_bp)
app.register_blueprint(book_details_bp)
app.register_blueprint(kobo_auth_bp)
app.register_blueprint(settings_bp)
app.register_blueprint(login_bp)


logger.info("port from config.py: ", config.PORT)
logger.info("Starting on port: 5656, when running VSCODE, due to launch.json VSCODE")

if __name__ == '__main__':
    app.run(debug=True, port=config.PORT)
