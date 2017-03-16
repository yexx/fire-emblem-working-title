// @flow
import React from 'react';
import type { Hero } from 'fire-emblem-heroes-stats';

import { calculateResult, getStat } from '../damageCalculation';


type Props = {
  aggressor: 'LEFT' | 'RIGHT';
  leftHero: ?Hero;
  rightHero: ?Hero;
};

const printDamage = (damage, numAttacks) => (
  numAttacks > 1
    ? `${damage} × ${numAttacks}`
    : numAttacks > 0
      ? `${damage}`
      : ''
);

const CombatResult = ({ aggressor, leftHero, rightHero }: Props) => {
  let result;
  if (leftHero && rightHero) {
    const [attackingHero, defendingHero] = (aggressor === 'LEFT'
      ? [leftHero, rightHero]
      : [rightHero, leftHero]);
    result = calculateResult(attackingHero, defendingHero);
  }

  return (
    <div className="root">
      <style jsx>{`
        .root {
          height: 80px;
        }
        .container {
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          width: 320px;
        }
        h1 {
          color: white;
          font-family: 'Mandali', sans-serif;
          line-height: 1;
          margin: 10px 0 0;
          text-align: center;
        }
        h2 {
          color: white;
          font-family: 'Mandali', sans-serif;
          line-height: 1;
          margin: 10px 0 0;
          text-align: center;
        }
      `}</style>
      {leftHero && rightHero && result
        ? (
          <div className="container">
            <div>
              <h1>{`${getStat(leftHero, 'hp')} → ${
                aggressor === 'LEFT' ? result.attackerHpRemaining : result.defenderHpRemaining
              }`}</h1>
              <h2>{
                aggressor === 'LEFT'
                  ? printDamage(result.attackerDamage, result.attackerNumAttacks)
                  : printDamage(result.defenderDamage, result.defenderNumAttacks)
              }</h2>
            </div>
            <div>
              <h1>{`${getStat(rightHero, 'hp')} → ${
                aggressor === 'LEFT' ? result.defenderHpRemaining : result.attackerHpRemaining
              }`}</h1>
              <h2>{
                aggressor === 'LEFT'
                  ? printDamage(result.defenderDamage, result.defenderNumAttacks)
                  : printDamage(result.attackerDamage, result.attackerNumAttacks)
              }</h2>
            </div>
          </div>
        )
        : null}
    </div>
  );
}

export default CombatResult;
