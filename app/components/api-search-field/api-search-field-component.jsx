import React from 'react';
import FetchApi from '../../services/fetch-api';

import ApiSearchResultsComponent from '../api-search-results/api-search-results-component';

class ApiSearchFieldComponent extends React.Component {

    constructor () {
        super();
        this.state = {
            results: null
        };
    }

    handleSearchButtonClick = () => {
        const searchFieldRef = this.refs.searchField;
        FetchApi
            .search(searchFieldRef.value)
            .then(jsonResponse => {
                this.setState({results: jsonResponse.results});
            });
    }

    render () {
        return (
            <div>
                <input placeholder="Search The Api" onKeyUp={this.handleSearchFieldKeyUp} ref="searchField" /><button onClick={this.handleSearchButtonClick}>Go!</button>
                <ApiSearchResultsComponent results={this.state.results} />
            </div>
        );
    }
}

export default ApiSearchFieldComponent;
