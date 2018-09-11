import React from 'react';
import FetchApi from '../../services/fetch-api';

import SearchResultsComponent from '../search-results/search-results-component';

class SearchFieldComponent extends React.Component {
  constructor () {
    super();
    this.state = {
      searchResults: []
      ,searchQuery: ''
      ,fetchApiInprogress: false
    };
  }

  componentDidMount () {

  }

  handleSearchFieldKeyUp = (event) => {
    switch (event.key) {
      case 'Enter':
        this.fetchResults(this.searchFieldInputRef.value);
        break;
      default:
        // do nothing
    }
  }

    handleSearchButtonClick = () => {
      this.fetchResults(this.searchFieldInputRef.value);
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
          <input placeholder="Search The Api" onKeyUp={this.handleSearchFieldKeyUp} ref={(c) => { this.searchFieldInputRef = c; }} /><button onClick={this.handleSearchButtonClick}>Go!</button>
          { this.state.fetchApiInprogress ? <div>Loading</div> : null}
          <SearchResultsComponent searchResults={this.state.searchResults} searchQuery={this.state.searchQuery} />
        </div>
      );
    }
}

export default SearchFieldComponent;
