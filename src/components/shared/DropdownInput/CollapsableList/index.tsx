import {
  Box, Collapse, useDisclosure, useOutsideClick,
} from '@chakra-ui/react';
import React from 'react';
import ListItem from '../ListItem';

export interface ICollapsableList {
  onOpen: () => void,
  onClose: () => void
}

interface Props {
  items: string[],
  onClick: (value: string) => void,
}

const CollapsableList = React.forwardRef(({
  items, onClick,
}: Props, ref: React.Ref<ICollapsableList>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useImperativeHandle(ref, () => ({
    onOpen,
    onClose,
  }));

  const collapseWrapperRef = React.useRef(null);

  useOutsideClick({
    ref: collapseWrapperRef,
    handler: onClose,
  });

  const handleItemClick = (value: string): void => {
    onClick(value);
    onClose();
  };

  return (
    <Box
      position="absolute"
      left="0px"
      right="0px"
      top="55px"
      ref={collapseWrapperRef}
      zIndex="1000"
      data-testid="collapsable-list-wrapper"
    >
      <Collapse in={isOpen}>
        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.stroke"
          data-testid="collapsable-list"
          data-isopen={isOpen ? 'true' : 'false'}
          maxH="200px"
          overflowY="auto"
        >
          {
            items.map((item) => (
              <ListItem
                value={item}
                onClick={handleItemClick}
                key={`list-item-${item}`}
              >
                {item}
              </ListItem>
            ))
          }
        </Box>
      </Collapse>
    </Box>
  );
});

export default CollapsableList;
