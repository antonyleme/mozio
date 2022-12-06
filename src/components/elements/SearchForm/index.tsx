import {
  Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, HStack, Input, Stack,
} from '@chakra-ui/react';
import { getIfCityIsValid } from 'api';
import { ISelectCityOption } from 'common/types';
import { FormsIcon } from 'components/icons';
import SelectCityInput from 'components/shared/SelectCityInput';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { v4 as uuid } from 'uuid';
import AddLocalizationButton from './AddLocalizationButton';
import InputsIcons from './InputsIcons';

interface Props {
  submit: (values: ISelectCityOption[], date: string, passengers: string) => void,
  defaultValues?: {
    destinies?: string[],
    date?: string,
    passengers?: string
  }
}

const SearchForm: React.FC<Props> = function ({ submit, defaultValues }) {
  const [destinies, updateDestinies] = useImmer<ISelectCityOption[]>([]);

  const [date, setDate] = useState('');
  const [isDateInvalid, setIsDateInvalid] = useState(false);

  const [passengers, setPassengers] = useState('1');
  const [isPassengersInvalid, setIsPassengersInvalid] = useState(false);

  useEffect(() => {
    if (date && isDateInvalid) {
      setIsDateInvalid(false);
    }

    if (passengers && isPassengersInvalid) {
      setIsPassengersInvalid(false);
    }
  }, [
    date,
    passengers,
    isDateInvalid,
    isPassengersInvalid,
    setIsDateInvalid,
    setIsPassengersInvalid,
  ]);

  const minDate = (): string => {
    const d = new Date();
    d.setDate(d.getDate() + 1);

    return d.toISOString().substring(0, 10);
  };

  useEffect(() => {
    let newDestinies: ISelectCityOption[] = [
      {
        id: uuid(),
        value: '',
        isInvalid: false,
      },
      {
        id: uuid(),
        value: '',
        isInvalid: false,
      },
    ];

    if (defaultValues?.destinies?.length) {
      newDestinies = defaultValues?.destinies.map((val) => (
        {
          id: uuid(),
          value: val,
          isInvalid: false,
        }
      ));
    }

    updateDestinies(() => newDestinies);

    if (defaultValues?.date) {
      setDate(defaultValues?.date);
    }

    if (defaultValues?.passengers) {
      setPassengers(defaultValues?.passengers);
    }
  }, [defaultValues, updateDestinies]);

  const onChange = (value: string, index: number): void => {
    if (destinies[index].value === value) return;

    updateDestinies((draft) => {
      draft[index].value = value;
    });
  };

  const add = (): void => {
    updateDestinies((draft) => {
      draft.push({
        id: uuid(),
        value: '',
        isInvalid: false,
      });
    });
  };

  const remove = (id: string): void => {
    updateDestinies((draft) => draft.filter((d) => d.id !== id));
  };

  const getPlaceholder = (index: number): string => {
    if (index === 0) {
      return 'Select your origin city';
    }

    if (index === destinies.length - 1) {
      return 'Select your destiny city';
    }

    return 'Select your stopping city';
  };

  const getEmptyValuesLength = (): number => {
    const emptyValues = destinies.filter((d) => !d.value);

    return emptyValues.length;
  };

  const [submiting, setSubmiting] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    if (getEmptyValuesLength() > 0) {
      return;
    }

    let hasInvalid = false;

    if (!date) {
      setIsDateInvalid(true);
      hasInvalid = true;
    }

    if (!passengers) {
      setIsPassengersInvalid(true);
      hasInvalid = true;
    }

    if (hasInvalid) return;

    setSubmiting(true);

    const promises = destinies.map((destiny) => getIfCityIsValid(destiny.value));
    const isValidResults = await Promise.all(promises);

    hasInvalid = isValidResults.includes(false);

    updateDestinies((draft) => {
      for (let i = 0; i < draft.length; i += 1) {
        draft[i].isInvalid = !isValidResults[i];
      }
    });

    if (!hasInvalid) submit(destinies, date, passengers);

    setSubmiting(false);
  };

  const isFormInvalid = (): boolean => isDateInvalid
    || isPassengersInvalid
    || getEmptyValuesLength() > 0;

  const commonInputProps = {
    variant: 'custom',
    _invalid: {
      borderColor: 'red',
    },
  };

  return (
    <form autoComplete="off" data-testid="search-form">
      <Box w="100%">

        <HStack spacing="14px" alignItems="flex-start">
          <Flex
            fontSize="16px"
            w="23px"
            h="50px"
            alignItems="center"
            justifyContent="center"
            mt="29px"
            color="blue.brand"
          >
            <FormsIcon />
          </Flex>
          <Grid templateColumns="1fr 1fr" gap="13px">
            <FormControl isInvalid={isDateInvalid}>
              <FormLabel fontSize="14px">Trip Date</FormLabel>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
                min={minDate()}
                {...commonInputProps}
                data-testid="date-input"
              />
              <FormErrorMessage>
                Please fill the date
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isPassengersInvalid}>
              <FormLabel fontSize="14px">Passengers</FormLabel>
              <Input
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                type="number"
                placeholder="1"
                {...commonInputProps}
                data-testid="passengers-input"
              />
              <FormErrorMessage>
                Please fill the passengers number
              </FormErrorMessage>
            </FormControl>
          </Grid>
        </HStack>

        <Stack spacing="13px" position="relative">
          <AnimatePresence>
            <Box
              position="absolute"
              h="calc(100% - 70px)"
              w="1px"
              border="1px dashed"
              borderColor="#717579"
              left="9px"
              top="30px"
              as={motion.div}
              layout
            />

            {
              destinies.map((destiny, index) => (
                <Box
                  as={motion.div}
                  key={destiny.id}
                  layout
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  position="relative"
                >
                  <Flex
                    alignItems="center"
                    gap="14px"
                    position="relative"
                  >
                    <InputsIcons
                      index={index}
                      size={destinies.length}
                    />

                    <Box w="100%">
                      <SelectCityInput
                        placeholder={getPlaceholder(index)}
                        value={destiny.value}
                        onChange={(val: string) => onChange(val, index)}
                        handleRemove={
                          (destinies.length > 2)
                            ? () => remove(destiny.id)
                            : undefined
                        }
                        isInvalid={destiny.isInvalid}
                      />
                    </Box>
                  </Flex>
                </Box>
              ))
            }
          </AnimatePresence>
        </Stack>
      </Box>

      <AddLocalizationButton onClick={add} />

      <Button
        h="50px"
        variant="branded"
        w="100%"
        data-testid="search-button"
        onClick={handleSubmit}
        isDisabled={isFormInvalid()}
        mb="80px"
        isLoading={submiting}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
