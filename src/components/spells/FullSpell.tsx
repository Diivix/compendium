import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import SpellMetaLayout from './SpellMetaLayout';
import * as spellsApi from '../../api/spells';
import * as charactersApi from '../../api/characters';
import Loader from '../common/Loader';
import { upperFirst } from '../../utils/common';
import { setSpellIcon } from '../../utils/spells';
import { isNumber, isUndefined, isNull } from 'util';
import { ISpell } from '../../models/ISpell';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../models/IState';
import ErrorComponent from '../common/ErrorComponent';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { UPDATE_CHARACTERS } from '../../redux/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      margin: '10px 5% 0px 5%',
      justifyContent: 'center'
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
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
      margin: '-8px 0px 0px 20px'
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
    },
    backButton: {
      maxWidth: '100px'
    }
  })
);

export default function FullSpell() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: IState) => {
    return state.accessToken;
  });
  const history = useHistory();
  const { id } = useParams();
  const [spell, setSpell] = useState<ISpell | undefined>(undefined);

  const fetchData = async (accessToken: string, parsedId: number) => {
    const data = await spellsApi.getSpell({ accessToken, id: parsedId });
    setSpell(data);
  };

  const handleSpellAdd = async (characterId: number, spellId: number) => {
    if (!isNull(accessToken)) {
      const spellAdded = await charactersApi.addSpellToCharacter({accessToken, characterAndSpellId: {characterId, spellId}});
      if (spellAdded) dispatch({ type: UPDATE_CHARACTERS, payload: true });
    }
  }

  const handleSpellRemove = async (characterId: number, spellId: number) => {
    if (!isNull(accessToken)) {
      const spellRemoved = await charactersApi.removeSpellFromCharacter({accessToken, characterAndSpellId: {characterId, spellId}});
      if (spellRemoved) dispatch({ type: UPDATE_CHARACTERS, payload: true });
    }
  }

  useEffect(() => {
    const parsedId = id !== undefined ? Number.parseInt(id) : null;
    if (isNumber(parsedId) && !isNull(accessToken)) fetchData(accessToken, parsedId);
  }, [accessToken, id]);

  if (isUndefined(spell)) {
    return (
      <div className={classes.container}>
        <div className={classes.loader}>
          <Loader />
        </div>
      </div>
    );
  }

  if (isNull(spell)) {
    return <ErrorComponent title="Spell not found" message="The knowledge you seek could not be found." />
  }

  return (
    <div className={classes.container}>
      <div className={classes.contentContainer}>
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
        <Typography variant="h1" className={classes.title} noWrap>
          {upperFirst(spell.name)}
        </Typography>
        <div className={classes.innerContentContainer}>
          <div className={classes.contentContainerLeft}>
            <SpellMetaLayout spell={spell} showSimple={true} handleSpellAdd={handleSpellAdd} handleSpellRemove={handleSpellRemove} />
          </div>
          <div className={classes.contentContainerRight}>
            <Grid item xs={8}>
              <Typography variant="h6" className={classes.header} noWrap>
                DESCRIPTION
              </Typography>
              <Typography className={classes.content}>{spell.description}</Typography>
            </Grid>

            {isNull(spell.atHigherLevels) ? null : (
              <Grid item xs={8}>
                <Typography variant="h6" className={classes.header} noWrap>
                  AT HIGHER LEVELS
                </Typography>
                <Typography className={classes.content}>{spell.atHigherLevels}</Typography>
              </Grid>
            )}

            <Grid item xs={8}>
              <Typography variant="h6" className={classes.header} noWrap>
                REFERENCE
              </Typography>
              <Typography className={classes.content}>{spell.reference}</Typography>
            </Grid>

            <div className={classes.avatar}>{setSpellIcon(spell.school)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
