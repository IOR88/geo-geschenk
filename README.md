# geo-geschenk

development
    python 3.3 (3.3.6)
    virtualenv NAME -p /path/to/your/python3.3
    pip install -r requirements.txt
    bower install

    configure geo-geschenk-deploy.conf
        set paths for command and directory vars

    configure gunicorn_start.sh
        set paths for FLASKDIR, VENVDIR, GUNICORN (path to your virtualenv gunicorn)

    sudo apt-get install supervisor (handle gunicorn automatication)
    $ sudo cp geo-geschenk-deploy.conf /etc/supervisor/conf.d/

    to stop
    $ sudo supervisorctl stop geo-geschenk-deploy

    $ sudo supervisorctl reread
    -||-                 update
    -||-                 start geo-geschenk-deploy

    run browser on 127.0.0.1:8000



