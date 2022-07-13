import React, { createContext, useState, useEffect } from 'react';

export const StarWarsContext = createContext({});

const INITIAL_FILTER = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [name, setName] = useState('');
  const [order, setOrder] = useState({ column: 'name', sort: 'DESC' });
  const [columnFilter, setColumnFilter] = useState(INITIAL_FILTER);

  function sortFilter(planets) {
    const positionBefore = -1;

    if (order.column === 'name') {
      return planets
        .sort((a, b) => (a[order.column] < b[order.column] ? positionBefore : 1));
    }

    return planets.sort((a, b) => (order.sort === 'ASC'
      ? (Number(a[order.column] === 'unknown'
        ? Number.POSITIVE_INFINITY : a[order.column])
      - Number(b[order.column] === 'unknown'
        ? Number.POSITIVE_INFINITY : b[order.column])
      ) : (
        Number(b[order.column] === 'unknown'
          ? Number.NEGATIVE_INFINITY : b[order.column])
      - Number(a[order.column] === 'unknown'
        ? Number.NEGATIVE_INFINITY : a[order.column])
      )));
  }

  useEffect(() => {
    async function fetchPlanets() {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((res) => res.json())
        .then(({ results }) => {
          results.forEach((planet) => delete planet.residents);

          setData((results));
          setPlanetsFiltered(sortFilter(results));
        });
    }
    fetchPlanets();
  }, []);

  function removeColumnFilter(filter) {
    setColumnFilter((prevOptions) => (
      prevOptions.filter((option) => option !== filter.column)
    ));
  }

  function filterTable() {
    let filteredPlanetsByName = data
      .filter((planet) => planet.name.toUpperCase().includes(name.toUpperCase()));
    setPlanetsFiltered(filteredPlanetsByName);

    filterByNumericValues.forEach((numericValue) => {
      if (numericValue.comparison === 'maior que') {
        filteredPlanetsByName = filteredPlanetsByName
          .filter((planet) => (
            Number(planet[numericValue.column]) > Number(numericValue.value)
          ));
      } else if (numericValue.comparison === 'menor que') {
        filteredPlanetsByName = filteredPlanetsByName
          .filter((planet) => (
            Number(planet[numericValue.column]) < Number(numericValue.value)
          ));
      } else {
        filteredPlanetsByName = filteredPlanetsByName
          .filter((planet) => (
            Number(planet[numericValue.column]) === Number(numericValue.value)
          ));
      }
    });

    setPlanetsFiltered(sortFilter(filteredPlanetsByName));
  }

  useEffect(() => {
    filterTable();
  }, [filterByNumericValues, name, order]);

  function removeFilter(column) {
    setColumnFilter((state) => [...state, column.column]);
    setFilterByNumericValues((state) => state
      .filter((col) => col.column !== column.column));
  }

  function onRemoveFilterBtnClick() {
    setColumnFilter(INITIAL_FILTER);
    setFilterByNumericValues([]);
  }
  return (
    <StarWarsContext.Provider
      value={ {
        planetsFiltered,
        filterTable,
        filterByNumericValues,
        setPlanetsFiltered,
        setFilterByNumericValues,
        name,
        setName,
        columnFilter,
        removeColumnFilter,
        removeFilter,
        onRemoveFilterBtnClick,
        order,
        setOrder,
        sortFilter,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}
