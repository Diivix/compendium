import React, { useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton, Snackbar } from '@material-ui/core';
import * as charactersApi from '../../api/characters';
import { upperFirst, truncate } from '../../utils/common';
import { isNumber, isNull, isNullOrUndefined } from 'util';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import { buildLevel } from '../../utils/spells';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import { EDIT_CHARACTER_PATH, CHARACTERS_PATH, NOT_FOUND_PATH } from '../routes/PathConsts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: '20px 10px 0px 10px',
    },
    innerContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: '5%',
      marginRight: '5%',
      marginBottom: '30px'
    },
    profileAvatar: {
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
      fontSize: '210%',
      display: 'flex',
      opacity: '0.9',
      marginTop: '10px',
    },
    profileContent: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '75%',
      overflowWrap: 'break-word',
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '5px', // Brings it inline with the heading
    },
    subHeader: {
      display: 'flex',
    },
    profileButtonGroup: {
      marginLeft: '20px',
    },
    classAndLevel: {
      fontStyle: 'italic',
      color: '#' + process.env.REACT_APP_ACCENT_COLOR,
      alignSelf: 'center',
    },
    placeholder: {
      color: theme.palette.text.secondary,
    },
    loader: {
      marginTop: '200px',
    },
  })
);

export default () => {
  const classes = useStyles();
  const { id } = useParams();
  const parsedId = id !== undefined ? Number.parseInt(id) : null;
  const token = useSelector((state: IState) => {
    return state.token;
  });

  const character = useSelector((state: IState) => {
    return state.characters.find((x) => x.id === parsedId);
  });

  const history = useHistory();
  const [showDeletionError, setShowDeletionError] = useState<boolean>(false);
  const icon: JSX.Element = <i className="ra ra-hood ra-5x" />;

  const editCharacter = async () => {
    history.push(EDIT_CHARACTER_PATH + '/' + parsedId);
  };

  const deleteCharacter = async () => {
    let result = false;
    if (isNumber(parsedId) && !isNull(token)) {
      result = await charactersApi.deleteCharacter({ token, id: parsedId });
    }

    if (result) {
      history.push(CHARACTERS_PATH);
    } else {
      setShowDeletionError(true);
    }
  };

  if (isNullOrUndefined(character)) {
    console.log('Error: Character ' + id + ' not found.');
    return <Redirect to={{ pathname: NOT_FOUND_PATH }} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.profileContent}>
          <Typography variant="h1" component="h1">
            {truncate(upperFirst(character.name.toLowerCase()), 17)}
          </Typography>

          <div className={classes.profileInfo}>
            <div className={classes.subHeader}>
              <Typography className={classes.classAndLevel} component="p">
                {buildLevel(character.level, character.classType, true)}
              </Typography>
              <div className={classes.profileButtonGroup}>
                <IconButton
                  aria-label="Edit"
                  color="primary"
                  onClick={() => {
                    editCharacter();
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => {
                    deleteCharacter();
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            </div>

            {isNullOrUndefined(character.description) ? (
              <Typography className={classes.placeholder} component="p">
                The tales of {upperFirst(character.name)} have not yet been written.
              </Typography>
            ) : (
              <Typography component="p">{character.description}</Typography>
            )}
          </div>
        </div>

        <div className={classes.profileAvatar}>{icon}</div>
      </div>

      {/* SPELLS */}
      <div className={classes.innerContainer}>
        <Typography variant="h2" component="h2">
          Spells
        </Typography>
      </div>

      {/* Show error snackbar if needed */}
      <Snackbar open={showDeletionError} autoHideDuration={6000} onClose={() => { setShowDeletionError(false); }} >
        <Alert onClose={() => { setShowDeletionError(false); }} severity="error">
          Could not delete character.
        </Alert>
      </Snackbar>
    </div>
  );
};
