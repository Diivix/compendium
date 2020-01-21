import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpellPopover from './SpellPopover';
import * as spellsApi from '../../api/spells';
import Loader from '../loader/Loader';

const mockData = [
  {
    id: 1,
    name: 'Fire Bolt',
    classTypes: ['cleric', 'ranger'],
    components: ['v', 's'],
    school: 'destruction',
    level: 0,
    castingTime: '1 Action',
    range: '300 feet',
    materials: 'A piece of silver',
    duration: 'Instant'
  },
  {
    id: 2,
    name: 'Lightning Bolt',
    classTypes: ['cleric', 'ranger'],
    components: ['v', 's'],
    school: 'destruction',
    level: 1,
    castingTime: '1 Action',
    range: '300 feet',
    materials: 'A piece of silver',
    duration: 'Instant'
  },
  {
    id: 3,
    name: 'Ice Bolt',
    classTypes: ['cleric', 'ranger'],
    components: ['v', 's'],
    school: 'destruction',
    level: 2,
    castingTime: '1 Action',
    range: '300 feet',
    materials: 'A piece of silver',
    duration: 'Instant'
  }
];

const useStyles = makeStyles(theme => ({
  container: {
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
            name={x.name}
            classTypes={x.classTypes}
            components={x.components}
            level={x.level}
            school={x.school}
            castingTime={x.castingTime}
            range={x.range}
            material={x.material}
            duration={x.duration}
          />
        ))
      : null;

  return <div className={classes.container}>
      {data == null ? <div className={classes.loader}><Loader /></div> : popoverCards}
    </div>;
};
