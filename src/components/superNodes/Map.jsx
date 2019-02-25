import React, { useEffect } from 'react'
import L from 'leaflet'

import 'leaflet/dist/leaflet.css'

export default function Map() {
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
  return (
    <div>
      <div>Map header</div>
      <div id="mapid" style={{ width: '100%', height: '6rem' }} />
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
