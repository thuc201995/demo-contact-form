import React, { PureComponent } from "react";

class InputField extends PureComponent {
  render() {
    const {
      value,
      classAction,
      placeholder,
      contentAction,
      iconLeft,
      iconRight,
      label,
      name,
      onIputChange,
      onBlur
    } = this.props;
    return (
      <div className="field">
        <label className="label">{label}</label>
        <div
          className={`control ${(iconLeft && "has-icons-left") ||
            ""} ${(iconRight && "has-icons-right") || ""}`}
        >
          <input
            className={`input ${classAction || ""}`}
            type="text"
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onIputChange}
            onBlur={onBlur}
          />
          {iconLeft && (
            <span className="icon is-small is-left">
              <i className={`fas ${iconLeft}`} />
            </span>
          )}
          {iconRight && (
            <span className="icon is-small is-right">
              <i className={`fas ${iconRight}`} />
            </span>
          )}
        </div>
        {contentAction && (
          <p className={`help ${classAction}`}>{contentAction}</p>
        )}
      </div>
    );
  }
}

export default InputField;
