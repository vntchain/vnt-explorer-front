import React, { Component } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import styles from './Introduction.scss'

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true
}

export default class Sample extends Component {
  state = {
    numPages: null
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  render() {
    const { numPages } = this.state

    return (
      <div className={styles.container}>
        <Document
          file={require('../../assets/docs/white-paper.pdf')}
          onLoadSuccess={this.onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              className={styles.page}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={800}
              loading={index === 0 ? 'Loading pages...' : ''}
            />
          ))}
        </Document>
      </div>
    )
  }
}
