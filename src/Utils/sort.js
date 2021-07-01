import {summa} from './helpers';

export const newList = (list) => {
  let val = null;
  let val2 = null;
  let list2 = list
    .sort((a, b) => a.Number - b.Number)
    .map((item) => {
      let obj;
      if (val !== item.Number) {
        obj = {...item, prevNumber: val};
        val = item.Number;
      } else {
        obj = {...item, Number: val + 1, prevNumber: val};
        val++;
      }

      return obj;
    });

  return list2
    .sort((b, a) => a.Number - b.Number)
    .map((item) => {
      let obj = {...item, nextNumber: val2};
      val2 = item.Number;
      return obj;
    })
    .sort((a, b) => a.Number - b.Number);
};

export const sortCard = (list) => {
  const n1 = [];
  const n2 = [];
  const n3 = [];
  list
    .sort((a, b) => {
      if (a.Name < b.Name) {
        return -1;
      }
      if (a.Name > b.Name) {
        return 1;
      }
    })
    .forEach((item) => {
      if (item.CurrentAmount) {
        if ((item.CurrentAmount) === item.Amount) n3.push(item);
        else n2.push(item);
      } else n1.push(item);
    });
  return [...n1, ...n2, ...n3];
};
