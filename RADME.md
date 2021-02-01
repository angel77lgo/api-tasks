# Api Project

Esto es una API REST de un CRUD de tareas en un proyecto, usando NodeJS con TypeScript y una base
de datos en MongoDB

### Configuración de un entorno local

#### Instalación de NodeJS

##### Windows:
Se tiene que ir a [NodeJS Descargas](https://nodejs.org/es/download/) descargar el instalador para
Windows y ejecutarlo, con esto ya NodeJS estara instalado.

##### Ubuntu:
Para instalar en Ubuntu, solo se deben ejecutar estos comandos en la terminal
```shell
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Instalación de Docker y Docker Compose

##### Windows:
Para instalar Docker basta con ir a [Docker For Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows) 
bajar el instalador y ejecutarlo, con esto Docker estará instalado, en este mismo instalador 
ya viene integrado Docker Compose

#### Ubuntu:

Debe actualizar los repositorios e instalar los paquetes necesarios para el uso de docker:

```shell
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
```

Agregar docker a los repositorios oficiales.

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add 

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

Por ultimo solo debe instalar Docker

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Para que docker funcione sin necesidad ejecutarse con sudo debe usar el siguiente comando y reiniciar su PC.

```bash
 sudo usermod -aG docker <your-user>
```

Para docker compose ejecuta estos comandos:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

### Ejecución del proyecto

Para poder ejecutar el proyecto, primero tenemos que crear una instancia de base de datos, en este 
caso es de Mongo DB.

Para crear la instancia de MongoDB solo ejecute:

```bash
docker run -p 27017:27017 --name mongo -d mongo:latest
```
Cómo el proyecto está construido con TypeScript, primero se tiene que transformar a JavaScript, ya que
este es el lenguaje que entiendo NodeJS, para transformarlo solo que hay que hacer lo siguiente:

```bash
tsc
```
El comando anterior convierte todo el código a JavaScript, pero cada vez que se haga un cambio no
se verá reflejado, se tendría que ejecutar de nuevo el comando, para evitar eso, solo debe ejecutar:

```bash
npm run build
```
Este comando estará escuchando todos los cambios que se hagan en TypeScript y automáticamente lo 
transformará en JavaScript, pero esto no ejecuta el servidor, solo transforma de TypeScrip a JavaScript
para poder ejecutar el servidor solo escribe en la terminal

```bash
npm run dev
```

La aplicación estará corriendo en el puerto 5000 [API Project](http://localhost:5000)

También puede ejecutar el script **start.sh**

#### Con Docker

Para poder ejecutar toda la aplicación en Docker debe ejecutar estos comandos:

```bash
docker-compose build
```

```bash
docker-compose up -d
```

Al ejecutar estos comandos la aplicación tambíen correra en [Localhost](http://localhost:5000)

### Documentación de API

La Documentación de la API fue construida con Swagger,

Se puede checar en el path: **'/apidocs'**
