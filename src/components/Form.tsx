import { useState, useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

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

  const [column, setColumn] = useState(columnFilter[0]);
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const [sorted, setSorted] = useState('population');
  const [ascDesc, setAscDesc] = useState('ASC');

  function handleFilter() {
    removeColumnFilter({ column, comparison, value });
    addNewfilterByNumericValues({ column, comparison, value });

    setColumn(columnFilter[1]);
  }

  return (
    <div>
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
        onChange={(e) => setColumn(e.target.value)}
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
        onChange={(e) => setComparison(e.target.value)}
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
          onChange={(e) => setValue(e.target.value)}
        />
      </label>

      <button
        type="button"
        onClick={handleFilter}
        data-testid="button-filter"
      >
        filtrar
      </button>

      <select
        data-testid="column-sort"
        onChange={(e) => setSorted(e.target.value)}
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
              onChange={() => setAscDesc(item)}
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
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={() => {
          handleChangeSortOrder(sorted, ascDesc);
        }}
      >
        Sort
      </button>

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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={() => onRemoveFilterBtnClick()}
        >
          Remover todas as filtragens
        </button>
      </div>
    </div>
  );
}
