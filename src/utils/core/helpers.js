const getPromise = (promise) =>
  promise.then(data => {
    return [null, data]
  }).catch(err => {
    console.log('Error: ' + err)
    return [err]
  })

const addDays = (date, numberDays) => {
  const resultado = new Date(date);
  resultado.setDate(resultado.getDate() + numberDays);
  return resultado;
}

const initialOfDay = (date = Date.now()) => new Date(date).setHours(0, 0, 0)
const finalOfDay = (date = Date.now()) => new Date(date).setHours(23, 59, 59)

const startOfTheWeek = (date = Date.now()) => {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

module.exports = {
  getPromise,
  addDays,
  initialOfDay,
  finalOfDay,
  startOfTheWeek,
}