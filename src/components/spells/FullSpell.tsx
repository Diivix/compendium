import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import SpellMetaLayout from './SpellMetaLayout';
import * as spellsApi from '../../api/spells';
import Loader from '../common/Loader';
import { upperFirst } from '../../utils/common';
import { setSpellIcon } from '../../utils/spells';
import { isNumber, isUndefined, isNull } from 'util';
import { ISpell } from '../../models/ISpell';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      zIndex: -1,
      display: 'flex',
      alignSelf: 'flex-end',
      opacity: '0.6',
      position: 'absolute'
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
  })
);

export default () => {
  const classes = useStyles();
  const token = useSelector((state: IState) => {
    return state.token;
  });
  const { id } = useParams();
  const [spells, setSpells] = useState<ISpell[] | undefined>(undefined);

  const fetchData = async (token: string, parsedId: number) => {
    const data = await spellsApi.getSpellsByQuery({ token, query: { id: parsedId }, lightlyload: false });
    setSpells(data);
  };

  useEffect(() => {
    const parsedId = id !== undefined ? Number.parseInt(id) : null;
    if (isNumber(parsedId) && !isNull(token)) fetchData(token, parsedId);
  }, [token, id]);

  if (isUndefined(spells)) {
    return (
      <div className={classes.container}>
        <div className={classes.loader}>
          <Loader />
        </div>
      </div>
    );
  }

  if (spells.length !== 1) {
    console.log('Error: Number of spells returned should be one, but ' + spells.length + ' returned.');
    return <Redirect to={{ pathname: '/ErrorNotFound' }} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>
        <Typography variant="h1" className={classes.title} noWrap>
          {upperFirst(spells[0].name)}
        </Typography>
        <div className={classes.innerContentContainer}>
          <div className={classes.contentContainerLeft}>
            <SpellMetaLayout spell={spells[0]} showSimple={true} />
          </div>
          <div className={classes.contentContainerRight}>
            <Grid item xs={8}>
              <Typography variant="h6" className={classes.header} noWrap>
                DESCRIPTION
              </Typography>
              <Typography className={classes.content}>{spells[0].description}</Typography>
            </Grid>

            {isNull(spells[0].atHigherLevels) ? null : (
              <Grid item xs={8}>
                <Typography variant="h6" className={classes.header} noWrap>
                  AT HIGHER LEVELS
                </Typography>
                <Typography className={classes.content}>{spells[0].atHigherLevels}</Typography>
              </Grid>
            )}

            <Grid item xs={8}>
              <Typography variant="h6" className={classes.header} noWrap>
                REFERENCE
              </Typography>
              <Typography className={classes.content}>{spells[0].reference}</Typography>
            </Grid>

            <div className={classes.avatar}>{setSpellIcon(spells[0].school)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
