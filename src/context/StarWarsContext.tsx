import {
  createContext, useState, useEffect, ReactNode,
} from 'react';

import { fetchPlanets, IPlanet } from '../services/api';

export const StarWarsContext = createContext({});

const INITIAL_FILTER = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

interface IPlanetsContext {
  children: ReactNode
}

export function StarWarsProvider({ children }:IPlanetsContext) {
  const [data, setData] = useState<IPlanet[]>([]);
  const [planetsFiltered, setPlanetsFiltered] = useState<IPlanet[]>([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [name, setName] = useState('');
  const [order, setOrder] = useState({ column: 'name', sort: 'DESC' });
  const [columnFilter, setColumnFilter] = useState(INITIAL_FILTER);

  useEffect(() => {
    async function getPlanets() {
      const planets = await fetchPlanets();
      setData(planets);
      setPlanetsFiltered(planets);
    }
    getPlanets();
  }, []);

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

  function removeColumnFilter(filter) {
    setColumnFilter((prevOptions) => (
      prevOptions.filter((option) => option !== filter.column)
    ));
  }

  function filterPlanetsByName(planets:IPlanet[], planetName: string): IPlanet[] {
    const newFilteredPlanetsByName = planets
      .filter((planet) => (
        planet.name.toUpperCase().includes(planetName.toUpperCase())
      ));

    return newFilteredPlanetsByName;
  }

  const NumericFilteredTypes:any = {
    'maior que': (a:number, b:number) => a > b,
    'menor que': (a:number, b:number) => a < b,
    'igual a': (a:number, b:number) => a === b,
  };

  function filterPlanetsByNumericValues(planets: IPlanet[], filters: any): IPlanet[] {
    let newFilteredPlanetsByNumericValues: IPlanet[] = planets;

    filters.forEach(({ comparison, column, value }) => {
      newFilteredPlanetsByNumericValues = planets.filter((planet) => (
        NumericFilteredTypes[comparison](Number(planet[column]), Number(value))
      ));
    });

    return newFilteredPlanetsByNumericValues;
  }

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
      value={{
        data,
        planetsFiltered,
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
        filterPlanetsByNumericValues,
        filterPlanetsByName,
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
}
