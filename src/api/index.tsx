import { CityDataType, ICityDistance } from 'common/types';
import { getDistance } from 'geolib';

const mockedCities: CityDataType[] = [
  ['Paris', 48.856614, 2.352222],
  ['Marseille', 43.296482, 5.369780],
  ['Lyon', 45.764043, 4.835659],
  ['Toulouse', 43.604652, 1.444209],
  ['Nice', 43.710173, 7.261953],
  ['Nantes', 47.218371, -1.553621],
  ['Strasbourg', 48.573405, 7.752111],
  ['Montpellier', 43.610769, 3.876716],
  ['Bordeaux', 44.837789, -0.579180],
  ['Lille', 50.629250, 3.057256],
  ['Rennes', 48.117266, -1.677793],
  ['Reims', 49.258329, 4.031696],
  ['Le Havre', 49.494370, 0.107929],
  ['Saint-Étienne', 45.439695, 4.387178],
  ['Toulon', 43.124228, 5.928000],
  ['Angers', 47.478419, -0.563166],
  ['Grenoble', 45.188529, 5.724524],
  ['Dijon', 47.322047, 5.041480],
  ['Nîmes', 43.836699, 4.360054],
  ['Aix-en-Provence', 43.529742, 5.447427],
];

export const getCitiesByKeyword = async (keyword: string): Promise<CityDataType[]> => {
  if (keyword.toLowerCase() === 'fail') throw new Error();

  if (!keyword) return [];

  const filteredCities = mockedCities.filter(
    (city) => (city[0] as string).toLowerCase().includes(keyword.toLowerCase()),
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  return filteredCities;
};

export const getIfCityIsValid = async (city: string): Promise<boolean> => {
  if (!city) return false;

  await new Promise((resolve) => setTimeout(resolve, 50));

  return !!mockedCities.filter(
    (cityData) => (cityData[0] as string).toLowerCase() === city.toLowerCase(),
  ).length;
};

export const getDistanceBetweenCities = async (cities: string[]): Promise<ICityDistance[]> => {
  if (cities.includes('Dijon')) throw new Error();

  const citiesData: CityDataType[] = [];

  cities.forEach((city) => {
    const mockedCity = mockedCities.find((c) => (c[0] as string) === city);

    if (mockedCity) {
      citiesData.push(mockedCity);
    }
  });

  const distances: ICityDistance[] = [];

  for (let i = 0; i < citiesData.length - 1; i += 1) {
    const [fromCity, fromLat, fromLong] = citiesData[i];
    const [toCity, toLat, toLong] = citiesData[i + 1];

    const distance = getDistance(
      { latitude: fromLat, longitude: fromLong },
      { latitude: toLat, longitude: toLong },
    );

    distances.push({
      cities: [(fromCity as string), (toCity as string)],
      distance,
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return distances;
};
