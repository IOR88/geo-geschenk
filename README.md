# geo-geschenk
about project

# development

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

    configuration-nginx
        in geo-geschenk-nginx.conf change alias for location /static/
        $ sudo cp geo-geschenk-nginx.conf /etc/nginx/sites-available/geo-geschenk.com
        $ sudo ln -s /etc/nginx/sites-available/geo-geschenk.com /etc/nginx/sites-enabled/geo-geschenk.com
        $ sudo nginx -t && sudo service nginx restart


    to stop
    $ sudo supervisorctl stop geo-geschenk-deploy

    $ sudo supervisorctl reread
    -||-                 update
    -||-                 start geo-geschenk-deploy

    for debugging app
    supervisorctl tail geo-geschenk-deploy

    run browser on 127.0.0.1:8000



