export interface ISelectCityOption {
  id: string,
  value: string,
  isInvalid: boolean
}

export type CityDataType = Array<string | number>

export interface ICityDistance {
  cities: string[],
  distance: number
}
