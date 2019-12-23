import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpellCard from './SpellCard';

const mockData = [
  {
    name: "Fire Bolt",
    level: 0,
    school: "destruction"
  },
  {
    name: "Lightning Bolt",
    level: 1,
    school: "destruction"
  },
  {
    name: "Ice Bolt",
    level: 2,
    school: "destruction"
  }
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    marginTop: '20px'
  }
}));

export default () => {
  const classes = useStyles();

  const cards = mockData.map(x => <SpellCard key={x.name} name={x.name} level={x.level} school={x.school} />)

  return (
    <div className={`${classes.container}`}>
      {cards}
    </div>
  );
}