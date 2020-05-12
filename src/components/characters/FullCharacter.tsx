import React, { useEffect, useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, IconButton, Snackbar } from '@material-ui/core';
import * as charactersApi from '../../api/characters';
import Loader from '../common/Loader';
import { upperFirst, truncate } from '../../utils/common';
import { isNumber, isUndefined, isNull, isNullOrUndefined } from 'util';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import { ICharacter } from '../../models/ICharacter';
import { buildLevel } from '../../utils/spells';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      margin: '20px 10px 0px 10px',
    },
    profile: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginLeft: '5%',
      marginRight: '5%',
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
      // marginBottom: '10px',
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
  const token = useSelector((state: IState) => {
    return state.token;
  });
  const { id } = useParams();
  const history = useHistory();
  const [character, setCharacter] = useState<ICharacter | undefined>(undefined);
  const [showDeletionError, setShowDeletionError] = useState<boolean>(false);

  const icon: JSX.Element = <i className="ra ra-hood ra-5x" />;

  const fetchData = async (token: string, parsedId: number) => {
    const data = await charactersApi.getCharacter({ token, id: parsedId });
    setCharacter(data);
  };

  const editCharacter = async () => {
    history.push('/editcharacter/' + id)
  }

  const deleteCharacter = async () => {
    const parsedId = id !== undefined ? Number.parseInt(id) : null;
    let result = false;
    if (isNumber(parsedId) && !isNull(token)) {
      result = await charactersApi.deleteCharacter({token, id: parsedId});
    }

    if(result) {
      history.push('/characters')
    } else {
      setShowDeletionError(true);
    }
  }

  useEffect(() => {
    const parsedId = id !== undefined ? Number.parseInt(id) : null;
    if (isNumber(parsedId) && !isNull(token)) fetchData(token, parsedId);
  }, [token, id]);

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
    return <Redirect to={{ pathname: '/ErrorNotFound' }} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
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
                <IconButton aria-label="Edit" color="primary" onClick={() => {editCharacter()}}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete" color="primary" onClick={() => {deleteCharacter()}}>
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

        {/* Show error snackbar if needed */}
        <Snackbar open={showDeletionError} autoHideDuration={6000} onClose={() => { setShowDeletionError(false) }}>
        <Alert onClose={() => {setShowDeletionError(false)}} severity="error">
          Could not delete character.
        </Alert>
      </Snackbar>
      </div>
    </div>
  );
};
