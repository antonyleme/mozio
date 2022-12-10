import { getIfCityIsValid } from 'api';
import { ISelectCityOption } from 'common/types';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Updater, useImmer } from 'use-immer';

import { v4 as uuid } from 'uuid';

interface IUseSearchForm {
  destinies: ISelectCityOption[],
  updateDestinies: Updater<ISelectCityOption[]>,
  date: string,
  setDate: (_date: string) => void,
  isDateInvalid: boolean,
  passengers: string,
  setPassengers: (_passengers: string) => void,
  isPassengersInvalid: boolean,
  isFormInvalid: boolean,
  submiting: boolean,
  minDate: () => string,
  onChange: (value: string, index: number) => void,
  add: () => void,
  remove: (id: string) => void,
  getPlaceholder: (index: number) => string,
  handleSubmit: () => Promise<void>
}

export interface IUseSearchFormProps {
  submit: (values: ISelectCityOption[], date: string, passengers: string) => void,
}

const useSearchForm = ({ submit }: IUseSearchFormProps): IUseSearchForm => {
  const [destinies, updateDestinies] = useImmer<ISelectCityOption[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [date, setDate] = React.useState('');
  const [isDateInvalid, setIsDateInvalid] = React.useState(false);

  const [passengers, setPassengers] = React.useState('1');
  const [isPassengersInvalid, setIsPassengersInvalid] = React.useState(false);

  React.useEffect(() => {
    const defaultCities = searchParams.get('cities')?.split(',');
    const defaultDate = searchParams.get('date');
    const defaultPassengers = searchParams.get('passengers');

    if (defaultCities) {
      const citiesFromUrl = defaultCities.map((city) => ({
        id: uuid(),
        value: city,
        isInvalid: false,
      }));

      if (citiesFromUrl.length < 2) {
        citiesFromUrl.push({
          id: uuid(),
          value: '',
          isInvalid: false,
        });
      }
      updateDestinies(() => citiesFromUrl);
    } else {
      updateDestinies(() => [
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
      ]);
    }
    if (defaultDate) setDate(defaultDate);
    if (defaultPassengers) setPassengers(defaultPassengers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const finalObject: {
      date?: string,
      passengers?: string,
      cities?: string
    } = {};

    if (date) {
      finalObject.date = date;
    }

    if (passengers) {
      finalObject.passengers = passengers;
    }

    if (destinies.length) {
      finalObject.cities = destinies.map((d) => d.value).join(',');
    }

    if (date || passengers || destinies) {
      setSearchParams(finalObject);
    }
  }, [date, passengers, destinies, setSearchParams]);

  React.useEffect(() => {
    if (date && new Date(date) > new Date() && isDateInvalid) {
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

  const [submiting, setSubmiting] = React.useState(false);

  const handleSubmit = async (): Promise<void> => {
    if (getEmptyValuesLength() > 0) {
      return;
    }

    let hasInvalid = false;

    const today = new Date();

    if (!date || new Date(date) <= today) {
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

  const isFormInvalid = isDateInvalid
    || isPassengersInvalid
    || getEmptyValuesLength() > 0;

  return {
    destinies,
    updateDestinies,
    date,
    setDate,
    isDateInvalid,
    passengers,
    setPassengers,
    isPassengersInvalid,
    isFormInvalid,
    submiting,
    minDate,
    getPlaceholder,
    handleSubmit,
    add,
    remove,
    onChange,
  };
};

export default useSearchForm;
