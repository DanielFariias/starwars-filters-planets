import { IPlanet } from '../context/PlanetsTypes';

interface IRequestPlanet {
  count: number
  next: string
  previous: null
  results: IPlanet[]
}

export async function fetchPlanets():Promise<IPlanet[]> {
  const planets = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((res) => res.json())
    .then(({ results }: IRequestPlanet) => {
      results.forEach((planet:IPlanet) => delete planet.residents);
      return results;
    });

  return planets;
}
