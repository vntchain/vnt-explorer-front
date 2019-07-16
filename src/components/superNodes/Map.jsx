import React, { Fragment, useEffect } from 'react'
import { Spin } from 'antd'
import L from 'leaflet'

import LocalText from 'i18n/LocalText'

import styles from 'containers/Common.scss'
import 'leaflet/dist/leaflet.css'

const isMainnet = process.env.REACT_APP_NET === 'mainnet'
const superNodecolor = isMainnet ? '#3389ff' : '#4cc159'

export default function Map(props) {
  const { context } = props
  const finishFetching = context && context.hasOwnProperty('data')
  useEffect(() => {
    const lMap = L.map('mapid').setView([51.505, -0.09], 13)
    /* const accessToken =
      'pk.eyJ1Ijoic2xhY2tidWZmZXIiLCJhIjoiY2pybXhjaXY5MG00NjQ0bzU4azlhejdvNCJ9.V_3jCOQsuva5_9OcnXBLCg' */
    const accessToken =
      'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    L.tileLayer(
      `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${accessToken}`,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken
      }
    ).addTo(lMap)
  })
  const genSubTitle = context => {
    let superNode = 0
    if (context && context.data) {
      context.data.forEach(
        ({ IsSuper }) => (IsSuper === 1 ? superNode++ : superNode)
      )
      return (
        <div className={styles.multiTitle}>
          <span className={styles.multiTitle__1}>
            <span style={{ color: superNodecolor }}>•</span>
            <LocalText id="snSubTitleComp1" />
            {superNode}
          </span>

          <span className={styles.multiTitle__2}>
            <span style={{ color: '#ff9603' }}>•</span>
            <LocalText id="snSubTitleComp2" />
            {context.count - superNode}
          </span>

          <span className={styles.multiTitle__3}>
            <LocalText id="snSubTitleComp3" />
            {context.count}
          </span>
        </div>
      )
    }
    return (
      <div className={styles.multiTitle}>
        <span className={styles.multiTitle__1}>
          <span style={{ color: superNodecolor }}>•</span>
          <LocalText id="snSubTitleComp1" />
          --
        </span>

        <span className={styles.multiTitle__2}>
          <span style={{ color: '#ff9603' }}>•</span>
          <LocalText id="snSubTitleComp2" />
          --
        </span>

        <span className={styles.multiTitle__3}>
          <LocalText id="snSubTitleComp3" />
          --
        </span>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <Spin spinning={context && context.isLoading}>
        {/* set min-height for the div */}
        <div
          className={styles.tableWithCount}
          style={{ backgroundColor: 'white' }}
        >
          {finishFetching && (
            <Fragment>
              {/* 请求越界的分页时，data 为 []，count 仍返回总区块数，区块数组件和表单分页栏需要作判断 */}
              {genSubTitle(context)}
              <div id="mapid" style={{ width: '100%', height: '6rem' }} />
            </Fragment>
          )}
        </div>
      </Spin>
    </div>
  )
}

/* import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

export default class SimpleExample extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <div>
        <Map
          style={{ height: '600px', width: '1000px' }}
          center={position}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
} */
