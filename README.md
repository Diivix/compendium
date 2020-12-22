# Compendium

The source of knowledge

## What I was doing

1. Removing Auth to boost up Spell and Items compendium. Will add it back in later.
2. Removing Character feature in favour of focusing on spell and items compendium.
3. Add Apple ID authentication to app, removing TicketboothCore reliance.

---

0. Connecting to CompendiumApiCore.
    - Fixing Spell Filters as selected filters are not appearing on refresh.
    - Characters
        - Deleting spells from characters.
1. Add search functionality to header bar.
2. Fix Loader Components so they are properly centered in pages. I.e. App.
3. Fix Compendium page widths so they are the same.
4. Shrink Filters dropdown to half size.
5. Add better Spells tags/filters. E.g. By what a character class can learn, and D&D Beyond tags.
6. Add sort by functionality to compendiums and character pages.
7. Better loading of large lists of items.
8. Allow spells and pages to be opened in a new window/tab.

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

## Ideas

### Colour pallette

- Black or very dark grey background.
- Gold outlining of components
- Silver for click able components on hover.
- Dark grey for background images.

### D&D Stuff

- Add characters as filter option in spells, showing everything what is available to them. Such as by level, class type, and race.
- Allow spells to be filter on by what they do or do not have advantage on. I.e. radiant spells vs undead.

### Access denied error page

You seek forbidden knowledge. Do not return here.
Show skull in back ground.

### 404 not found page

The knowledge you seek simply does not exist.
