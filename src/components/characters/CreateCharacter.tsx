// @ts-check
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as charactersApi from '../../api/characters';
import { ICharacterBase } from '../../models/ICharacter';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import { isNull, isNullOrUndefined } from 'util';
import { useHistory } from 'react-router-dom';
import CharacterForm from './CharacterForm';
import { CHARACTERS_PATH } from '../routes/PathConsts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px 10px 0px 10px',
    },
    title: {
      width: '100%',
      marginLeft: '5%'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      zIndex: 1,
    },
    label: {
      marginTop: '30px',
    },
    button: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
  })
);

export default () => {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state: IState) => {
    return state.token;
  });

  const handleSubmit = async (character: ICharacterBase) => {
    if (!isNull(token)) {
      const newCharacter = await charactersApi.createCharacter({ token, character });
      if (!isNullOrUndefined(newCharacter)) history.push(CHARACTERS_PATH + '/' + newCharacter.id);
    }
  };

  const handleCancel = () => {
    history.goBack();
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h1" component="h1" gutterBottom>
          Create a Character
        </Typography>
      </div>

      <CharacterForm submitButtonText="Create Character" handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </div>
  );
};
