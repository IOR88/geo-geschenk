#!/bin/bash

NAME="geo-geschenk"
HOST="127.0.0.1:8000"
FLASKDIR=/home/ing/PycharmProjects/geo-geschenk/geo-geschenk/app
VENVDIR=/home/ing/PycharmProjects/geo-geschenk/geo-geschenk/virtualenv
GUNICORN=/home/ing/PycharmProjects/geo-geschenk/geo-geschenk/virtualenv/bin/gunicorn
USER=$USER
NUM_WORKERS=1
FLASK_WSGI_MODULE=wsgi

echo "Starting $NAME"

# activate the virtualenv
cd $VENVDIR
source bin/activate

export PYTHONPATH=$FLASKDIR:$PYTHONPATH

# Start your unicorn
exec ${GUNICORN} ${FLASK_WSGI_MODULE}:app -b ${HOST} \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER \
  --log-level=debug \
  --reload