import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Calculator from './RemComponents/Calculator';
import SelectCategory from './RemComponents/SelectCategory';
import SelectProduct from './RemComponents/SelectProduct';
import SelectZone from './RemComponents/SelectZone';

export default () => {
  const [Selection, setSelection] = useState(<SelectCategory />);
  const state = useSelector((state) => state.RemainderState);
  useEffect(() => {
    if (state.type && state.zone && state.product) {
      setSelection(<Calculator />);
    } else if (state.type && state.zone) {
      setSelection(<SelectProduct />);
    } else if (state.type) {
      setSelection(<SelectZone />);
    } else {
      setSelection(<SelectCategory />);
    }
  }, [state]);
  return <>{Selection}</>;
};
