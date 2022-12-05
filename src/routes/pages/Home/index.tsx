import {
  Box, Flex, Image, Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import MozioLogo from 'assets/mozio.png';
import SearchForm from 'components/elements/SearchForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ISelectCityOption } from 'common/types';

const HomePage: React.FC = function () {
  const navigate = useNavigate();

  const submit = (destinies: ISelectCityOption[]): void => {
    navigate(`/result?cities=${destinies.map((d) => d.value).join(',')}`);
  };

  const [searchParams] = useSearchParams();

  const [defaultCities, setDefaultCities] = useState<string[]>();
  const [defaultDate, setDefaultDate] = useState('');
  const [defaultPassengers, setDefaultPassengers] = useState('');

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
      <Box w="380px" maxW="100%">
        <Box textAlign="center">
          <Image mx="auto" src={MozioLogo} />
          <Text fontSize="14px" mb="24px">
            <strong>Welcome to Mozio!</strong>
            {' '}
            Search and plan your route easily
          </Text>
        </Box>

        <SearchForm
          submit={submit}
          defaultValues={defaultValues}
        />
      </Box>
    </Flex>
  );
};

export default HomePage;