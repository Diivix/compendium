import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SpellPopover from './SpellPopover';
import * as spellsApi from '../../api/spells';
import Loader from '../common/Loader';
import { isUndefined, isNull } from 'util';
import { ISpell } from '../../models/ISpell';
import { useSelector } from 'react-redux'
import { IState } from '../../models/IState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center'
    },
    innerContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '20px 10px 0px 10px',
      justifyContent: 'center'
    },
    loader: {
      marginTop: '200px'
    }
  })
);

export default () => {
  const classes = useStyles();
  const [spells, setSpells] = useState<ISpell[] | null>(null);
  const token = useSelector((state: IState) => { return state.token });

  const fetchData = async (token: string) => {
    const limit = isUndefined(process.env.REACT_APP_RESULTS_LIMIT) ? 20 : Number.parseInt(process.env.REACT_APP_RESULTS_LIMIT);
    const data = await spellsApi.getSpells({ token, lightlyload: true, limit });
    setSpells(data);
  };

  useEffect(() => {
    if(!isNull(token)) fetchData(token);
    // TODO: deep dive into the use of the empty array.
  }, []);

  const popoverCards =
    isNull(spells) 
    ? null
    : spells.map(x => (
      <SpellPopover
        key={x.id}
        spell={x}
        showSimple={false}
      />
    ));

  return (
    <div className={classes.container}>
      {isNull(spells) ? (
        <div className={classes.loader}>
          <Loader />
        </div>
      ) : (
        <div>
          <div className={classes.innerContainer}>{popoverCards}</div>
        </div>
      )}
    </div>
  );
};
