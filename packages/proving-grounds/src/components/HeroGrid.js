// @flow
import React from 'react';
import Color from 'color-js';
import { map, addIndex } from 'ramda';
import { getDefaultInstance } from 'fire-emblem-heroes-calculator';
import type { Hero } from 'fire-emblem-heroes-stats';

import HeroPortrait from './Hero';
import HeroSlot from './HeroSlot';
import {
  colors,
  fontFamilies,
  fontSizes,
  gridSize,
  lineHeights,
} from '../theme';
import type { Dispatch } from '../reducer';

type Props = {
  activeHeroName: ?string,
  dispatch: Dispatch,
  heroes: Array<Hero>,
  showUndo?: boolean,
};

const GUTTER_HEIGHT = 5;
const GUTTER_WIDTH = 8;

const HeroGrid = ({ activeHeroName, dispatch, heroes, showUndo }: Props) => (
  <div className="grid">
    <style jsx>{`
      .grid {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${gridSize}px, 1fr));
        grid-column-gap: ${GUTTER_WIDTH * 2}px;
        grid-row-gap: ${GUTTER_HEIGHT}px;
        margin: ${GUTTER_HEIGHT}px ${GUTTER_WIDTH}px;
      }
      .gridSquareOuter {
        align-items: center;
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .undo {
        align-items: center;
        background-color: ${Color(colors.aquaIsland).setAlpha(0.2)};
        box-shadow: inset 0 0 12px ${colors.aquaIsland};
        color: white;
        display: flex;
        font-family: ${fontFamilies.ui};
        font-size: ${fontSizes.medium};
        height: ${gridSize}px;
        justify-content: center;
        line-height: 1;
        width: ${gridSize}px;
      }
      .name {
        color: ${Color(colors.iceberg).setAlpha(0.75)};
        font-family: ${fontFamilies.ui};
        font-size: ${fontSizes.small}px;
        line-height: ${lineHeights.body};
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        text-shadow: 0.5px 1px 2px rgba(0, 0, 0, 0.8);
        white-space: nowrap;
      }
    `}</style>
    {showUndo && (
      <div className="gridSquareOuter">
        <HeroSlot
          isActive={false}
          onClick={() => {
            dispatch({
              type: 'SELECT_HERO',
              hero: 'CLEAR',
            });
          }}
        >
          <div className="undo">Undo</div>
        </HeroSlot>
      </div>
    )}
    {addIndex(map)(
      (hero: Hero, i: number) => (
        <div className="gridSquareOuter" key={`${i}-${hero.name}`}>
          <HeroSlot
            isActive={activeHeroName === hero.name}
            onClick={() => {
              dispatch({
                type: 'SELECT_HERO',
                hero: getDefaultInstance(hero.name),
              });
            }}
          >
            <HeroPortrait
              name={hero.name}
              assets={hero.assets}
              weaponType={hero.weaponType}
            />
          </HeroSlot>
          <div className="name">{hero.shortName || hero.name}</div>
        </div>
      ),
      heroes,
    )}
  </div>
);

export default HeroGrid;
