import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core';
import SpellMetaLayout from './SpellMetaLayout';
import SpellCard from './SpellCard';

const useStyles = makeStyles(theme => ({
  popover: {
    border: '1px solid',
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.primary.dark,
    padding: '10px'
  }
}));

/**
 * @typedef {object} props - A spell.
 * @prop {number} id
 * @prop {string} name
 * @prop {string[]} classTypes
 * @prop {string[]} components
 * @prop {string} school
 * @prop {number} level
 * @prop {string} castingTime
 * @prop {string} range
 * @prop {string[]} materials
 * @prop {string} duration
 * @prop {boolean} [showSimple]
 */
/** @type {props} */
export default ( {id, name, classTypes, components, school, level, castingTime, range, materials, duration, showSimple = true} ) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {/* Target */}
      <SpellCard key={id} name={name} level={level} school={school} handleClick={handleClick} />

      {/* Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div className={classes.popover}>
          <SpellMetaLayout
            id={id}
            name={name}
            classTypes={classTypes}
            components={components}
            level={level}
            school={school}
            castingTime={castingTime}
            range={range}
            materials={materials}
            duration={duration}
            showSimple={showSimple}
          />
        </div>
      </Popover>
    </div>
  );
};
