import {
  Box, Flex, useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import FormResult from 'components/elements/FormResult';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from 'components/elements/Header';
import { getDistanceBetweenCities } from 'api';
import { ICityDistance } from 'common/types';

const ResultPage: React.FC = function () {
  const [searchParams] = useSearchParams();
  const [date] = React.useState(searchParams.get('date'));
  const [passengers] = React.useState(searchParams.get('passengers'));
  const [cities] = React.useState(searchParams.get('cities')?.split(','));

  const navigate = useNavigate();
  const toast = useToast();

  const [distancesData, setDistancesData] = useState<ICityDistance[]>([]);

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
        const response = await getDistanceBetweenCities(cities);
        setDistancesData(response);
      }
    };
    getData();
  }, [cities]);

  return (
    <Flex h="100vh" justifyContent="center" py="128px">
      <Box w={{ base: '100%', lg: '380px' }} p={{ base: '24px', lg: 0 }} maxW="100%">
        <Header>
          <>
            <strong>Well done!</strong>
            {' '}
            This is the result of your search
          </>
        </Header>

        {
          (date && passengers && cities)
          && (
            <FormResult
              date={date}
              passengers={passengers}
              distances={distancesData}
            />
          )
        }
      </Box>
    </Flex>
  );
};

export default ResultPage;
