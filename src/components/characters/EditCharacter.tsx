// @ts-check
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as charactersApi from '../../api/characters';
import { ICharacterBase, ICharacter } from '../../models/ICharacter';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../models/IState';
import { isNull, isNumber, isUndefined } from 'util';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import CharacterForm from './CharacterForm';
import Loader from '../common/Loader';
import { CHARACTERS_PATH, NOT_FOUND_PATH } from '../routes/Paths';
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
    loader: {
      marginTop: '200px',
    }
  })
);

export default function EditCharacter() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const parsedId = id !== undefined ? Number.parseInt(id) : null
  const accessToken = useSelector((state: IState) => {
    return state.accessToken;
  });
  const character = useSelector((state: IState) => {
    return state.characters.find(x => x.id === parsedId);
  });

  const handleSubmit = async (character: ICharacterBase) => {
    const parsedId = id !== undefined ? Number.parseInt(id) : null;
    
    if (!isNull(accessToken) && !isUndefined(character) && !isUndefined(id) && isNumber(parsedId)) {
      const characterWithId: ICharacter = Object.assign({}, character, { id: parsedId })
      const isUpdated = await charactersApi.updateCharacter({ accessToken, character: characterWithId });
      if (isUpdated) {
        dispatch({ type: UPDATE_CHARACTERS, payload: true });
        history.push(CHARACTERS_PATH + '/' + parsedId);
      }
    }
  };
  
  const handleCancel = () => {
    history.goBack();
  }

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
    return <Redirect to={{ pathname: NOT_FOUND_PATH }} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Typography variant="h1" component="h1" gutterBottom>
          Edit Character
        </Typography>
      </div>

      <CharacterForm character={character} submitButtonText="Update Character" handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </div>
  );
};
