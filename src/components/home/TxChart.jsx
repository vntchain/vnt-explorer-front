import React from 'react'
import { connect } from 'react-redux'
import { Chart, Geom, Axis, Tooltip } from 'bizcharts'
import DataSet from '@antv/data-set'

import LocalText from 'i18n/LocalText'
import fontZoomLevel from 'utils/zoomLevel'

import styles from './TxChart.scss'

const TICK_COUNT_Y = 4

const tooltipConfig = {
  containerTpl:
    "<div class='g2-tooltip'><p class='g2-tooltip-title'></p><table class='g2-tooltip-list'></table></div>",
  itemTpl:
    "<tr class='g2-tooltip-list-item'><td style='color:{color}'>• {name}&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{value}</td></tr>",
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

const mapStateToProps = ({ global: { isMobile } }) => {
  return {
    isMobile
  }
}

export default connect(mapStateToProps)(function AreaChart({ data, isMobile }) {
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
    offset: 22 * fontZoomLevel
  }
  const chartData = data

  const dv = new DataSet.View().source(chartData)
  dv.transform({
    type: 'fold',
    fields: ['数量'],
    key: 'type',
    value: 'value'
  })

  let ticks = []
  if (chartData.length) {
    const { 数量: max } = chartData
      .concat()
      .reduce((a, b) => ({ 数量: Math.max(a['数量'], b['数量']) }))
    const { 数量: min } = chartData
      .concat()
      .reduce((a, b) => ({ 数量: Math.min(a['数量'], b['数量']) }))
    let prettyMax = Math.ceil(Math.ceil(max) / 5) * 5
    const prettyMin = Math.floor(Math.floor(min) / 5) * 5
    while ((prettyMax - prettyMin) % (TICK_COUNT_Y - 1)) {
      prettyMax += 1
    }
    const gap = (prettyMax - prettyMin) / (TICK_COUNT_Y - 1)
    Array(TICK_COUNT_Y)
      .fill('_')
      .forEach((_, i) => ticks.push(prettyMin + i * gap))
  }

  const scale = {
    value: {
      tickCount: 4,
      // max: Math.ceil(maximum / 10) * 10,
      // min: Math.floor(minimum / 10 / 1.05) * 10
      ticks,
      nice: false
    },
    time: {
      range: [0, 1],
      tickCount: isMobile ? 4 : 7
    },
    type: 'linear'
  }
  return (
    <div className={styles.txChart}>
      <h3 className={styles.heading}>
        <LocalText id="chartTitle" />
      </h3>
      <div className={styles.chart}>
        <Chart
          height={225 * fontZoomLevel}
          data={dv}
          padding={'auto'}
          scale={scale}
          forceFit
        >
          <Tooltip crosshairs {...tooltipConfig} />
          <Axis
            name="time"
            label={labelX}
            tickLine={{ length: 0 }}
            line={{ lineDash: [4], stroke: '#e5e5e5' }}
          />
          <Axis name="value" label={labelY} />
          <Geom
            type="area"
            position="time*value"
            tooltip={false}
            color={['type', ['#d1e9ff', 'white']]}
            shape="smooth"
          />
          <Geom
            type="line"
            position="time*value"
            shape="smooth"
            size={2}
            color={['type', ['#3baeff', 'white']]}
          />
        </Chart>
      </div>
    </div>
  )
})
