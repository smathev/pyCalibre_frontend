# config.py
import os
SKELETON_LOADER_HTML = """
<div class="col-md-2">
    <div class="card">
        <div class="card-body">
            <div class="skeleton-loader mb-3"></div>
            <div class="skeleton-loader"></div>
            <div class="skeleton-loader mt-2"></div>
        </div>
    </div>
</div>
"""

# Google Metadata API key:
GOOGLE_METADATA_API_KEY="AIzaSyA91ii_yeaGl6IBLCVi-H0NJZXc6eF7RwI"
# Google METADATA URL
GOOGLE_METADATA_BASE_URL="https://www.googleapis.com/books/v1/volumes"

GOOGLE_API_KEY="AIzaSyA91ii_yeaGl6IBLCVi-H0NJZXc6eF7RwI"

GOOGLE_CUSTOM_SEARCH_ENGINE_ID="84e5468253d704ed0"


# Log level
LOG_LEVEL = 'DEBUG'

#Set PortNumber
PORT = '5656'


import os

FASTAPI_URL = os.getenv('FASTAPI_URL', 'http://localhost:8000')
FLASK_URL = os.getenv('FLASK_URL', 'http://localhost:5000')