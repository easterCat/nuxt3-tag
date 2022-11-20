FROM node:16

WORKDIR /root

RUN apt update \ 
    && node -v \ 
    && npm install pm2 -g \ 
    && npm install yarn -g \ 
    && https://github.com/easterCat/stable-diffution-utils-nuxt.git \ 
    && cd stable-diffution-utils-nuxt 

WORKDIR /root/stable-diffusion-webui

RUN yarn \ 
    && yarn -v \ 
    && yarn pm2 

CMD [ "pm2 start app.js", "--skip-torch-cuda-test","--listen" ]
