import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeAmountAC,
  getProducts,
  setProductAC,
} from '../../Redux/RemainderReducer';
import Calculator from '../../AuxiliaryComponents/Calculator';
import SelectCategory from './RemComponents/SelectCategory';
import SelectProduct from './RemComponents/SelectProduct';
import SelectZone from './RemComponents/SelectZone';

export default React.memo(() => {
  const [Selection, setSelection] = useState(<SelectCategory />);
  const state = useSelector((state) => state.RemainderState);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (state.type && state.zone && state.product) {
    if (state.type) {
      setSelection(<SelectProduct />);
    }
    // if (state.type) {
    //   setSelection(<SelectZone />);
    // } else
    else {
      setSelection(<SelectCategory />);
    }
  }, [state]);
  return <>{Selection}</>;
});
