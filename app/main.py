from flask import Flask, request, jsonify
from flask import render_template
from upload_service import UploadService, MongoDBService
from utils import random_charts_generator
from bson.json_util import dumps, loads
import json

import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
doc_session = ''


@app.route('/', methods=['GET'])
def main():
    print(doc_session)
    return render_template('base.html')


@app.route('/upload', methods=['POST'])
def upload():
    global doc_session
    doc_session = random_charts_generator()
    try:
        upload_service = UploadService(request=request, session=doc_session)
        data = upload_service.response()
        res = {'status': 200, 'data': data}
    except Exception as e:
        print(e)
        res = {'status': 401, 'data': []}

    return jsonify(res)


@app.route('/search', methods=['POST'])
def search():
    global doc_session
    try:
        mongo = MongoDBService(port=27017, url='localhost', db='test', collection=doc_session)
        cur = mongo.make_search_query(query=request.get_json()['query'])
        data = [x for x in cur]
        res = {'status': 200, 'data': data}
    except Exception as e:
        print(e)
        res = {'status': 401, 'data': []}
    # TODO ObjectId('56db67c4b260f23c55657f18') is not JSON serializable
    return jsonify(res)

if __name__ == '__main__':
    handler = RotatingFileHandler('logs/flask-logs.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    app.logger.addHandler(handler)
    app.run(port=5002)