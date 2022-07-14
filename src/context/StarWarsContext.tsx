import {
  createContext,
  useState,
  useEffect,
} from 'react';

import {
  IPlanet,
  IPlanetsContext,
  IPlanetsContextProps,
  FilterByNumericValues,
  Order,
} from './PlanetsTypes';

import { fetchPlanets } from '../services/api';

const INITIAL_FILTER = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
] as const;

export const StarWarsContext = createContext({} as IPlanetsContext);

export function StarWarsProvider({ children }: IPlanetsContextProps) {
  const [name, setName] = useState('');
  const [data, setData] = useState<IPlanet[]>([]);
  const [columnFilter, setColumnFilter] = useState(INITIAL_FILTER);
  const [order, setOrder] = useState<Order>({ column: 'name', sort: 'DESC' });
  const [filterByNumericValues, setFilterByNumericValues] = useState<FilterByNumericValues[]>([]);

  useEffect(() => {
    async function getPlanets() {
      const planets = await fetchPlanets();
      setData(planets);
    }
    getPlanets();
  }, []);

  function addNewfilterByNumericValues(newFilter: FilterByNumericValues) {
    setFilterByNumericValues((state) => ([...state, newFilter]));
  }

  function handleChangeName(newName: string) {
    setName(newName);
  }

  function handleChangeSortOrder(colunmSorted:string, sortMethod: string) {
    setOrder({ column: colunmSorted, sort: sortMethod });
  }

  function removeColumnFilter(filter: FilterByNumericValues) {
    setColumnFilter((prevOptions) => (
      prevOptions.filter((option) => option !== filter.column)
    ));
  }

  function removeFilter(filter: FilterByNumericValues) {
    setColumnFilter((state) => [...state, filter.column]);
    setFilterByNumericValues((state) => state
      .filter((col) => col.column !== filter.column));
  }

  function onRemoveFilterBtnClick() {
    setColumnFilter(INITIAL_FILTER);
    setFilterByNumericValues([]);
  }

  const valueProvider = {
    data,
    filterByNumericValues,
    addNewfilterByNumericValues,
    name,
    handleChangeName,
    columnFilter,
    removeColumnFilter,
    removeFilter,
    onRemoveFilterBtnClick,
    order,
    setOrder,
    handleChangeSortOrder,
  };

  return (
    <StarWarsContext.Provider
      value={valueProvider}
    >
      {children}
    </StarWarsContext.Provider>
  );
}
