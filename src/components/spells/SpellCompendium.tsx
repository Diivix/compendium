import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SpellPopover from './SpellPopover';
import * as spellsApi from '../../api/spells';
import * as charactersApi from '../../api/characters';
import Loader from '../common/Loader';
import { isUndefined, isNull, isNullOrUndefined } from 'util';
import { ISpell } from '../../models/ISpell';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import TagMultiSelect from './TagMultiSelect';
import { ITagOption } from '../../models/ITagOptions';
// import { buildTags } from '../../utils/common';
import { SET_SPELL_FILTERS, UPDATE_CHARACTERS } from '../../redux/types';
import { useDispatch } from 'react-redux';
import ErrorComponent from '../common/ErrorComponent';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '10px 5% 0px 5%'
    },
    controlContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '5px 5px 5px 5px',
      justifyContent: 'space-between',
      width: '100%',
    },
    title: {
      width: '100%',
      marginTop: '20px'
    },
    control: {
      display: 'flex',
      margin: '0 5px 0 5px',
      justifyContent: 'space-around',
    },
    controlMax: {
      width: '100%',
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '5px',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    loader: {
      alignSelf: 'center',
      marginTop: '200px'
    },
  })
);

export default function SpellCompendium() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: IState) => {
    return state.accessToken;
  });
  const spellFilters = useSelector((state: IState) => {
    return state.spellFilters;
  });

  const [spells, setSpells] = useState<ISpell[]>([]);
  const [tags, setTags] = useState<ITagOption[]>([]);
  const [selectedTags] = useState<ITagOption[]>(spellFilters);
  const [useAndOperator] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInError, setIsInError] = useState<boolean>(false);
  const queryLimit = isUndefined(process.env.REACT_APP_RESULTS_LIMIT) ? 20 : Number.parseInt(process.env.REACT_APP_RESULTS_LIMIT);

  const closeTagMultiSelect = async (selectedTags: ITagOption[]) => {
    dispatch({ type: SET_SPELL_FILTERS, payload: selectedTags });

    if (!isNull(accessToken)) {
      const spellData = await spellsApi.getSpellsByQuery({
        accessToken,
        lightlyload: true,
        query: { tags: selectedTags.map(tag => tag.name), useAndOperator },
        limit: selectedTags.length === 0 ? queryLimit : undefined,
      });

      if(!isNullOrUndefined(spellData)) setSpells(spellData);
    }
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
    if (!isNull(accessToken)){
      fetchData(accessToken);
    }

    async function fetchData(accessToken: string) {
      const spellsPromise =
        selectedTags.length === 0
          ? spellsApi.getAllSpells({ accessToken, lightlyload: true, limit: queryLimit })
          : spellsApi.getSpellsByQuery({
              accessToken,
              lightlyload: true,
              query: { tags: selectedTags.map(tag => tag.name), useAndOperator },
              limit: selectedTags.length === 0 ? queryLimit : undefined,
            });
      const filtersPromise = spellsApi.getFilters({ accessToken });
  
      const spellData = await spellsPromise;
      const filtersData = await filtersPromise;
  
      if (isNullOrUndefined(spellData) && isNullOrUndefined(filtersData)) {
        setIsLoading(false);
        setIsInError(true);
      } else {
        setSpells(spellData)
        // setTags(buildTags(filtersData.tags));  
        setTags(filtersData.tags);
        setIsLoading(false);
      }
    }
  }, [accessToken, queryLimit, useAndOperator, selectedTags]);

  let popoverCards: JSX.Element[] = [];
  if(!isNullOrUndefined(spells)) {
    popoverCards = spells.map((x) => 
      <SpellPopover key={x.id} spell={x} showSimple={false} handleSpellAdd={handleSpellAdd} handleSpellRemove={handleSpellRemove} />);
  } else {
    setIsInError(true);
  }

  if (isLoading) {
    return (
    <div className={classes.container}>
      <div className={classes.loader}>
        <Loader />
      </div>
    </div>
    );
  }

  if (isInError) {
    return (
    <div className={classes.container}>
      <ErrorComponent title="The compendium of spells is not available" message="The spells could not be loaded." />
    </div>
    );
  }

  return (
    <div className={classes.container}>
      {/* TODO: Decide if there should be a heading here? */}
      {/* <div className={classes.title}>
        <Typography variant="h1" component="h1" gutterBottom>
          Spells
        </Typography>
      </div> */}
      <div className={classes.controlContainer}>
        <TagMultiSelect
          className={`${classes.control} ${classes.controlMax}`}
          options={tags}
          selectedOptions={isNull(selectedTags) ? [] : selectedTags}
          onClose={closeTagMultiSelect}
        />
      </div>
      <div className={classes.cardContainer}>{popoverCards}</div>
    </div>
  );
};
