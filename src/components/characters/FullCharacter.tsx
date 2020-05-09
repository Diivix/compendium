import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import * as characterApi from '../../api/characters';
import Loader from '../common/Loader';
import { upperFirst } from '../../utils/common';
import { isNumber, isUndefined, isNull } from 'util';
import { ISpell } from '../../models/ISpell';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import { ICharacter } from '../../models/ICharacter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      margin: '20px 10px 0px 10px',
      justifyContent: 'center',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '5%',
    },
    innerContentContainer: {
      display: 'flex',
    },
    contentContainerLeft: {
      display: 'flex',
    },
    contentContainerRight: {
      display: 'flex',
      flexDirection: 'column',
      margin: '-8px 10px 0px 20px',
    },
    title: {
      marginBottom: '20px',
    },
    avatar: {
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
      fontSize: '3000%',
      zIndex: -1,
      display: 'flex',
      alignSelf: 'flex-end',
      opacity: '0.6',
      position: 'absolute',
    },
    header: {
      fontSize: '0.7rem',
      color: theme.palette.text.secondary,
    },
    secondaryHeader: {
      fontStyle: 'italic',
      fontSize: '0.85rem',
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
    },
    content: {
      fontSize: '1rem',
      marginBottom: '20px',
    },
    secondaryContent: {
      fontStyle: 'italic',
      fontSize: '0.85rem',
    },
    loader: {
      marginTop: '200px',
    },
  })
);

export default () => {
  const classes = useStyles();
  const token = useSelector((state: IState) => {
    return state.token;
  });
  const { id } = useParams();
  const [character, setCharacter] = useState<ICharacter | undefined>(undefined);
  const icon: JSX.Element = <i className="ra ra-hood ra-5x" />;
  const errorRedirect = <Redirect to={{ pathname: '/ErrorNotFound' }} />;

  const fetchData = async (token: string, parsedId: number) => {
    const data = await characterApi.getCharacter({ token, id: parsedId });
    setCharacter(data);
  };

  useEffect(() => {
    const parsedId = id !== undefined ? Number.parseInt(id) : null;
    if (isNumber(parsedId) && !isNull(token)) fetchData(token, parsedId);
  }, [id]);

  if (isUndefined(character)) {
    return (
      <div className={classes.container}>
        <div className={classes.loader}>
          <Loader />
        </div>
      </div>
    );
  }

  if (isNull(character)) {
    console.log('Error: Character ' + id + ' not found.');
    return errorRedirect;
  }

  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>
        <Typography gutterBottom variant="h1" component="h1">
          {upperFirst(character.name)}
        </Typography>
      </div>

      <div className={classes.avatar}>{icon}</div>
    </div>
  );
};
