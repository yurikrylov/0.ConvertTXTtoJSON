let a = [{
    name: "petrov",
    datestart: 1,
    dateend: 2
  }, {
    name: "ivanov",
    datestart: 1,
    dateend: 2
  }, {
    name: "ivanov",
    datestart: 3,
    dateend: null
  }];
  
  let b = function toOneObject(a) {
    let c = [];
    a.map((value) => {
      if (!c.find(({name}) => name === value.name)) {
        let d = {
          name: value.name,
          datestart: [value.datestart],
          dateend: [value.dateend]
        };
        c.push(d);
      } else {
        let d = c.find(({name}) => name === value.name);
        d.dateend.push(value.dateend);
        d.datestart.push(value.datestart);
      }
    });
    return c;
  };
  let o = b(a);
  console.log(o);
  