import React from 'react'
import PropTypes from 'prop-types'

import { LangContext } from './LangContext'
import cn from './locale/cn'
import en from './locale/en'

const locale = {
  cn,
  en
}

export default function LocalText(props) {
  return (
    <LangContext.Consumer>
      {({ lang }) => locale[lang][props.id]}
    </LangContext.Consumer>
  )
}

LocalText.propTypes = {
  id: PropTypes.string.isRequired
}

/* export default class FormattedText extends Component {
  static contextType = LangContext
  render() {
    return <div>{this.context}</div>
  }
} */
