import { useToast } from '@chakra-ui/react';
import { getDistanceBetweenCities } from 'api';
import { ICityDistance } from 'common/types';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface IUseResult {
  date: string | null,
  passengers: string | null,
  cities: string[] | undefined,
  distancesData: ICityDistance[] | undefined,
  loading: boolean,
}

const useResult = (): IUseResult => {
  const [searchParams] = useSearchParams();
  const [date] = React.useState(searchParams.get('date'));
  const [passengers] = React.useState(searchParams.get('passengers'));
  const [cities] = React.useState(searchParams.get('cities')?.split(','));

  const navigate = useNavigate();
  const toast = useToast();

  const [distancesData, setDistancesData] = React.useState<ICityDistance[]>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!date || !passengers || !cities) {
      navigate('/');
      toast({
        status: 'error',
        title: 'Ops',
        description: 'Invalid data was provided',
      });
    }
  }, [date, cities, passengers, navigate, toast]);

  React.useEffect(() => {
    const getData = async (): Promise<void> => {
      if (cities) {
        try {
          const response = await getDistanceBetweenCities(cities);
          setDistancesData(response);
        } catch (error: unknown) {
          toast({
            status: 'error',
            title: 'Ops',
            description: 'Invalid data was provided',
          });
        }
        setLoading(false);
      }
    };
    getData();
  }, [cities, toast]);

  return {
    date,
    passengers,
    cities,
    distancesData,
    loading,
  };
};

export default useResult;
