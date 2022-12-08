import {
  Box, HStack, Text,
} from '@chakra-ui/react';
import { AddIcon } from 'components/icons';
import React from 'react';

interface Props {
  onClick: () => void
}

const AddLocalizationButton: React.FC<Props> = function ({ onClick }) {
  return (
    <HStack
      cursor="pointer"
      _hover={{
        opacity: 0.7,
      }}
      transition="0.3s"
      spacing="15px"
      mt="16px"
      mb="25px"
      onClick={onClick}
      data-testid="add-localization-button"
      id="add-localization-button"
    >
      <Box color="yellow.brand" fontSize="20px" lineHeight="20px">
        <AddIcon />
      </Box>
      <Text fontWeight="500" fontSize="14px">Add Localization</Text>
    </HStack>
  );
};

export default AddLocalizationButton;
