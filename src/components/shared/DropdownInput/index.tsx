import {
  Box, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement, Spinner,
} from '@chakra-ui/react';
import React from 'react';
import CollapsableList, { ICollapsableList } from './CollapsableList';

interface Props {
  options: string[],
  onChange: (value: string) => void,
  setValue: (value: string) => void,
  value: string,
  loading: boolean,
  placeholder?: string,
  isInvalid?: boolean,
  invalidMessage?: string
}

export interface IDropdownInput {
  onCloseList: (() => void) | undefined,
  onOpenList: (() => void) | undefined
}

const DropdownInput = React.forwardRef(({
  options,
  onChange,
  value,
  loading,
  placeholder,
  isInvalid,
  invalidMessage,
  setValue,
}: Props, ref: React.Ref<IDropdownInput>) => {
  const listRef = React.useRef<ICollapsableList>(null);

  React.useImperativeHandle(ref, () => ({
    onOpenList: listRef.current?.onOpen,
    onCloseList: listRef.current?.onClose,
  }));

  const handleSetValue = (newValue: string): void => {
    setValue(newValue);
    listRef.current?.onClose();
  };

  return (
    <Box position="relative">
      <FormControl isInvalid={isInvalid}>
        <InputGroup>
          <Input
            variant="custom"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-testid="dropdown-input"
            _invalid={{
              border: '1px solid red',
            }}
          />
          {
            !!loading
            && (
              <InputRightElement h="50px">
                <Spinner
                  data-testid="dropdown-input-spinner"
                  size="xs"
                  thickness="1px"
                  color="blue.brand"
                />
              </InputRightElement>
            )
          }
        </InputGroup>
        <FormErrorMessage
          data-testid="dropdown-input-alert"
        >
          {invalidMessage || 'Invalid information'}
        </FormErrorMessage>
      </FormControl>

      <CollapsableList
        items={options}
        ref={listRef}
        onClick={handleSetValue}
      />
    </Box>
  );
});

export default DropdownInput;
