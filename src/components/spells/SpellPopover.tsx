import React, {SyntheticEvent, useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core';
import SpellMetaLayout from './SpellMetaLayout';
import SpellCard from './SpellCard';
import { ISpell } from '../../models/ISpell';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  popover: {
    padding: '10px'
  }
}));

interface IProps {
  spell: ISpell;
  showSimple: boolean;
  // handleSpellAdd: (characterId: number, spellId: number) => void;
  // handleSpellRemove: (characterId: number, spellId: number) => void;
};
export default function SpellPopover(props: IProps) {
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
      <SpellCard name={props.spell.name} level={props.spell.level} school={props.spell.school} handleClick={handleClick} />

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
            spell={props.spell}
            showSimple={props.showSimple}
            // handleSpellAdd={handleSpellAdd}
            // handleSpellRemove={handleSpellRemove}
          />
        </div>
      </Popover>
    </div>
  );
};
