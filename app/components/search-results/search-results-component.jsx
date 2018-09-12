import React from 'react';
import PropTypes from 'prop-types';
import I18N from '../../i18n-messages';

class SearchResultsComponent extends React.Component {

  displayExplanations (explanations) {

    const responses = explanations.map((explanation, index) => {

      return (
        <li key={index}>
          <b>{explanation.display_name}</b>
          <ul>
            {explanation.matches.map((match, index) => {
              return (
                <li key={index} dangerouslySetInnerHTML={{__html: match}}></li>
              );
            })}
          </ul>
        </li>
      );
    });

    return (
      <React.Fragment>
        <b className="found-in-title">Found in responses:</b>
        <ul>
          {responses}
        </ul>
      </React.Fragment>
    );
  }

  displaySearchResults () {
    const searchQuery = this.props.searchQuery;
    const searchResults = this.props.searchResults;
    let listOfResults = [];

    if (searchResults.length === 0 && searchQuery.length > 0) {
      listOfResults.push(
        <section key="message">{I18N.noMatchingResults(searchQuery)}</section>
      );
    } else {
      const mappedSearchResults = this.props.searchResults.map(searchResultValue => {
        return (
          <section key={searchResultValue.id}>
            <a className="result-link" href={searchResultValue.link} target="_blank" rel='noreferrer noopener'>{searchResultValue.question}</a>
            <div><a className="study-link" href={searchResultValue.study.link} target="_blank" rel='noreferrer noopener'>{searchResultValue.study.name}</a> - {searchResultValue.study.study_date}</div>
            {searchResultValue.explanation.length > 0 ?
              this.displayExplanations(searchResultValue.explanation)
              : null}
          </section>
        );
      });

      listOfResults = listOfResults.concat(mappedSearchResults);
    }

    return listOfResults;
  }

  displaySearchResultsBox () {
    const searchQuery = this.props.searchQuery;
    const fetchApiInprogress = this.props.fetchApiInprogress;

    if (searchQuery.length > 0 && !fetchApiInprogress) {
      return (
        <div id="matching-results">
          <h2 id="matching-results-title">{I18N.searchQueryMatchingResultsTitle}</h2>
          <div id="matching-results-contents">
            {this.displaySearchResults()}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.displaySearchResultsBox()}
      </React.Fragment>
    );
  }
}

SearchResultsComponent.propTypes = {
  searchResults: PropTypes.array
  ,searchQuery: PropTypes.string
  ,fetchApiInprogress: PropTypes.bool
};

export default SearchResultsComponent;
