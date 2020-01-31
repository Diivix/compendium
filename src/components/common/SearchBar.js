import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Chip, Checkbox, FormControl, ListItemText, MenuItem, InputLabel, Input, Select } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(tag, tagName, theme) {
  return {
    fontWeight: tagName.indexOf(tag) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

function isChecked(tag, tagName) {
  if(tagName) {
    return tagName.indexOf(tag) !== -1;
  }

  return false;
}

const tags = [
  'castingtime-action',
  'castingtime-bonus_action',
  'castingtime-long_duration',
  'castingtime-short_duration',
  'classtype-bard',
  'classtype-cleric',
  'classtype-druid',
  'classtype-paladin',
  'classtype-ranger',
  'classtype-sorcerer',
  'classtype-warlock',
  'classtype-wizard',
  'component-material',
  'component-somatic',
  'component-verbal',
  'duration-concentration',
  'duration-instantaneous',
  'duration-long_duration',
  'duration-short_duration',
  'duration-until_dispelled',
  'level-cantrip',
  'level-high_level',
  'level-low_level',
  'level-mid_level',
  'range-ranged',
  'range-self',
  'range-touch',
  'reference-ee_players_companion',
  'reference-players_handbook',
  'reference-unknown_book',
  'reference-xanathars_guide',
  'school-abjuration',
  'school-conjuration',
  'school-divination',
  'school-enchantment',
  'school-evocation',
  'school-illusion',
  'school-necromancy',
  'school-transmutation'
];

export default () => {
  // @ts-ignore
  const classes = useStyles();
  const theme = useTheme();
  const [tagName, setTagName] = React.useState([]);

  const handleChange = event => {
    setTagName(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="tags-multiple-chip-label"
          id="tags-multiple-chip"
          multiple
          value={tagName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} variant="outlined" size="small" />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {tags.map(tag => (
            <MenuItem key={tag} value={tag} style={getStyles(tag, tagName, theme)}>
              <Checkbox checked={tagName.indexOf(tag) !== -1} value={tag} inputProps={{ 'aria-label': 'primary checkbox' }} />
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
