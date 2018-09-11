import React from 'react';
import FetchApi from '../../services/fetch-api';

import ApiSearchResultsComponent from '../api-search-results/api-search-results-component';

class ApiSearchFieldComponent extends React.Component {

    // {FetchApi.search()}

    handleSearchButtonClick = () => {
        console.log(this.refs.searchField.val);
    }

    render () {
        return (
            <div>
                <input placeholder="Search The Api" onKeyUp={this.handleSearchFieldKeyUp} ref="searchField" /><button onClick={this.handleSearchButtonClick}>Go!</button>
                <ApiSearchResultsComponent results="{this.state.resutls}" />
            </div>
        );
    }
}

export default ApiSearchFieldComponent;
