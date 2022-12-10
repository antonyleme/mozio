import {
  Box, Flex,
} from '@chakra-ui/react';
import React from 'react';
import FormResult from 'components/elements/FormResult';
import Header from 'components/shared/Header';
import ErrorBox from 'components/shared/ErrorBox';
import useResult from './hooks/use-result';

const ResultPage: React.FC = function () {
  const {
    date,
    passengers,
    cities,
    distancesData,
    loading,
  } = useResult();

  return (
    <Flex h="100vh" justifyContent="center" py={{ base: 0, lg: '128px' }}>
      <Box
        w={{ base: '100%', lg: '380px' }}
        p={{ base: '24px', lg: 0 }}
        maxW="100%"
      >
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
            <Box>
              {
                (!distancesData && !loading)
                  ? (
                    <ErrorBox>Impossible to calculate</ErrorBox>
                  )
                  : (
                    <FormResult
                      date={date}
                      passengers={passengers}
                      distances={distancesData}
                    />
                  )
              }
            </Box>
          )
        }
      </Box>
    </Flex>
  );
};

export default ResultPage;
