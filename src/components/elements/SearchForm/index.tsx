import {
  Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, HStack, Input, Stack,
} from '@chakra-ui/react';
import { FormsIcon } from 'components/icons';
import SelectCityInput from 'components/shared/SelectCityInput';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import AddLocalizationButton from './AddLocalizationButton';
import useSearchForm, { IUseSearchFormProps } from './hooks/use-search-form';
import InputsIcons from './InputsIcons';

interface Props {
  submit: IUseSearchFormProps['submit'],
}

const SearchForm: React.FC<Props> = function ({ submit }) {
  const {
    isDateInvalid,
    date,
    setDate,
    minDate,
    isPassengersInvalid,
    passengers,
    setPassengers,
    destinies,
    getPlaceholder,
    onChange,
    remove,
    add,
    handleSubmit,
    isFormInvalid,
    submiting,
  } = useSearchForm({ submit });

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
              <FormErrorMessage data-testid="date-input-error">
                Please fill a valid date
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
              <FormErrorMessage data-testid="passengers-input-error">
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
        isDisabled={isFormInvalid}
        mb="80px"
        isLoading={submiting}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchForm;
