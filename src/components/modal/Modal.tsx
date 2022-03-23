import React from 'react';
import Styles from './Modal.module.scss';

export default function modal() {
  return (
    <div className={Styles.backModal}>
      <div className={Styles.modal} >
        <h5>Limit call API</h5>
        <p>please wait 60s before new request</p>
      </div>
    </div>
  )
}
