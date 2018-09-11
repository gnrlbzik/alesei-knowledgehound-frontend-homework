import React from 'react';
import FetchApi from '../../services/fetch-api';

import ApiSearchResultsComponent from '../api-search-results/api-search-results-component';

class ApiSearchFieldComponent extends React.Component {
    constructor () {
        super();
        this.state = {
            searchResults: []
            ,searchQuery: ''
            ,fetchApiInprogress: false
        };
    }

    handleSearchFieldKeyUp = (event) => {
        switch (event.key) {
            case 'Enter':
                const searchFieldRef = this.refs.searchField;
                this.fetchResults(searchFieldRef.value);
                break;
            default:
                // do nothing
        }
    }

    handleSearchButtonClick = () => {
        const searchFieldRef = this.refs.searchField;
        this.fetchResults(searchFieldRef.value);
    }

    fetchResults (searchQuery) {
        this.setState({fetchApiInprogress: true});
        FetchApi
            .searchApi(searchQuery)
            .then(jsonResponse => {
                this.setState({searchResults: jsonResponse.results, searchQuery: searchQuery, fetchApiInprogress: false});
            });
    }

    render () {
        return (
            <div>
                <input placeholder="Search The Api" onKeyUp={this.handleSearchFieldKeyUp} ref="searchField" /><button onClick={this.handleSearchButtonClick}>Go!</button>
                { this.state.fetchApiInprogress ? <div>Loading</div> : null}
                <ApiSearchResultsComponent searchResults={this.state.searchResults} searchQuery={this.state.searchQuery} />
            </div>
        );
    }
}

export default ApiSearchFieldComponent;
