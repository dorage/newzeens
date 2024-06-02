#! /usr/bin/bash

# setup nginx configuration file

cp ./api.maillist.site /etc/nginx/sites-available/api.maillist.site

sudo ln -s /etc/nginx/sites-available/api.maillist.site /etc/nginx/sites-enabled/api.maillist.site

sudo systemctl restart nginx


