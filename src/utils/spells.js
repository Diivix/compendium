// @ts-check
import React from 'react';
import { upperFirst, truncate } from './common'

/**
 * @param {number} level - Spell name
 * @param {string} type - Spell class
 * @param {boolean} [truncateValue=true] - truncate value
 */
export const buildLevel = (level, type, truncateValue = true) => {
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

// const BuildZeroLevel = (level, type) => {
//   const spellSchools = [""];

//   if(includes(spellSchools, type)) {
//     return upperFirst(type) + ' cantrip'
//   } 

//   return level + ' level ' + upperFirst(type);
// }

/**
 * @param {string} school - Spell school
 */
export const setSpellIcon = (school) => {
  const iconStyle = { paddingRight: '5px'};

  switch (school) {
    case 'abjuration':
      return <i className="ra ra-level-three-advanced ra-lg" style={iconStyle} />;
    case 'conjuration':
      return <i className="ra ra-blade-bite ra-lg" style={iconStyle} />;
    case 'divination':
      return <i className="ra ra-crystal-ball ra-lg" style={iconStyle} />;
    case 'enchantment':
      return <i className="ra ra-hand ra-lg" style={iconStyle} />;
    case 'evocation':
      return <i className="ra ra-lightning-bolt ra-lg" style={iconStyle} />;
    case 'illusion':
      return <i className="ra ra-burning-eye ra-lg" style={iconStyle} />;
    case 'necromancy':
      return <i className="ra ra-death-skull ra-lg" style={iconStyle} />;
    case 'transmutation':
      return <i className="ra ra-triforce ra-lg" style={iconStyle} />;
    default:
      return <i className="ra ra-dragon-breath ra-lg" style={iconStyle} />;
  }
};
