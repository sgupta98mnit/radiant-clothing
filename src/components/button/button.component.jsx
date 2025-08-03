import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[BUTTON_TYPE_CLASSES]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
