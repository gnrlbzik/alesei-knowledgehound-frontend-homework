import React from 'react';
import FetchApi from '../../services/fetch-api';
import I18N from '../../i18n-messages';

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
      <React.Fragment>
        <header id="search-field-component">
          <input id="search-field-input" placeholder={I18N.inputSearchTextPlaceholder} onKeyUp={this.handleSearchFieldKeyUp} ref={(c) => { this.searchFieldInputRef = c; }} />
          <button id="search-field-button" onClick={this.handleSearchButtonClick}>{I18N.inputSearchButtonText}</button>
        </header>
        { this.state.fetchApiInprogress ? <div id="loading-spinner"></div> : null}
        <SearchResultsComponent
          searchResults={this.state.searchResults}
          searchQuery={this.state.searchQuery}
          fetchApiInprogress={this.state.fetchApiInprogress} />
      </React.Fragment>
    );

  }
}

export default SearchFieldComponent;
