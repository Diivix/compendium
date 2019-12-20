import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerMargin: {
    marginTop: '150px'
  }
}));

function SpellCompendium() {
  const classes = useStyles();
  return (
    <div className={`${classes.container} ${classes.headerMargin}`}>
      <h1>Spells Compendium not implemented.</h1>
    </div>
  );
}

export default SpellCompendium;
