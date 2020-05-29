import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton, Snackbar, Button } from '@material-ui/core';
import * as charactersApi from '../../api/characters';
import { upperFirst, truncate } from '../../utils/common';
import { isNumber, isNull, isNullOrUndefined, isUndefined } from 'util';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../models/IState';
import { buildLevel } from '../../utils/spells';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';
import { EDIT_CHARACTER_PATH, CHARACTERS_PATH } from '../routes/PathConsts';
import ErrorComponent from '../common/ErrorComponent';
import SpellPopover from '../spells/SpellPopover';
import { UPDATE_CHARACTERS } from '../../redux/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: '10px 5% 0px 5%'
    },
    innerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '30px'
    },
    innerContainerRow: {
      display: 'flex',
      flexDirection: 'row'
    },
    innerContainerColumn: {
      display: 'flex',
      flexDirection: 'column'
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
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '5px 0px 5px 0px',
      justifyContent: 'start',
      width: '100%',
    },
    backButton: {
      maxWidth: '100px'
    }
  })
);

export default function FullCharacter() {
  const classes = useStyles();
  const { id } = useParams();
  const parsedId = id !== undefined ? Number.parseInt(id) : null;
  const token = useSelector((state: IState) => {
    return state.token;
  });
  const character = useSelector((state: IState) => {
    return state.characters.find((x) => x.id === parsedId);
  });
  const dispatch = useDispatch();
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
      dispatch({ type: UPDATE_CHARACTERS, payload: result });
    }

    if (result) {
      history.push(CHARACTERS_PATH);
    } else {
      setShowDeletionError(true);
    }
  };

  const handleSpellAdd = async (characterId: number, spellId: number) => {
    if (!isNull(token)) {
      const spellAdded = await charactersApi.addSpellToCharacter({token, characterAndSpellId: {characterId, spellId}});
      if (spellAdded) dispatch({ type: UPDATE_CHARACTERS, payload: true });
    }
  }

  const handleSpellRemove = async (characterId: number, spellId: number) => {
    if (!isNull(token)) {
      const spellRemoved = await charactersApi.removeSpellFromCharacter({token, characterAndSpellId: {characterId, spellId}});
      if (spellRemoved) dispatch({ type: UPDATE_CHARACTERS, payload: true });
    }
  }

  if (isNullOrUndefined(character)) {
    console.log('Error: Character ' + id + ' not found.');
    return <ErrorComponent title="Character not found" message="The one seek could not be found." />;
  }

  const spellPopoverCards = isUndefined(character.spells)
    ? [] 
    : character.spells.map((x) => <SpellPopover key={x.id} spell={x} showSimple={false} handleSpellAdd={handleSpellAdd} handleSpellRemove={handleSpellRemove} />);

  return (
    <div className={classes.container}>
      <Button
        id="Back"
        className={classes.backButton}
        variant="text"
        color="primary"
        onClick={() => { history.goBack() }}
        startIcon={<ArrowBackIcon />}
      >
        Back
      </Button>
      <div className={`${classes.innerContainer} ${classes.innerContainerRow}`}>
        <div className={classes.profileContent}>
          <Typography variant="h1" component="h1">
            {truncate(upperFirst(character.name.toLowerCase()), 15)}
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
      <div className={`${classes.innerContainer} ${classes.innerContainerColumn}`}>
        <Typography variant="h2" component="h2">
          Spells
        </Typography>

        <div className={classes.cardContainer}>{spellPopoverCards}</div>
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
