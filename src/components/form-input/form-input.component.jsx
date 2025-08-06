import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input
        className="form-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...otherProps}
      />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
