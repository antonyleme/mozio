import {
  Box, Button, Flex, FormControl, FormLabel, Grid, HStack, Input, Stack, Text,
} from '@chakra-ui/react';
import { FormsIcon, PinIcon } from 'components/icons';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import InputsIcons from '../SearchForm/InputsIcons';

interface Props {
  date: string,
  passengers: string
}

const FormResult: React.FC<Props> = function ({ date, passengers }) {
  const commonInputProps = {
    variant: 'custom',
    _disabled: {
      borderColor: 'gray.200',
    },
  };

  return (
    <Box>
      <Box w="100%">
        <HStack spacing="14px" alignItems="flex-start">
          <Flex
            fontSize="16px"
            w="23px"
            h="50px"
            alignItems="center"
            justifyContent="center"
            color="blue.brand"
            mt="29px"
          >
            <FormsIcon />
          </Flex>
          <Grid templateColumns="1fr 1fr" gap="13px">
            <FormControl>
              <FormLabel fontSize="14px">Trip date</FormLabel>
              <Input
                value={date}
                type="date"
                {...commonInputProps}
                data-testid="date-input"
                isDisabled
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="14px">Passengers</FormLabel>
              <Input
                value={passengers}
                isDisabled
                placeholder="1"
                {...commonInputProps}
                data-testid="passengers-input"
              />
            </FormControl>
          </Grid>
        </HStack>

        <Box mt="8px" mb="40px">
          <Stack spacing="13px" position="relative">
            <Box
              position="absolute"
              h="calc(100% - 70px)"
              w="1px"
              border="1px dashed"
              borderColor="#717579"
              left="11px"
              top="30px"
              as={motion.div}
              layout
            />

            {
              Array.from({ length: 5 }).map((destiny, index) => (
                <Box
                  position="relative"
                >
                  <Flex
                    alignItems="center"
                    gap="14px"
                    position="relative"
                  >
                    <InputsIcons
                      index={index}
                      size={5}
                    />

                    <Flex h="50px" alignItems="center">
                      <Text transform="translateY(-1px)">Result 1</Text>
                    </Flex>
                  </Flex>
                </Box>
              ))
            }
          </Stack>

          <Box
            bg="blue.50"
            color="blue.brand"
            p="8px"
            border="1px solid"
            borderColor="blue.brand"
            fontSize="14px"
            mt="16px"
          >
            <HStack>
              <Box fontSize="20px" transform="translateY(-3px)">
                <PinIcon />
              </Box>
              <Text>
                Total distance:
                {' '}
                <strong>900km</strong>
              </Text>
            </HStack>
          </Box>
        </Box>
      </Box>

      <Link to="/">
        <Button
          h="50px"
          variant="branded"
          w="100%"
          data-testid="search-button"
          mb="80px"
        >
          New Search
        </Button>
      </Link>
    </Box>
  );
};

export default FormResult;
