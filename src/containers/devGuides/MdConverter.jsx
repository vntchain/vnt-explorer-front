import React, { useEffect, useState } from 'react'
import marked from 'marked'

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

  return (
    <div className={styles.container}>
      <div
        className={styles.md}
        dangerouslySetInnerHTML={{ __html: mdContent }}
      />
    </div>
  )
}
