import React from 'react'
import { connect } from 'react-redux'
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts'
import DataSet from '@antv/data-set'
import { Spin } from 'antd'

import LocalText from 'i18n/LocalText'
import fontZoomLevel from 'utils/zoomLevel'
import { enMonth } from 'constants/month'

import styles from './TxChart.scss'

const TICK_COUNT_Y = 4

const isMainnet = process.env.REACT_APP_NET === 'mainnet'
const mainColor = isMainnet
  ? { lineColor: '#3baeff', areaColor: '#d1e9ff' }
  : { lineColor: '#cdeed1', areaColor: '#dbf3de' }

const mapStateToProps = ({ global: { isMobile, language } }) => {
  return {
    isMobile,
    language
  }
}

export default connect(mapStateToProps)(function TxChart({
  isMobile,
  language,
  context
}) {
  let chartData = []
  let timeLength = 0
  if (context && context.data && Array.isArray(context.data)) {
    timeLength = context.data.length
    chartData = context.data.map(item => ({
      数量: item.Volume,
      number: item.Volume,
      time:
        language === 'cn'
          ? `${item.Month}月${item.Day}日`
          : `${enMonth[item.Month]} '${item.Day}`,
      date: `${item.Year}-${item.Month}-${item.Day}`,
      // 价格: `￥${item.PriceCny}`
      价格: item.PriceCny,
      priceCny: item.PriceCny,
      // price: `$${item.PriceUsd}`
      price: item.PriceUsd,
      priceUsd: item.PriceUsd
    }))
  }
  const isLangCn = language === 'cn'

  const labelX = {
    textStyle: {
      fill: '#333',
      fontSize: isMobile ? 12 * fontZoomLevel : 14 * fontZoomLevel
      // ,textAlign: 'start'
    },
    offset: 24 * fontZoomLevel
  }
  const labelY = {
    textStyle: {
      fill: '#333',
      fontSize: isMobile ? 12 * fontZoomLevel : 14 * fontZoomLevel
      // textAlign: 'start'
    },
    offset: 12 * fontZoomLevel
  }
  const title = {
    offset: 95,
    textStyle: {
      fontSize: isMobile ? 11 * fontZoomLevel : 12 * fontZoomLevel,
      textAlign: 'center',
      fill: '#333'
    }, // 坐标轴文本属性配置
    position: 'center'
  }
  const tooltipConfig = {
    containerTpl:
      "<div class='g2-tooltip'><p class='g2-tooltip-title'></p><table class='g2-tooltip-list'></table></div>",
    itemTpl:
      "<tr class='g2-tooltip-list-item'>" +
      "<td style='color:{color}'>• {name}&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
      '<td>{value}</td>' +
      '</tr>',
    offset: 50,
    'g2-tooltip': {
      position: 'absolute',
      visibility: 'hidden',
      border: '1px solid #efefef',
      backgroundColor: '#000',
      color: '#fff',
      opacity: '0.65',
      padding: `${5 * fontZoomLevel}px ${15 * fontZoomLevel}px`,
      transition: 'top 200ms,left 200ms',
      margin: `${-4 * fontZoomLevel}px ${-12 * fontZoomLevel}px`
    }
  }

  const dv = new DataSet.View().source(chartData)
  dv.transform({
    type: 'fold',
    fields: isLangCn ? ['数量'] : ['number'],
    key: 'type',
    value: 'number'
  })
  dv.transform({
    type: 'fold',
    fields: isLangCn ? ['价格'] : ['price'],
    key: 'pricekey',
    value: 'price'
  })

  const calTicks = (data, target) => {
    const tempTicks = []
    if (data.length > 1) {
      const { [target]: max } = data
        .concat()
        .reduce((a, b) => ({ [target]: Math.max(a[target], b[target]) }))
      const { [target]: min } = data
        .concat()
        .reduce((a, b) => ({ [target]: Math.min(a[target], b[target]) }))
      const prettyMin = Math.floor(Math.floor(min) / 5) * 5
      let prettyMax = Math.ceil(Math.ceil(max) / 5) * 5
      while ((prettyMax - prettyMin) % ((TICK_COUNT_Y - 1) * 5)) {
        prettyMax += 1
      }
      const gap = (prettyMax - prettyMin) / (TICK_COUNT_Y - 1)
      Array(TICK_COUNT_Y)
        .fill('_')
        .forEach((_, i) => tempTicks.push(prettyMin + i * gap))
    }
    return tempTicks
  }
  const countZero = str => str.replace('.', '').split('').length
  const calPriceTicks = (data, target) => {
    const tempTicks = []
    if (data.length > 1) {
      const floatPatten = new RegExp(/^0.0+/)
      const { [target]: max } = data
        .concat()
        .reduce((a, b) => ({ [target]: Math.max(a[target], b[target]) }))
      const maxArr = max.toString().match(floatPatten) || [0] //0.001 => [0.00, 1]
      const { [target]: min } = data
        .concat()
        .reduce((a, b) => ({ [target]: Math.min(a[target], b[target]) }))
      const minArr = min.toString().match(floatPatten) || [0] //0.0001 => [0.000, 1]
      const multi = Math.max(countZero(maxArr[0]), countZero(minArr[0])) + 1 //Math.max(countZero(0.00), countZero(0.000)) => 4 + 1
      const ceilMax = max * Math.pow(10, multi) //0.001 => 100
      const ceilMin = min * Math.pow(10, multi) //0.0001 => 10
      const prettyMin = Math.floor(Math.floor(ceilMin) / 5) * 5
      let prettyMax = Math.ceil(Math.ceil(ceilMax) / 5) * 5
      while ((prettyMax - prettyMin) % ((TICK_COUNT_Y - 1) * 5)) {
        prettyMax += 1
      }
      const gap = (prettyMax - prettyMin) / (TICK_COUNT_Y - 1)
      Array(TICK_COUNT_Y)
        .fill('_')
        .forEach((_, i) => tempTicks.push((prettyMin + i * gap)/Math.pow(10, multi)))
    }
    return tempTicks
  }

  const ticks = calTicks(chartData, 'number')
  const cnyTicks = calPriceTicks(chartData, 'priceCny')
  const usdTicks = calPriceTicks(chartData, 'priceUsd')

  const scale = {
    number: {
      tickCount: 4,
      ticks,
      nice: true,
      alias: isLangCn ? '每日交易数量' : 'Transactions per Day'
      // min: 0
    },
    time: {
      range: [0, 1],
      tickCount: isMobile ? (timeLength > 4 ? 4 : timeLength) : timeLength
    },
    price: {
      tickCount: 4,
      ticks: isLangCn ? cnyTicks : usdTicks,
      nice: true,
      alias: isLangCn ? '价格(￥)' : 'Price($)'
    }
  }
  return (
    <div className={styles.txChart}>
      <h3 className={styles.heading}>
        <LocalText id="chartTitle" />
      </h3>

      <Spin spinning={!(context && !context.isLoading)}>
        <div className={styles.chart}>
          <Chart
            height={225 * fontZoomLevel}
            data={dv}
            padding={['auto', 'auto', 'auto', 110]}
            scale={scale}
            forceFit
          >
            <Legend />
            <Tooltip crosshairs {...tooltipConfig} />
            <Axis
              name="time"
              label={labelX}
              tickLine={{ length: 0 }}
              line={{ lineDash: [4], stroke: '#e5e5e5' }}
            />
            <Axis name="number" label={labelY} title={title} />
            <Axis name="price" label={labelY} position="right" title={title} />
            <Geom
              type="area"
              position="time*number"
              tooltip={false}
              color={['type', [mainColor.areaColor, 'white']]}
              shape="smooth"
            />
            <Geom
              type="line"
              position="time*number"
              shape="smooth"
              size={2}
              color={['type', [mainColor.lineColor, 'white']]}
            />
            <Geom
              type="area"
              position="time*price"
              tooltip={false}
              color={['pricekey', ['#fcd4d4', 'white']]}
              shape="smooth"
            />
            <Geom
              type="line"
              position="time*price"
              shape="smooth"
              size={2}
              color={['pricekey', ['#ee2b2b', 'white']]}
            />
          </Chart>
        </div>
      </Spin>
    </div>
  )
})
