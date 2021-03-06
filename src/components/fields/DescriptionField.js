import React, {PropTypes} from "react";

function DescriptionField(props) {
  const {id, description} = props;
  if (typeof description === "string") {
    return <p id={id} className="field-description">{description}</p>;
  } else {
    return <div id={id} className="field-description">{description}</div>;
  }
}

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  };
}

export default DescriptionField;
