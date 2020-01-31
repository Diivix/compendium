import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpellPopover from './SpellPopover';
import * as spellsApi from '../../api/spells';
import Loader from '../common/Loader';
import SearchBar from '../common/SearchBar';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
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
}));

export default () => {
  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await spellsApi.getSpells({ lightlyload: true, limit: process.env.REACT_APP_SPELLS_LIMIT });
      setData(data);
    }

    fetchData();
    // TODO: deep dive into the use of the empty array.
  }, []);

  const popoverCards =
    data !== null
      ? data.map(x => (
          <SpellPopover
            key={x.id}
            id={x.id}
            name={x.name}
            classTypes={x.classTypes}
            components={x.components}
            level={x.level}
            school={x.school}
            castingTime={x.castingTime}
            range={x.range}
            materials={x.materials}
            duration={x.duration}
            showSimple={false}
          />
        ))
      : null;

  return (
    <div className={classes.container}>
      {data == null ? (
        <div className={classes.loader}>
          <Loader />
        </div>
      ) : (
        <div>
          <SearchBar />
          <div className={classes.innerContainer}>{popoverCards}</div>
        </div>
      )}
    </div>
  );
};
