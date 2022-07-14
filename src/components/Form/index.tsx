import {
  useState,
  useContext,
  FormEvent,
  ChangeEvent,
} from 'react';

import {
  FilterByNumericValues,
  IColumn,
  IComparison,
  SortType,
} from '../../context/PlanetsTypes';

import { StarWarsContext } from '../../context/StarWarsContext';

const INITIAL_FILTER = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export function Form() {
  const {
    filterByNumericValues,
    addNewfilterByNumericValues,
    name,
    handleChangeName,
    columnFilter,
    removeColumnFilter,
    removeFilter,
    onRemoveFilterBtnClick,
    handleChangeSortOrder,
  } = useContext(StarWarsContext);

  const [column, setColumn] = useState(columnFilter[0] as IColumn);
  const [comparison, setComparison] = useState<IComparison>('maior que');
  const [value, setValue] = useState(0);

  const [sorted, setSorted] = useState<IColumn>('population');
  const [ascDesc, setAscDesc] = useState<SortType>('ASC');

  function handleFilter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const Filter:FilterByNumericValues = { column, comparison, value };

    removeColumnFilter(Filter);
    addNewfilterByNumericValues(Filter);

    setColumn(columnFilter[1] as IColumn);
  }

  function handleSortPlanets(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleChangeSortOrder(sorted, ascDesc);
  }

  return (
    <div>
      <form onSubmit={handleFilter}>
        <label htmlFor="name-filter">
          Name
          <input
            data-testid="name-filter"
            type="text"
            id="name-filter"
            value={name}
            placeholder="Digite um planeta"
            onChange={(e) => handleChangeName(e.target.value)}
          />
        </label>

        <select
          data-testid="column-filter"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setColumn(e.target.value as IColumn);
          }}
          value={column}
        >
          {columnFilter.map((columnA) => (
            <option
              key={columnA}
              value={columnA}
            >
              {columnA}
            </option>
          ))}
        </select>

        <select
          data-testid="comparison-filter"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => (
            setComparison(e.target.value as IComparison)
          )}
          value={comparison}
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <label htmlFor="value-filter">
          <input
            data-testid="value-filter"
            type="number"
            id="value-filter"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>

        <button type="submit">
          filtrar
        </button>
      </form>

      <form onSubmit={handleSortPlanets}>
        <select
          data-testid="column-sort"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSorted(e.target.value as IColumn)}
          value={sorted}
        >
          {INITIAL_FILTER.map((col) => (
            <option
              key={col}
              value={col}
            >
              {col}
            </option>
          ))}
        </select>

        {
        ['ASC', 'DESC'].map((item) => (
          <label htmlFor={`order-${item}`} key={`order-${item}`}>
            { item }
            <input
              onChange={() => setAscDesc(item as SortType)}
              name="order"
              id={`order-${item}`}
              type="radio"
              value={item}
              checked={item === ascDesc}
              data-testid={`column-sort-input-${item.toLowerCase()}`}
            />
          </label>
        ))
      }
        <button type="submit">
          Sort
        </button>
      </form>

      <div>
        {filterByNumericValues.map((aa) => (
          <span key={aa.column} data-testid="filter">
            <p>{aa.column}</p>
            <p>{aa.comparison}</p>
            <p>{aa.value}</p>
            <button
              type="button"
              onClick={() => removeFilter(aa)}
            >
              X
            </button>
          </span>
        ))}

        {filterByNumericValues.length > 1 && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={() => onRemoveFilterBtnClick()}
          >
            Remover todas as filtragens
          </button>
        )}

      </div>
    </div>
  );
}
