from flask import Flask, request, jsonify
from flask import render_template
from upload_service import UploadService

import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)


@app.route('/', methods=['GET'])
def main():
    return render_template('base.html')


@app.route('/upload', methods=['POST'])
def upload():

    try:
        res = UploadService(request).response()
        print(res)
        res = {'status': 200, 'data': res}
    except Exception as e:
        print(e)
        res = {'status': 401, 'data': []}

    return jsonify(res)

if __name__ == '__main__':
    handler = RotatingFileHandler('logs/flask-logs.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.run()