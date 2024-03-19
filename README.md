## Riskfin Admin Portal Basic Setup

### Install

```sh
npm install
```

### Compile and Hot-Reload for local development

```sh
npm run dev
```

## Riskfin Admin Portal Production Setup

### Install

```sh
npm install
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Host with Nginx

#### Install

```sh
sudo apt install nginx
```

#### Setup config

```sh
sudo vim /etc/nginx/sites-available/riskfin-portal
```

```sh
server {
        listen 80;
        server_name ip_address;

        location / {
                root /home/ubuntu/riskfin-portal/dist;
                try_files $uri $uri/ /index.html;
        }

        location /api/ {
                proxy_pass http://localhost:9000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        location = /favicon.ico {
                return 204;
                access_log off;
                log_not_found off;
        }
}
```

```sh
sudo ln -s /etc/nginx/sites-available/riskfin-portal /etc/nginx/sites-enabled/
```

```sh
sudo systemctl restart nginx
```

#### Add permissions

```sh
sudo chmod o+x /home
sudo chmod o+x /home/ubuntu
sudo chmod o+x /home/ubuntu/riskfin-portal
sudo chmod o+x /home/ubuntu/riskfin-portal/dist
```

## Note

You will need to request an .env file, as well as a bearer token from the lead developer in order for this project to run.
