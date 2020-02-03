import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SpellPopover from './SpellPopover';
import * as spellsApi from '../../api/spells';
import Loader from '../common/Loader';
import { isUndefined } from 'util';
import { ISpell } from '../../models/ISpell';

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
  const [spells, setSpells] = useState<ISpell[] | undefined>(undefined);

  const fetchData = async () => {
    const limit = isUndefined(process.env.REACT_APP_SPELLS_LIMIT) ? 20 : Number.parseInt(process.env.REACT_APP_SPELLS_LIMIT);
    const data = await spellsApi.getSpells({ lightlyload: true, limit });
    setSpells(data);
  };

  useEffect(() => {
    fetchData();
    // TODO: deep dive into the use of the empty array.
  }, []);

  const popoverCards =
    isUndefined(spells) 
    ? undefined
    : spells.map(x => (
      <SpellPopover
        key={x.id}
        spell={x}
        showSimple={false}
      />
    ));

  return (
    <div className={classes.container}>
      {isUndefined(spells) ? (
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
