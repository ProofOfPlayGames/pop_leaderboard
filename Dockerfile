FROM node:21
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
#RUN npm update
#RUN npm install -g n@latest
RUN npm install -g @angular/cli
#RUN npm fund
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 80
CMD [ "./execs/buildAndRun.sh" ]
