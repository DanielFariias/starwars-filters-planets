import { useContext } from 'react';
import { StarWarsContext } from '../../context/StarWarsContext';

export function Table() {
  const {
    data,
    name,
    filterByNumericValues,
    filterPlanetsByName,
    filterPlanetsByNumericValues,
    order,
  } = useContext<any>(StarWarsContext);

  const obgP: any = {
    ASC: (planet) => (Number(planet === 'unknown' ? Number.POSITIVE_INFINITY : planet)),
    DESC: (planet) => (Number(planet === 'unknown' ? Number.NEGATIVE_INFINITY : planet)),
  };

  function sortFilter(planets) {
    const positionBefore = -1;

    if (order.column === 'name') {
      return planets
        .sort((a, b) => (a[order.column] < b[order.column] ? positionBefore : 1));
    }

    return planets.sort((a, b) => (order.sort === 'ASC'
      ? obgP[order.sort](a[order.column]) - obgP[order.sort](b[order.column])
      : obgP[order.sort](b[order.column]) - obgP[order.sort](a[order.column])));
  }

  function filterTable(planets, planetName, filterByNumericValues) {
    const filteredPlanetsByName = filterPlanetsByName(planets, planetName);

    const filteredPlanetsByNumericValues = filterPlanetsByNumericValues(filteredPlanetsByName, filterByNumericValues);

    return (sortFilter(filteredPlanetsByNumericValues));
  }

  const filteredPlanets = filterTable(data, name, filterByNumericValues);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredPlanets.map((planet:any) => (
          <tr key={planet.name}>
            <td data-testid="planet-name">{planet.name}</td>
            <td>{planet.rotation_period}</td>
            <td>{planet.orbital_period}</td>
            <td>{planet.diameter}</td>
            <td>{planet.climate}</td>
            <td>{planet.gravity}</td>
            <td>{planet.terrain}</td>
            <td>{planet.surface_water}</td>
            <td>{planet.population}</td>
            <td>{planet.films}</td>
            <td>{planet.created}</td>
            <td>{planet.edited}</td>
            <td>{planet.url}</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
}
