# excercise-docker-nodejs-dev

In this exercise you should try to get a feeling of how to build and create a Docker container. The main idea with this exercise is to write a Dockerfile that will build a kind of development template for a node.js developer. The project template is located at this repository, to get the files to your exercise repo use the following commands:
```bash
#First navigate to your exercise repository
git remote add docker-nodejs-dev https://github.com/1dv032/exercise-docker-nodejs-dev.git
git subtree add --prefix=docker-nodejs-dev --squash docker-nodejs-dev master
cd docker-nodejs-dev
```
You should now have a folder called docker-nodejs-dev in your exercise repo.
 
You should create a dockerfile that creates a container that can run this project so that a developer just have to build your container and run it with a specific docker run command. See under "docker commands" below...

You are free to form your your dockerfile but:

* The Dockerfile should use the node:6 as a base image.
* The Dockerfile should take this repos node project-template and copy the files into the container at creation.
* The container should expose port 8080 as the port for the node.js web application.

### The node.js platform
You need to know some things about the node.js platform to understand how to build your container. Node.js uses many smaller modules to handle more complex applications. To handle and install all the needed modules you use npm, Node Package Manager. All the node-modules needed for an application is listed in the package.json file. If you look at the template you get in this example you see that there are dependencies to the module "express" which is a web application framework commonly used in node.js web applications. There are also some dev-dependencies which is used only in development mode. Things like test-modules and so on. When you get an empty node-application you first run the command `npm install` (at the same directory as the package.json) and npm will install all the modules.

You can also use the package.json to write smaller script and make npm call them. In the package.json you see that there are one script "start" and one "test". These can be called by the commands `npm start` and `npm test`. These commands are configured for the node.js-application-template.

#### Starting the server with nodemon
The package.json list a devDependencies called [nodemon](https://github.com/remy/nodemon) which helps the developer to restart the node.js app when a change is detected. That is a good thing when writing code, the developer make som change to the files and want to test the program. Nodemon makes that happens automatically. Thats why you see the `nodemon -L --watch src src/index.js` in the start-script in package.json. That is telling nodemon to watch the src-folder and restart if changes are detected. It alson start the application with calling the app in /src/index.js.

This startscript should be called when starting the docker container.

#### Docker commands

Your Dockerfile should be written so you could use commands like this to build and run the container.


```
# Build the Dockerfile (in the same directory) and tag it with the name "thajo/node"
docker build . -t thajo/node

# Run the build container with an interactive terminal
# Mounting the host-folder $PWD/app/ to the container-folder /opt/app - making changes on host appear # in container
# port 80 on host should connect to port 8080 in container
# running the start-script through bin/bash in container (starting the nodemon server - listening for changes)
docker run -i -t -v $PWD/app/:/opt/app/ -p 80:8080 thajo/node /bin/bash /opt/app/script/start.sh

# Just run the tests
docker run -i -t -rm thajo/node /bin/bash /opt/app/script/test.sh
```

### How to do this?
First of all go through the ["Get Started with Docker"](https://docs.docker.com/engine/getstarted/). This will guide your through the installation of Docker and how to start working with it. The ["Learn by example"](https://docs.docker.com/engine/tutorials/#/learn-by-example) is also a good resource to learn more about how Docker works.

#### Article with tips

* http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
* http://paislee.io/the-ultimate-nodejs-development-setup-with-docker/
* https://nodesource.com/blog/8-protips-to-start-killing-it-when-dockerizing-node-js/  

#### Some good commands when learning docker
The more common commands you find in the documentation...Here are some "trick-command" when learning docker. Use with caution since they stop/remove all containers/images.

```
# Stop ALL running containers
docker stop $(docker ps -a -q)

# Remove all build containers
docker rm $(docker ps -a -q)

# Remove all saved images (that is remove base images downloaded and cached)
docker rmi $(docker images -q)

```
