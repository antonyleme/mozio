import { Box, IconButton } from '@chakra-ui/react';
import { CloseIcon } from 'components/icons';
import React, { useEffect } from 'react';
import DropdownInput, { IDropdownInput } from '../DropdownInput';
import useCitiesFilter from './hooks/use-cities-filter';

interface Props {
  value: string,
  onChange: (value: string) => void,
  handleRemove?: () => void,
  placeholder?: string,
  isInvalid?: boolean
}

const SelectCityInput: React.FC<Props> = function ({
  value,
  onChange,
  handleRemove,
  placeholder,
  isInvalid,
}) {
  const { filtering, filteredItems, filterValues } = useCitiesFilter();

  const dropdownInputRef = React.useRef<IDropdownInput>(null);

  useEffect(() => {
    if (filteredItems.length) {
      dropdownInputRef.current?.onOpenList?.();
    }
  }, [filteredItems]);

  const handleChange = (newValue: string): void => {
    filterValues(newValue);
    onChange(newValue);
  };

  const handleSetValue = (newValue: string): void => {
    onChange(newValue);
    dropdownInputRef.current?.onCloseList?.();
  };

  return (
    <Box
      position="relative"
      role="group"
      data-testid="select-city-input"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        bottom="0"
        right="-45px"
      >
        {
          !!handleRemove
          && (
            <IconButton
              data-testid="select-city-input-remove-button"
              w="28px"
              h="28px"
              aria-label="remove"
              borderRadius="100%"
              minW="none"
              fontSize="10px"
              icon={<CloseIcon />}
              position="absolute"
              top="50%"
              transform="translateY(-50%)"
              right="0px"
              bg="#E4E4E4"
              transition="0.3s"
              _hover={{
                bg: '#CBCBCB',
              }}
              display="none"
              _groupHover={{
                display: 'flex',
              }}
              onClick={handleRemove}
            />
          )
        }
      </Box>

      <DropdownInput
        options={filteredItems}
        value={value}
        onChange={handleChange}
        setValue={handleSetValue}
        loading={filtering}
        placeholder={placeholder}
        isInvalid={isInvalid}
        ref={dropdownInputRef}
        invalidMessage="This city is invalid"
      />
    </Box>
  );
};

export default SelectCityInput;
