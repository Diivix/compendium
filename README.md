# Compendium

The source of knowledge

## What I was doing

1. Create an edit character page, with its own route.
2. Full characters to be stored in the redux state.
3. Edit character page to get the character from the redux store, if not available load from server.
4. Add an edit character function to the character page.

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

## TODO

- Add omnibar sear to the navigation menu to search for spells and characters.

- Allow spells to be selected/searched by name.
- Allow an AND/OR toggle in the filters mutli-select bar.
- Implement 'sort by' for spells.
- Fix format of spells (css flex-box) when there are an odd number of spells shown.
- Add a back button on the full spell back to return to the Spells Compendium.

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

The knowledge you seek simply does not exist.
