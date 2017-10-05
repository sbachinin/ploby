import lodashCurry from 'lodash.curry';

export const log = lodashCurry((prop, data) => {
  // if (!data[prop]) return
  console.log(prop, ': ', JSON.stringify(data[prop], null, 2));
})