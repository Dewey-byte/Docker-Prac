# Solstice Dock

Original night-harbor cafe page for the Docker 101 hands-on. It is not the Udemy sample app.

The site is static HTML, CSS, and JavaScript. Nginx inside a container serves the files.

## What each Docker piece does

| Piece | Role |
| --- | --- |
| **Dockerfile** | Recipe for the image: start from `nginx:alpine`, copy the site, document port 80 |
| **Image** | Snapshot created by `docker build`. You can run it anywhere Docker is installed |
| **Container** | A running copy of that image |
| **Docker Hub** | Public registry so you (or Play with Docker) can `docker pull` the same image |
| **Public URL** | The container’s port 80 is published, then tunneled or hosted so a browser on the internet can open it |

## Commands used (and why)

Build the image from this folder:

```bash
docker build -t shhhee/solstice-dock:1.0 .
```

`-t` names the image. The `.` is the build context (this directory).

Run it locally and map host port 8080 to container port 80:

```bash
docker run -d -p 8080:80 --name solstice-dock shhhee/solstice-dock:1.0
```

- `-d` runs in the background
- `-p 8080:80` is port publishing (EXPOSE in the Dockerfile only documents the port; `-p` actually opens it)
- Open http://localhost:8080 to verify

Log in and publish the image:

```bash
docker login
docker push shhhee/solstice-dock:1.0
```

On Play with Docker (Section 6 style public access), pull and publish port 80, then open the port badge:

```bash
docker pull shhhee/solstice-dock:1.0
docker run -d -p 80:80 shhhee/solstice-dock:1.0
```
