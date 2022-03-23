import React from "react";
import styles from './Input.module.scss';

const Input = (props) => {

  return (
    <>
      <div className={styles.form}>
        <input
          type={props.type}
          className={styles.forminput}
          placeholder={props.placeholder}
          {...props}
        />
      </div>
    </>
  );
};

export default Input;
