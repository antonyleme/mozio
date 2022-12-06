import {
  Box, Flex, Image, Text, useToast,
} from '@chakra-ui/react';
import React from 'react';
import MozioLogo from 'assets/mozio.png';
import FormResult from 'components/elements/FormResult';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from 'components/elements/Header';

const ResultPage: React.FC = function () {
  const [searchParams] = useSearchParams();
  const [date] = React.useState(searchParams.get('date'));
  const [passengers] = React.useState(searchParams.get('passengers'));

  const navigate = useNavigate();
  const toast = useToast();

  React.useEffect(() => {
    if (!date || !passengers) {
      navigate('/');
      toast({
        status: 'error',
        title: 'Ops',
        description: 'Invalid data was provided',
      });
    }
  }, [date, passengers, navigate, toast]);

  return (
    <Flex h="100vh" justifyContent="center" py="128px">
      <Box w={{ base: '100%', lg: '380px' }} p={{ base: '24px', lg: 0 }} maxW="100%">
        <Box textAlign="center">
          <Image mx="auto" src={MozioLogo} data-testid="logo-image" />
          <Text fontSize="14px" mb="24px" data-testid="welcome-message">
            <strong>Well done!</strong>
            {' '}
            This is the result of your search
          </Text>
        </Box>

        <Header>
          <>
            <strong>Well done!</strong>
            {' '}
            This is the result of your search
          </>
        </Header>

        {
          (date && passengers)
          && (
            <FormResult
              date={date}
              passengers={passengers}
            />
          )
        }
      </Box>
    </Flex>
  );
};

export default ResultPage;
