import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../hook';
import { QUEST_LEVELS, QUEST_TYPES } from '../../const';
import { setSortingOptionLevel, setSortingOptionTypes } from '../../store/action';

import { SortingLevel } from '../../types/sorting-types/sorting-level';
import { SortingTypes } from '../../types/sorting-types/sorting-types';

function SortingOptions():JSX.Element {
  const dispatch = useAppDispatch();
  const selectedOptionLevel = useAppSelector((state) => state.sortingOptionLevel);
  const selectedOptionType = useAppSelector((state) => state.sortingOptionTypes);

  const handleSelectedSortingLevel = useCallback(
    (option: SortingLevel) => dispatch(setSortingOptionLevel(option.id)), [dispatch]
  );

  const handleSelectedSortingTypes = useCallback(
    (option: SortingTypes) => dispatch(setSortingOptionTypes(option.id)), [dispatch]
  );

  return (
    <div className="page-content__item">
      <form className="filter" action="#" method="get">
        <fieldset className="filter__section">
          <legend className="visually-hidden">Тематика</legend>
          <ul className="filter__list">
            {
              QUEST_TYPES.map((type) => (
                <li className="filter__item" key={type.id}>
                  <input
                    type="radio"
                    name="type"
                    id={type.id}
                    checked={selectedOptionType === type.id}
                    onChange={() => handleSelectedSortingTypes(type)}
                  />
                  <label className="filter__label" htmlFor={type.id}>
                    <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                      <use xlinkHref={type.icon}></use>
                    </svg><span className="filter__label-text">{type.title}</span>
                  </label>
                </li>
              )
              )
            }
          </ul>
        </fieldset>

        <fieldset className="filter__section">
          <legend className="visually-hidden">Сложность</legend>
          <ul className="filter__list">
            {
              QUEST_LEVELS.map((level) => (
                <li className="filter__item" key={level.id}>
                  <input
                    type="radio"
                    name="level"
                    id={level.id}
                    checked={selectedOptionLevel === level.id}
                    onChange={() => handleSelectedSortingLevel(level)}
                  />
                  <label className="filter__label" htmlFor={level.id}>
                    <span className="filter__label-text">{level.title}</span>
                  </label>
                </li>
              ))
            }
          </ul>
        </fieldset>
      </form>
    </div>
  );
}

export default SortingOptions;
