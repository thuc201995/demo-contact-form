import React from "react";

const FormTextarea = ({
  label,
  handleChange,
  content,
  contentAction,
  classAction,
  name,
  placeholder,
  onBlur
}) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          className={`textarea ${classAction || ""}`}
          placeholder={placeholder}
          onChange={handleChange}
          value={content}
          name={name}
          onBlur={onBlur}
        />
      </div>
      {contentAction && (
        <p className={`help ${classAction}`}>{contentAction}</p>
      )}
    </div>
  );
};

export default FormTextarea;
