// @ts-check
import _ from 'lodash';
import React from 'react';
import styles from './SpellMetaLayout-Styles';
import { buildLevel } from '../../utils/spells';

/**
 * @typedef {object} spell - A spell.
 * @prop {string} name
 * @prop {string} classTypes
 * @prop {string} components
 * @prop {string} school
 * @prop {number} level
 * @prop {string} castingTime
 * @prop {string} range
 * @prop {string} materials
 * @prop {string} duration
 */
/** @type {spell} */
export default (spell) => {
  // @ts-ignore
  const classes = styles();
  const levelWithSchool = buildLevel(spell.level, spell.school, false);
  const components = spell.components.map(component => _.upperCase(component)).join(', ');
  const classTypes = spell.classTypes.map(clss => _.capitalize(clss)).join(' · ');
  const castingTime = spell.castingTime;
  const range = spell.range;
  const duration = spell.duration;

  let materialElement = <div />;
  if (!_.isEmpty(spell.materials)) {
    materialElement = (
      <div className="row">
        <div className="col">
          <p className="center">
            <i>{_.upperFirst(spell.materials)}.</i>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div></div>
  );
};
