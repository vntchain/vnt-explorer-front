import React, { useEffect, useState } from 'react'
import marked from 'marked'

import Prism from './prism'
import './prism.css'

import styles from './MdConverter.scss'

export default function MarkdownConverter(props) {
  const [mdContent, setMdContent] = useState('')
  const file = require(`../../assets/docs/${props.filePath}`)

  useEffect(() => {
    fetch(file)
      .then(res => {
        return res.text()
      })
      .then(text => {
        setMdContent(marked(text))
      })
  }, [])
  useEffect(
    () => {
      Prism.highlightAll()
    },
    [mdContent]
  )

  return (
    <div className={styles.container}>
      <div
        className={styles.md}
        dangerouslySetInnerHTML={{ __html: mdContent }}
      />
    </div>
  )
}
