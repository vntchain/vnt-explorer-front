import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import LocalText from 'i18n/LocalText'
import apis from 'utils/apis'
import withLang from 'i18n/withLang'

import styles from './BlockTx.scss'

function BriefBox(props) {
  const hasData =
    props.context && props.context.data && props.context.data.length > 0

  const ChildComp = props.comp

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.header__title}>
          <span>
            <LocalText id={props.title} />
          </span>
        </div>

        {hasData && (
          <span>
            <Link to={apis.blocks}>
              <LocalText id="lField1" />
            </Link>
          </span>
        )}
      </div>

      {props.context &&
        props.context.error && <Fragment>{props.errComp}</Fragment>}

      {hasData && <ChildComp data={props.context.data} />}
    </div>
  )
}

BriefBox.propTypes = {
  comp: PropTypes.element.isRequired
}

export default withLang(BriefBox)
