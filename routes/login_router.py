from quart import Quart, render_template, redirect, url_for, request, session, jsonify
from quart import Blueprint
import httpx
from constants.application_constants import FASTAPI_URL
import asyncio
from loguru import logger

# Create a Blueprint for the Quart application
login_bp = Blueprint('login_bp', __name__)

# Define the no_proxy dictionary to disable proxies
no_proxy = {
    "http://": None,
    "https://": None,
}

@login_bp.route('/login', methods=['GET', 'POST'])
async def login():
    if request.method == 'POST':
        form = await request.form
        username = form['username']
        password = form['password']
        # Log the form data
        logger.info(f"Login attempt with username: {username}")

        # Authenticate with FastAPI
        try:
            async with httpx.AsyncClient(timeout=10.0, verify=False, proxies=no_proxy) as client:
                response = await client.post(
                    f"{FASTAPI_URL}/users/get_token",
                    data={
                        "username": username,
                        "password": password
                    },
                    headers={
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Origin": "http://127.0.0.1:5656",
                    }
                )
                # Log the response status and body
                logger.info(f"Response status: {response.status_code}")
                logger.info(f"Response body: {response.text}")

                if response.status_code == 200:
                    data = response.json()
                    session['access_token'] = data['access_token']
                    return redirect(url_for('book_index.index'))
                else:
                    return "Login failed", 401
        except httpx.RequestError as exc:
            logger.error(f"Request error: {exc}")
            return "An error occurred", 500
        except asyncio.CancelledError:
            logger.warning("Request was cancelled")
            return "Request was cancelled", 500
        except Exception as e:
            logger.error(f"Exception: {e}")
            return "An error occurred", 500

    return await render_template('login.html')