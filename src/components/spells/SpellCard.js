// @ts-check

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardActionArea } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { buildLevel, setSpellIcon } from '../../utils/spells';
import { truncate, upperFirst } from '../../utils/common';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: '250px',
    minWidth: '250px',
    margin: '5px',
    border: '1px solid',
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.primary.dark
  },
  avatar: {
    color: '#' + process.env.REACT_APP_ACCENT_COLOR,
    border: '1px solid',
    borderColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.background.default
  }
}));

/**
 * @typedef {object} props
 * @param {string} name - Spell name
 * @param {number} level - Spell level
 * @param {string} school - Spell school
 * @param {function} handleClick - The action to perform when the card is clicked.
 */
/** @type {props} */
export default ({ name, level, school, handleClick }) => {
  // @ts-ignore
  const classes = useStyles();
  const nameTruncated = truncate(upperFirst(String(name).toLowerCase()), 20);
  const meta = buildLevel(level, school, true);
  const icon = setSpellIcon(school);

  const [raised, setRaised] = useState(false);

  const handleRaised = () => {
    setRaised(!raised);
  };

  return (
    <Card className={classes.card} raised={raised} onMouseOver={handleRaised} onMouseOut={handleRaised}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          avatar={
            <Avatar aria-label="Spell" className={classes.avatar}>
              {icon}
            </Avatar>
          }
          title={nameTruncated}
          subheader={meta}
        />
      </CardActionArea>
    </Card>
  );
};
