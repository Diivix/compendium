import React from 'react';
import { upperFirst, truncate } from './common'

export const buildLevel = (level: number, type: string, truncateValue: boolean = true) => {
  let value;
  switch (level) {
    case 0:
      value = upperFirst(type) + ' cantrip';
      break;
    case 1:
      value = level + 'st level ' + upperFirst(type);
      break;
    case 2:
      value = level + 'nd level ' + upperFirst(type);
      break;
    case 3:
      value = level + 'rd level ' + upperFirst(type);
      break;
    default:
      value = level + 'th level ' + upperFirst(type);
      break;
  }

  return (value = truncateValue ? truncate(value, 20) : value);
};

export const setSpellIcon = (school: string) => {
  switch (school) {
    case 'abjuration':
      return <i className="ra ra-level-three-advanced ra-lg" />;
    case 'conjuration':
      return <i className="ra ra-blade-bite ra-lg" />;
    case 'divination':
      return <i className="ra ra-crystal-ball ra-lg" />;
    case 'enchantment':
      return <i className="ra ra-gem-pendant ra-lg" />;
    case 'evocation':
      return <i className="ra ra-lightning-bolt ra-lg" />;
    case 'illusion':
      return <i className="ra ra-burning-eye ra-lg" />;
    case 'necromancy':
      return <i className="ra ra-death-skull ra-lg" />;
    case 'transmutation':
      return <i className="ra ra-triforce ra-lg" />;
    default:
      return <i className="ra ra-dragon-breath ra-lg" />;
  }
};
