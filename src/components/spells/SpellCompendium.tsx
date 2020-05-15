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
import { buildTags } from '../../utils/common';
import { SET_SPELL_FILTERS, SET_CHARACTERS_STATE } from '../../redux/types';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    innerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '10px 10px 10px 10px',
      justifyContent: 'center',
      width: '100%',
    },
    controlContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '5px 5px 5px 5px',
      justifyContent: 'space-between',
      width: '100%',
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
      margin: '5px 10px 0px 10px',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    loader: {
      marginTop: '200px',
    },
  })
);

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state: IState) => {
    return state.token;
  });
  const spellFilters = useSelector((state: IState) => {
    return state.spellFilters;
  });

  const [spells, setSpells] = useState<ISpell[]>([]);
  const [tags, setTags] = useState<ITagOption[]>([]);
  const [selectedTags] = useState<ITagOption[]>(spellFilters);
  const [andOperator] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInError, setIsInError] = useState<boolean>(false);
  const queryLimit = isUndefined(process.env.REACT_APP_RESULTS_LIMIT) ? 20 : Number.parseInt(process.env.REACT_APP_RESULTS_LIMIT);

  const closeTagMultiSelect = async (selectedTags: ITagOption[]) => {
    dispatch({ type: SET_SPELL_FILTERS, payload: selectedTags });

    if(!isNull(token)) {
      const spellData = await spellsApi.getSpellsByQuery({
        token,
        lightlyload: true,
        query: { tags: selectedTags.map(tag => tag.id), operatorAnd: andOperator },
        limit: selectedTags.length === 0 ? queryLimit : undefined,
      });

      setSpells(spellData);
    }
  };

  const handleSpellAdd = async (characterId: number, spellId: number) => {
    if(!isNull(token)) {
      const spellAdded = await charactersApi.addSpellToCharacter({token, characterAndSpellId: {characterId, spellId}});
      if(spellAdded) dispatch({ type: SET_CHARACTERS_STATE, payload: true });
    }
  }

  const handleSpellRemove = async (characterId: number, spellId: number) => {
    if(!isNull(token)) {
      const spellRemoved = await charactersApi.removeSpellFromCharacter({token, characterAndSpellId: {characterId, spellId}});
      if(spellRemoved) dispatch({ type: SET_CHARACTERS_STATE, payload: true });
    }
  }

  useEffect(() => {
    if (!isNull(token)){
      fetchData(token);
    }

    async function fetchData(token: string) {
      const spellsPromise =
        selectedTags.length === 0
          ? spellsApi.getSpells({ token, lightlyload: true, limit: queryLimit })
          : spellsApi.getSpellsByQuery({
              token,
              lightlyload: true,
              query: { tags: selectedTags.map(tag => tag.id), operatorAnd: andOperator },
              limit: selectedTags.length === 0 ? queryLimit : undefined,
            });
      const filtersPromise = spellsApi.getFilters({ token });
  
      const spellData = await spellsPromise;
      const filtersData = await filtersPromise;
  
      if(isNullOrUndefined(spellData) && isNullOrUndefined(filtersData)) {
        setIsLoading(false);
        setIsInError(true);
      } else {
        setSpells(spellData)
        setTags(buildTags(filtersData.tags));  
        setIsLoading(false);
      }
    }
  }, [token, queryLimit, andOperator, selectedTags]);

  const popoverCards = spells.map((x) => <SpellPopover key={x.id} spell={x} showSimple={false} handleSpellAdd={handleSpellAdd} handleSpellRemove={handleSpellRemove} />);

  if(isLoading) {
    return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.loader}>
          <Loader />
        </div>
      </div>
    </div>
    );
  }

  if(isInError) {
    return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.loader}>
          Error
        </div>
      </div>
    </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
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
    </div>
  );
};
