import { useContext } from 'react';
import { FilterByNumericValues, IPlanet } from '../../context/PlanetsTypes';
import { StarWarsContext } from '../../context/StarWarsContext';
import { Tbody } from './components/Tbody';
import { Thead } from './components/Thead';

const NumericFilteredTypes = {
  'maior que': (a:number, b:number) => a > b,
  'menor que': (a:number, b:number) => a < b,
  'igual a': (a:number, b:number) => a === b,
};

const obgP = {
  ASC: (column: string) => (Number(column === 'unknown' ? Number.POSITIVE_INFINITY : column)),
  DESC: (column: string) => (Number(column === 'unknown' ? Number.NEGATIVE_INFINITY : column)),
};

export function Table() {
  const {
    data,
    name,
    filterByNumericValues,
    order,
  } = useContext(StarWarsContext);

  function sortFilter(planets: IPlanet[]) {
    const positionBefore = -1;

    if (order.column === 'name') {
      return planets
        .sort((a, b) => (a[order.column] < b[order.column] ? positionBefore : 1));
    }

    return planets.sort((a, b) => (order.sort === 'ASC'
      ? obgP[order.sort](a[order.column]) - obgP[order.sort](b[order.column])
      : obgP[order.sort](b[order.column]) - obgP[order.sort](a[order.column])));
  }

  function filterPlanetsByName(planets:IPlanet[], planetName: string): IPlanet[] {
    const newFilteredPlanetsByName = planets
      .filter((planet) => (
        planet.name.toUpperCase().includes(planetName.toUpperCase())
      ));

    return newFilteredPlanetsByName;
  }

  function filterPlanetsByNumericValues(
    planets: IPlanet[],
    filters: FilterByNumericValues[],
  ): IPlanet[] {
    let newFilteredPlanetsByNumericValues: IPlanet[] = planets;

    filters.forEach(({ comparison, column, value }: FilterByNumericValues) => {
      newFilteredPlanetsByNumericValues = newFilteredPlanetsByNumericValues.filter((planet) => (
        NumericFilteredTypes[comparison](Number(planet[column]), Number(value))
      ));
    });

    return newFilteredPlanetsByNumericValues;
  }

  function filterTable(
    planets: IPlanet[],
    planetName: string,
    filters: FilterByNumericValues[],
  ) {
    const filteredPlanetsByName = filterPlanetsByName(planets, planetName);

    const filteredPlanetsByNumericValues = (
      filterPlanetsByNumericValues(filteredPlanetsByName, filters)
    );

    return (sortFilter(filteredPlanetsByNumericValues));
  }

  const filteredPlanets = filterTable(data, name, filterByNumericValues);

  return (
    <table>
      <Thead />
      <Tbody filteredPlanets={filteredPlanets} />
    </table>
  );
}
