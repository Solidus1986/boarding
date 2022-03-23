import React from "react";
import styles from './Button.module.scss';

const Button = (props) => {
  return (
    <>
      {props.type === "submit" &&
        <button onClick={props.onClick} className={`${styles.btn} , ${styles.btnPrimary}`}>
          <span>{props.name}</span>
        </button>
      }
      {props.type === "button" &&
        <button onClick={props.onClick} className={`${styles.btn} , ${styles.btnSecondary}`}>
          <span>{props.name}</span>
        </button>
      }
    </>
  );
};

export default Button;
