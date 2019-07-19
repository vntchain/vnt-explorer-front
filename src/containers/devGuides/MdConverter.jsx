import React, { useEffect, useState } from 'react'
import marked from 'marked'

import Prism from './prism'
import './prism.css'

import styles from './MdConverter.scss'

export default function MarkdownConverter(props) {
  const [mdContent, setMdContent] = useState('')
  // const file = require(`../../assets/docs/${props.filePath}`)
  const { filePath } = props

  useEffect(() => {
    const fileAPi = 'https://api.github.com'
    const fileRepo = 'vntchain/vnt-documentation'
    // fetch(file)
    fetch(`${fileAPi}/repos/${fileRepo}/contents/${filePath}`)
      .then(res => {
        return res.text()
      })
      .then(text => {
        const obj = JSON.parse(text)
        const content = obj.content
        const encoding = obj.encoding
        const str = new Buffer(content, encoding).toString()
        setMdContent(marked(str))
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
      {
        mdContent ? <div
          className={styles.md}
          dangerouslySetInnerHTML={{ __html: mdContent }}
        /> : (
          <div className={styles.tip}>
            <p>内容来自<a href="" target="_blank">github</a></p>
            <p>加载中……</p>
            <p>或者<a href={`https://github.com/vntchain/vnt-documentation/blob/master/${filePath}`} target="_blank">直接点击来源</a>查看</p>
          </div>
        )
      }
    </div>
  )
}
