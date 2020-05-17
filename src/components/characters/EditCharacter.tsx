// @ts-check
import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as charactersApi from '../../api/characters';
import { ICharacterBase, ICharacter } from '../../models/ICharacter';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import { isNull, isNumber, isUndefined } from 'util';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import CharacterForm from './CharacterForm';
import Loader from '../common/Loader';
import { CHARACTERS_PATH, NOT_FOUND_PATH } from '../routes/PathConsts';

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
    loader: {
      marginTop: '200px',
    }
  })
);

export default function EditCharacter() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const parsedId = id !== undefined ? Number.parseInt(id) : null
  const token = useSelector((state: IState) => {
    return state.token;
  });
  const character = useSelector((state: IState) => {
    return state.characters.find(x => x.id === parsedId);
  });

  const handleSubmit = async (character: ICharacterBase) => {
    const parsedId = id !== undefined ? Number.parseInt(id) : null;
    
    if (!isNull(token) && !isUndefined(character) && !isUndefined(id) && isNumber(parsedId)) {
      const characterWithId: ICharacter = Object.assign({}, character, { id: parsedId })
      console.log(JSON.stringify(characterWithId));
      const isUpdated = await charactersApi.editCharacter({ token, character: characterWithId });
      if (isUpdated) history.push(CHARACTERS_PATH + '/' + parsedId);
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
