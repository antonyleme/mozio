import {
  Box, Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import SearchForm from 'components/elements/SearchForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ISelectCityOption } from 'common/types';
import Header from 'components/elements/Header';

const HomePage: React.FC = function () {
  const navigate = useNavigate();

  const submit = (destinies: ISelectCityOption[], date: string, passengers: string): void => {
    navigate(`/result?cities=${destinies.map((d) => d.value).join(',')}&date=${date}&passengers=${passengers}`);
  };

  const [searchParams] = useSearchParams();

  const [defaultValues, setDefaulValues] = useState({
    destinies: [] as string[],
    date: '',
    passengers: '',
  });

  React.useEffect(() => {
    setDefaulValues({
      destinies: searchParams.get('cities')?.split(',') || [],
      date: searchParams.get('date') || '',
      passengers: searchParams.get('passengers') || '',
    });
  }, [searchParams]);

  return (
    <Flex h="100vh" justifyContent="center" py="128px">
      <Box w={{ base: '100%', lg: '380px' }} p={{ base: '24px', lg: 0 }} maxW="100%">
        <Header>
          <>
            <strong>Welcome to Mozio!</strong>
            {' '}
            Search and plan your route easily
          </>
        </Header>

        <SearchForm
          submit={submit}
          defaultValues={defaultValues}
        />
      </Box>
    </Flex>
  );
};

export default HomePage;
