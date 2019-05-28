import React, { useState } from 'react';

function Option(props) {
    return (
        <option value={props.value}>{props.label}</option>
    );
}

export default Option;
