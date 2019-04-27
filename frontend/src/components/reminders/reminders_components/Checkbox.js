
import React from "react";

const Checkboxe = () => {
  return (  <form>
    <p>
      <label>
        <input id="indeterminate-checkbox" type="checkbox" />
        <span className="spancheckbox">Daily</span>
      </label>
    </p>
    <p>
      <label>
        <input id="indeterminate-checkbox" type="checkbox" />
        <span className="spancheckbox">Weekly</span>
      </label>
    </p>
    <p>
      <label>
        <input id="indeterminate-checkbox" type="checkbox" />
        <span className="spancheckbox">Monthly</span>
      </label>
    </p>
    <p>
      <label>
        <input id="indeterminate-checkbox" type="checkbox" />
        <span className="spancheckbox">Custom</span>
      </label>
    </p>
  </form>
  
  );
};

Checkboxe.defaultProps = {

};

export default Checkboxe;