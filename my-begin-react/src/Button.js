import PropTypes from "prop-types";
import styles from "./Button.module.css";
function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
}

Button.propTypes = {
  // propTypes import 후 props의 타입을 지정할수 있음. isRequired : 필수값
  text: PropTypes.string.isRequired,
};

export default Button;
