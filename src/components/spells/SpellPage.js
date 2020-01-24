import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import SpellMetaLayout from './SpellMetaLayout';
import * as spellsApi from '../../api/spells';
import Loader from '../loader/Loader';
import { upperFirst } from '../../utils/common';
import { setSpellIcon } from '../../utils/spells';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    margin: '20px 10px 0px 10px',
    justifyContent: 'center'
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5%'
  },
  innerContentContainer: {
    display: 'flex'
  },
  contentContainerLeft: {
    display: 'flex'
  },
  contentContainerRight: {
    display: 'flex',
    flexDirection: 'column',
    margin: '-8px 10px 0px 20px'
  },
  title: {
    marginBottom: '20px'
  },
  avatar: {
    color: '#' + process.env.REACT_APP_ACCENT_COLOR,
    fontSize: '3000%',
    zIndex: '-1',
    position: 'absolute',
    display: 'flex',
    alignSelf: 'flex-end',
    opacity: '0.7'
  },
  header: {
    fontSize: '0.7rem',
    color: theme.palette.text.secondary
  },
  secondaryHeader: {
    fontStyle: 'italic',
    fontSize: '0.85rem',
    color: '#' + process.env.REACT_APP_ACCENT_COLOR
  },
  content: {
    fontSize: '1rem',
    marginBottom: '20px'
  },
  secondaryContent: {
    fontStyle: 'italic',
    fontSize: '0.85rem'
  },
  loader: {
    marginTop: '200px'
  }
}));

export default () => {
  const classes = useStyles();
  const [spells, setSpells] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const data = await spellsApi.getSpellsByQuery({ query: { id }, lightlyload: false });
      setSpells(data);
    }

    fetchData();
  }, [id]);

  if (spells !== null && spells.length !== 1) {
    console.log('Error: Number of spells returned is greater than 1.');
    return (
      <Redirect
        to={{
          pathname: '/ErrorNotFound'
        }}
      />
    );
  }

  return (
    <div className={classes.container}>
      {spells == null ? (
        <div className={classes.loader}>
          <Loader />
        </div>
      ) : (
        <div className={classes.contentContainer}>
          <Typography variant="h1" className={classes.title} noWrap>
            {upperFirst(spells[0].name)}
          </Typography>
          <div className={classes.innerContentContainer}>
            <div className={classes.contentContainerLeft}>
              <SpellMetaLayout
                id={spells[0].id}
                name={spells[0].name}
                classTypes={spells[0].classTypes}
                components={spells[0].components}
                level={spells[0].level}
                school={spells[0].school}
                castingTime={spells[0].castingTime}
                range={spells[0].range}
                materials={spells[0].materials}
                duration={spells[0].duration}
              />
            </div>
            <div className={classes.contentContainerRight}>
              <Grid className={classes.gridItem} item xs={8}>
                <Typography variant="h6" className={classes.header} noWrap>
                  DESCRIPTION
                </Typography>
                <Typography className={classes.content}>{spells[0].description}</Typography>
              </Grid>

              <Grid className={classes.gridItem} item xs={8}>
                <Typography variant="h6" className={classes.header} noWrap>
                  AT HIGHER LEVELS
                </Typography>
                <Typography className={classes.content}>{spells[0].atHigherLevels}</Typography>
              </Grid>

              <Grid className={classes.gridItem} item xs={8}>
                <Typography variant="h6" className={classes.header} noWrap>
                  REFERENCE
                </Typography>
                <Typography className={classes.content}>{spells[0].reference}</Typography>
              </Grid>

              <div className={classes.avatar}>
                {setSpellIcon(spells[0].school)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
