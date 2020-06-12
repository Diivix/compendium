// @ts-check
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as charactersApi from '../../api/characters';
import { ICharacterBase } from '../../models/ICharacter';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../models/IState';
import { isNull, isNullOrUndefined } from 'util';
import { useHistory } from 'react-router-dom';
import CharacterForm from './CharacterForm';
import { CHARACTERS_PATH } from '../routes/Paths';
import { UPDATE_CHARACTERS } from '../../redux/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0px 5% 0px 5%',
    },
    title: {
      width: '100%',
      marginTop: '20px'
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

export default function CreateCharacter() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: IState) => {
    return state.accessToken;
  });

  const handleSubmit = async (character: ICharacterBase) => {
    if (!isNull(accessToken)) {
      const newCharacter = await charactersApi.createCharacter({ accessToken, character });
      if(!isNullOrUndefined(newCharacter)) {
        dispatch({ type: UPDATE_CHARACTERS, payload: true });
        history.push(CHARACTERS_PATH + '/' + newCharacter.id);
      }
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
