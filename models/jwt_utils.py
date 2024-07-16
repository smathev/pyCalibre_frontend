from quart import Quart, render_template, redirect, url_for, request, session, jsonify
import httpx
from functools import wraps

from constants.application_constants import FASTAPI_URL 

#secret_key = SECRET_KEY

def token_required(f):
    @wraps(f)
    async def decorated_function(*args, **kwargs):
        token = session.get('access_token')
        if not token:
            return redirect(url_for('login_bp.login'))
        headers = {"Authorization": f"Bearer {token}"}
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{FASTAPI_URL}/protected", headers=headers)
                if response.status_code != 200:
                    return redirect(url_for('login_bp.login'))
                current_user = response.json()
                return await f(current_user, *args, **kwargs)
        except Exception as e:
            return redirect(url_for('login_bp.login'))
    return decorated_function

def admin_required(f):
    @wraps(f)
    async def decorated_function(*args, **kwargs):
        token = session.get('access_token')
        if not token:
            return redirect(url_for('login_bp.login'))
        headers = {"Authorization": f"Bearer {token}"}
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(f"{FASTAPI_URL}/admin", headers=headers)
                if response.status_code != 200:
                    return jsonify({"msg": "Not enough permissions"}), 403
                current_user = response.json()
                return await f(current_user, *args, **kwargs)
        except Exception as e:
            return redirect(url_for('login_bp.login'))
    return decorated_function
