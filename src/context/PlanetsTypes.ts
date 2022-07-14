/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';

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

export type IColumn = 'name' | 'population' | 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water'
export type IComparison = 'maior que' | 'menor que' | 'igual a'
export type SortType = 'ASC'| 'DESC'

export interface FilterByNumericValues {
  column: IColumn
  comparison: IComparison
  value: number
}

export interface Order {
  column: IColumn
  sort: SortType
}

export interface IPlanetsContext {
  name: string
  order: Order
  data: IPlanet[]
  columnFilter: string[]
  filterByNumericValues: FilterByNumericValues[]
  removeFilter: (filter: FilterByNumericValues) => void
  removeColumnFilter: (filter: FilterByNumericValues) => void
  onRemoveFilterBtnClick: () => void
  handleChangeName: (newName: string) => void
  addNewfilterByNumericValues: (newFilter: FilterByNumericValues) => void
  handleChangeSortOrder: (colunmSorted: IColumn, sortMethod: 'ASC'| 'DESC') => void
}

export interface IPlanetsContextProps {
  children: ReactNode
}
