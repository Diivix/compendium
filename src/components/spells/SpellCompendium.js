import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpellPopover from './SpellPopover';
import * as spellsApi from '../../api/spells';

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
    margin: '20px 10px 0px 10px'
  }
}));

export default () => {
  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await spellsApi.getSpells({ lightlyload: true });
      setData(data);
    }
    fetchData();    
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

  return <div className={`${classes.container}`}>{popoverCards}</div>;
};
