import url from 'url'

export const random1To100 = () => {
  return Math.round(Math.random() * 100)
}

export const randomTimestamp = () => {
  return new Date().getTime() -
    Math.round(Math.random() * (200000000 - 1000000) + 1000000)
}

export const one = (ctx, next) => {
  const { query } = url.parse(ctx.request.url, true).query
  const {
    fieldGroup, fields: [ field1 ], sampleTime, shift,
    coValueFilter: { idFieldFilter } } = JSON.parse(query).timeseries[0]

  const compoundId = Object.entries(idFieldFilter).reduce((result, pair) => {
    return Object.assign({}, result, {
      [pair[0]]: pair[1]['$eq']
    })
  }, {})

  console.log(shift)
  console.log(idFieldFilter)
  console.log(fieldGroup)
  console.log(sampleTime)
  console.log(field1)

  ctx.body = {
    code: 0,
    message: '',
    results: [{
      compoundId: compoundId,
      field: field1,
      timestamp: randomTimestamp(),
      value: random1To100()
    }]
  }
}
