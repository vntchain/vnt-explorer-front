import React, { Fragment } from 'react'

import LocalText from 'i18n/LocalText'

import styles from 'components/Count.scss'

export default function NodeCount(props) {
  return (
    <div className={styles.container}>
      <div className={styles.subTitle}>
        {props.context && props.context.data ? (
          <Fragment>
            <span style={{ color: '#4cc159' }}>•</span>{' '}
            <LocalText id={`${props.idPrefix}Comp1`} />{' '}
            {props.context.data.Super}
            <span style={{ color: '#ff9603', marginLeft: '.2rem' }}>
              •
            </span>{' '}
            <LocalText id={`${props.idPrefix}Comp2`} />{' '}
            {props.context.data.Candi}
            <span style={{ marginLeft: '.2rem' }}>
              <LocalText id={`${props.idPrefix}Comp3`} />
              {props.context.data.Total}
            </span>
          </Fragment>
        ) : (
          ' '
        )}
      </div>
    </div>
  )
}
