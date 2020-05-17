import React, {SyntheticEvent, useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core';
import SpellMetaLayout from './SpellMetaLayout';
import SpellCard from './SpellCard';
import { ISpell } from '../../models/ISpell';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  popover: {
    border: '1px solid',
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.primary.dark,
    padding: '10px'
  }
}));

interface IProps {
  spell: ISpell;
  showSimple: boolean;
  handleSpellAdd: (characterId: number, spellId: number) => void;
  handleSpellRemove: (characterId: number, spellId: number) => void;
};
export default function SpellPopover({spell, showSimple = true, handleSpellAdd, handleSpellRemove}: IProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<EventTarget & Element | undefined>(undefined);

  const handleClick = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {/* Target */}
      <SpellCard name={spell.name} level={spell.level} school={spell.school} handleClick={handleClick} />

      {/* Popover */}
      <Popover
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
            spell={spell}
            showSimple={showSimple}
            handleSpellAdd={handleSpellAdd}
            handleSpellRemove={handleSpellRemove}
          />
        </div>
      </Popover>
    </div>
  );
};
