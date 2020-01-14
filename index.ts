export const random = (i: number) => Math.random().toString(16).substr(2, i)
export const genUUID = () => `${random(8)}-${random(4)}-${random(4)}-${random(4)}-${random(12)}`

export const assign = Object.assign || ((a: any, b: any) => {
  for (const k in b) a[k] = b[k]
  return a
})

export interface GAAllParameters {
  [key: string]: string | number | boolean | undefined | string[]

  t?: string
  readonly v: number
  readonly tid: string
  readonly cid: string
  uid?: string

  sc?: 'start' | 'end'
  ni?: boolean

  aip?: boolean
  uip?: string
  ua?: string
  geoid?: string
  ds?: string
  qt?: number

  dr?: string
  cn?: string
  cs?: string
  cm?: string
  ck?: string
  cc?: string
  ci?: string
  gclid?: string
  dclid?: string

  sr?: string
  vp?: string
  de?: string
  sd?: string
  ul?: string
  je?: string
  fl?: string

  an?: string
  aid?: string
  av?: string
  aiid?: string

  dl?: string
  dh?: string
  dp?: string
  dt?: string

  linkid?: string

  cg1?: string[]
  cg2?: string[]
  cg3?: string[]
  cg4?: string[]
  cg5?: string[]
}
export type GAParameters = Omit<GAAllParameters, 'v' | 'tid' | 'cid'>

interface IGoogleAnalytics {
  pageView (dl: null | undefined, dh: string, dp: string, other?: GAParameters): Promise<boolean>
  pageView (dl: string, dh?: string, dp?: string, other?: GAParameters): Promise<boolean>
}

/**
 * https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
 */
export default class GoogleAnalytics implements IGoogleAnalytics {
  public defaultValues: GAAllParameters
  private readonly fetch: typeof fetch

  constructor (
    tid: string,
    cid = genUUID(),
    fetcher?: typeof fetch,
    private readonly root = 'https://www.google-analytics.com/collect'
  ) {
    this.fetch = fetcher || fetch
    this.defaultValues = { v: 1, tid, cid }
  }

  public genSearchParams (data: GAParameters) {
    const body = new URLSearchParams()
    const d = assign(assign({}, this.defaultValues), data)
    for (const key in d) {
      let value = d[key]
      if (key.startsWith('cg')) {
        value = Array.isArray(value) ? value.join('/') : undefined
      } else {
        switch (key) {
          default:
        }
      }
      switch (typeof value) {
        case 'boolean':
          body.append(key, (+value).toString())
          break
        case 'string':
          body.append(key, encodeURIComponent(value))
          break
        case 'number':
          body.append(key, value.toString())
      }
    }
    return body
  }

  public post (data: GAParameters) {
    return this
      .fetch(this.root, {
        method: 'POST',
        cache: 'no-cache',
        body: this.genSearchParams(data).toString().replace(/%25/g, '%')
      })
      .then(it => it.ok, e => {
        console.error(e)
        return false
      })
  }

  public pageView (dl: string | null | undefined, dh?: string, dp?: string, other?: GAParameters) {
    if (dl == null) dl = undefined
    return this.post(assign(other || { }, {
      dl,
      dh,
      dp
    }))
  }

  public event (ec: string, ea: string, el?: string, ev?: number, other?: GAParameters) {
    return this.post(assign(other || { }, {
      ec,
      ea,
      el,
      ev
    }))
  }

  public exception (exd?: string, exf?: boolean, other?: GAParameters) {
    return this.post(assign(other || { }, {
      exd,
      exf
    }))
  }

  public social (sn: string, sa: string, st: string, other?: GAParameters) {
    return this.post(assign(other || { }, {
      sn,
      sa,
      st
    }))
  }
}
