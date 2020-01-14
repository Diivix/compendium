import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import SpellCard from './SpellCard';
import SpellPopover from './SpellPopover';

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

  const popoverCards = mockData.map(x => (
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
  ));

  return <div className={`${classes.container}`}>{popoverCards}</div>;
};
