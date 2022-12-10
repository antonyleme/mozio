import { useToast } from '@chakra-ui/react';
import { getCitiesByKeyword } from 'api';
import { CityDataType } from 'common/types';
import React from 'react';

interface IUseCitiesFilter {
  filtering: boolean,
  filteredItems: string[],
  filterValues: (_val: string) => Promise<void>
}

const useCitiesFilter = (): IUseCitiesFilter => {
  const [filtering, setFiltering] = React.useState(false);
  const [filteredItems, setFilteredItems] = React.useState<string[]>([]);
  const toast = useToast();

  const filterValues = async (newValue: string): Promise<void> => {
    setFiltering(true);

    let newItems: CityDataType[] = [];

    try {
      newItems = await getCitiesByKeyword(newValue);
      setFilteredItems(newItems.map((i) => i[0] as string));
    } catch (error: unknown) {
      toast({
        status: 'error',
        title: 'Ops',
        description: 'Something went wrong',
      });
    }

    setFiltering(false);
  };

  return {
    filtering,
    filteredItems,
    filterValues,
  };
};

export default useCitiesFilter;
