export interface IPlanet {
  climate: string
  created: string
  diameter:string
  edited: string
  films: string[]
  gravity: string
  name: string
  residents?: string[]
  orbital_period: string
  population:string
  rotation_period: string
  surface_water: string
  terrain: string
  url: string
}

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
