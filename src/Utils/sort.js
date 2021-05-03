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
