import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SpellPopover from './SpellPopover';
import * as spellsApi from '../../api/spells';
import Loader from '../common/Loader';
import { isUndefined, isNull } from 'util';
import { ISpell } from '../../models/ISpell';
import { useSelector } from 'react-redux';
import { IState } from '../../models/IState';
import TagMultiSelect from './TagMultiSelect';
import { ITagOption } from '../../models/ITagOptions';
import { buildTags } from '../../utils/common';
import { SET_SPELL_FILTERS } from '../../redux/types';
import { useDispatch } from 'react-redux';

interface IOwnState {
  spells: ISpell[];
  tags: ITagOption[];
  selectedTags: ITagOption[];
  andOperator: boolean;
}

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

  const [state, setState] = useState<IOwnState>({ spells: [], tags: [], selectedTags: spellFilters, andOperator: true });
  const queryLimit = isUndefined(process.env.REACT_APP_RESULTS_LIMIT) ? 20 : Number.parseInt(process.env.REACT_APP_RESULTS_LIMIT);

  const fetchInitialData = async (token: string) => {
    const spellsPromise =
      state.selectedTags.length === 0
        ? spellsApi.getSpells({ token, lightlyload: true, limit: queryLimit })
        : spellsApi.getSpellsByQuery({
            token,
            lightlyload: true,
            query: { tags: state.selectedTags.map(tag => tag.id), operatorAnd: state.andOperator },
            limit: state.selectedTags.length === 0 ? queryLimit : undefined,
          });
    const filtersPromise = spellsApi.getFilters({ token });

    const spellData = await spellsPromise;
    const filtersData = await filtersPromise;

    const tagsData = buildTags(filtersData.tags);

    setState({ ...state, spells: spellData, tags: tagsData });
  };

  const closeTagMultiSelect = async (selectedTags: ITagOption[]) => {
    dispatch({ type: SET_SPELL_FILTERS, payload: selectedTags });

    if(!isNull(token)) {
      const spellsData = await spellsApi.getSpellsByQuery({
        token,
        lightlyload: true,
        query: { tags: selectedTags.map(tag => tag.id), operatorAnd: state.andOperator },
        limit: selectedTags.length === 0 ? queryLimit : undefined,
      });

      setState({ ...state, spells: spellsData });
    }
  };

  useEffect(() => {
    if (!isNull(token)) fetchInitialData(token);
    // TODO: deep dive into the use of the empty array.
  }, []);

  const popoverCards = state.spells.map((x) => <SpellPopover key={x.id} spell={x} showSimple={false} />);

  return (
    <div className={classes.container}>
      {/* Only test if tags are empty. The state.spells might be empty from conflicting tags being selected. */}
      { state.tags.length === 0 ? (
        <div className={classes.innerContainer}>
          <div className={classes.loader}>
            <Loader />
          </div>
        </div>
      ) : (
        <div className={classes.innerContainer}>
          <div className={classes.controlContainer}>
            <TagMultiSelect
              className={`${classes.control} ${classes.controlMax}`}
              options={state.tags}
              selectedOptions={isNull(state.selectedTags) ? [] : state.selectedTags}
              onClose={closeTagMultiSelect}
            />
          </div>
          <div className={classes.cardContainer}>{popoverCards}</div>
        </div>
      )}
    </div>
  );
};
