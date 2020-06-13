import React from 'react';

const NewlyAdded = (props) => (
  <div className="newlyadded">
    <h2>Newly Added Police</h2>
    {props.newlyAdded.map(info => {
      return (
        <p>
        {`OFFICER: ${info.fullName}, STATE: ${info.state}, AGENCY: ${info.agency}`}
        </p>
      )
    })}
  </div>
)

export default NewlyAdded;