FROM node:16

WORKDIR /root

RUN apt update \ 
    && node -v \ 
    && npm install pm2 -g \ 
    && npm install yarn -g \ 
    && https://github.com/easterCat/stable-diffution-utils-project.git \ 
    && cd stable-diffution-utils-project 

WORKDIR /root/stable-diffusion-webui

RUN yarn \ 
    && yarn -v \ 
    && yarn pm2 

CMD [ "npm run pm2", "--skip-torch-cuda-test","--listen" ]
