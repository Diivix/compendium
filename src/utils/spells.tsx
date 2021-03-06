import React from 'react';
import { upperFirst, truncate } from './common'

export const buildLevel = (level: number, types: string[], truncateValue: boolean = true) => {
  let value;
  var upperTypes =  types.map(x => upperFirst(x)).join(', ');

  switch (level) {
    case 0:
      value = upperTypes + ' cantrip';
      break;
    case 1:
      value = level + 'st level ' + upperTypes;
      break;
    case 2:
      value = level + 'nd level ' + upperTypes;
      break;
    case 3:
      value = level + 'rd level ' + upperTypes;
      break;
    default:
      value = level + 'th level ' + upperTypes;
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
