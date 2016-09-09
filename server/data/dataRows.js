import url from 'url'

export const random1To100 = () => {
  return Math.round(Math.random() * 2000) + 2000
}

export const randomBoolean = () => {
  return Math.random() > 0.5
}

export const randomTimestamp = () => {
  return new Date().getTime() - // 1000000 - 200000000
    Math.round(Math.random() * (200000000 - 1000000) + 1000000)
}

// 100000 - 10000000
export const randomCount = () => {
  return Math.round(Math.random() * (10000000 - 100000) + 100000)
}

export const page1Data = (size, end) => {
  let result = []
  for (let i = 0; i < size; i++) {
    result.push({
      'timestamp': end - 60000 * i,
      'values': [randomBoolean()]
    })
  }

  return result
}

export const list = (ctx, next) => {
  const { query } = url.parse(ctx.request.url, true).query
  const {
    fieldGroup, fields: [ sensor1 ], timeRange: { start, end },
    coValueFilter: { idFieldFilter }, size, page } = JSON.parse(query).timeseries[0]

  const compoundId = Object.entries(idFieldFilter).reduce((result, pair) => {
    return Object.assign({}, result, {
      [pair[0]]: pair[1]['$eq']
    })
  }, {})

  console.log(fieldGroup)
  console.log(sensor1)
  console.log(start)
  console.log(end)
  console.log(size)
  console.log(page)
  console.log(compoundId)

  console.log({
    code: 0,
    message: '',
    results: [{
      pageInfo: { size, pageNum: page, pageSize: size },
      compoundId,
      fields: [ sensor1 ],
      rows: page1Data(size, end)
    }]
  })

  ctx.body = {
    code: 0,
    message: '',
    results: [{
      pageInfo: { size, pageNum: page, pageSize: size },
      compoundId,
      fields: [ sensor1 ],
      rows: page1Data(size, end)
    }]
  }
}
