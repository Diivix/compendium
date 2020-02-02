# Compendium

The source of knowledge

## Tutorials

- [Global-state-management-with-react-hooks-and-context](https://dev.to/vanderleisilva/global-state-management-with-react-hooks-and-context-5f6h)
- [Code for the above](https://github.com/vanderleisilva/react-context/blob/master/src)

## Deploying on Docker Locally

### Build and start

``` bash
docker build -t compendium .
docker container create --name compendium -p 80:80 compendium
docker container start compendium
```

### Stop and Remove Container

```bash
docker container stop compendium-api
docker container rm compendium-api
docker image rm compendium-api
```

## Ideas

### Colour pallette

- Black or very dark grey background.
- Gold outlining of components
- Silver for click able components on hover.
- Dark grey for background images.

### Access denied error page

You seek forbidden knowledge. Do not return here.
Show skull in back ground.

### 404 not found page

The knowledge you seek simply does not exist, yet.
