import React from 'react';

import ApiSearchFieldComponent from '../api-search-field/api-search-field-component';

function RootAppComponent (props) {
    return (
        <div>
            <h1>Feel free to search!</h1>
            <ApiSearchFieldComponent />
        </div>
    );
}

export default RootAppComponent;
