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
import { ITagOptions } from '../../models/ITagOptions';
import { buildTags } from '../../utils/common';

interface IOwnState {
  spells: ISpell[] | null;
  tags: ITagOptions[] | null;
  selectedTags: string[];
  andOperator: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center'
    },
    innerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '10px 10px 10px 10px',
      justifyContent: 'center',
      width: '100%'
    },
    controlContainer: {
      display: 'flex',
      flexDirection: 'row',
      margin: '5px 5px 5px 5px',
      justifyContent: 'space-between',
      width: '100%'
    },
    control: {
      display: 'flex',
      margin: '0 5px 0 5px',
      justifyContent: 'space-around'
    },
    controlMax: {
      width: '100%'
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '5px 10px 0px 10px',
      justifyContent: 'space-between',
      width: '100%'
    },
    loader: {
      marginTop: '200px'
    }
  })
);

export default () => {
  const classes = useStyles();
  const [state, setState] = useState<IOwnState>({ spells: null, tags: null, selectedTags: [], andOperator: true });
  const queryLimit = isUndefined(process.env.REACT_APP_RESULTS_LIMIT) ? 20 : Number.parseInt(process.env.REACT_APP_RESULTS_LIMIT);
  const token = useSelector((state: IState) => {
    return state.token;
  });

  const fetchInitialData = async (token: string) => {
    const spellsPromise = spellsApi.getSpells({ token, lightlyload: true, limit: queryLimit });
    const filtersPromise = spellsApi.getFilters({ token });

    const spellData = await spellsPromise;
    const filtersData = await filtersPromise;

    const tagsData = buildTags(filtersData.tags);

    setState({ ...state, spells: spellData, tags: tagsData });
  };

  const getSpellsByQuery = async (token: string, tags: string[]) => {
    const limit = tags.length === 0 ? queryLimit : undefined;
    // TODO: Remove hard coding of AND value
    const spellsData = await spellsApi.getSpellsByQuery({
      token,
      lightlyload: true,
      query: { tags, operatorAnd: state.andOperator },
      limit
    });
    setState({ ...state, spells: spellsData});
  };

  const closeTagMultiSelect = (selectedTags: ITagOptions[]) => {
    const tags = selectedTags.map(tag => tag.id);
    if (!isNull(token)) getSpellsByQuery(token, tags);
  };

  useEffect(() => {
    if (!isNull(token)) fetchInitialData(token);
    // TODO: deep dive into the use of the empty array.
  }, []);

  const popoverCards = isNull(state.spells) ? null : state.spells.map(x => <SpellPopover key={x.id} spell={x} showSimple={false} />);

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.controlContainer}>
          <TagMultiSelect
            className={`${classes.control} ${classes.controlMax}`}
            options={isNull(state.tags) ? [] : state.tags}
            onClose={closeTagMultiSelect}
          />
        </div>
        {isNull(state.spells) ? (
          <div className={classes.loader}>
            <Loader />
          </div>
        ) : (
          <div className={classes.cardContainer}>{popoverCards}</div>
        )}
      </div>
    </div>
  );
};
