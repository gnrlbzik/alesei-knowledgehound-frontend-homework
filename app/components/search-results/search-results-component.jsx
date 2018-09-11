import React from 'react';
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
            )
        })

        return (
            <div>
                <b>Found in responses:</b>
                <ul>
                    {responses}
                </ul>
            </div>
        );
    }

    displaySearchResults () {
        const searchQuery = this.props.searchQuery;
        const searchResults = this.props.searchResults;
        let listOfResults = [];

        if (searchResults.length === 0 && searchQuery.length > 0) {
            listOfResults.push(
                <div key="message">{I18N.noMatchingResults(searchQuery)}</div>
            );
        } else {
            const mappedSearchResults = this.props.searchResults.map(searchResultValue => {
                return (
                    <div key={searchResultValue.id}>
                        <div><a href={searchResultValue.link} target="_blank">{searchResultValue.question}</a></div>
                        <div><a href={searchResultValue.study.link} target="_blank">{searchResultValue.study.name}</a> - {searchResultValue.study.study_date}</div>
                        {searchResultValue.explanation.length > 0 ?
                            this.displayExplanations(searchResultValue.explanation)
                        : null}
                    </div>
                )
            });

            listOfResults = listOfResults.concat(mappedSearchResults);
        }

        return listOfResults;
    }

    render () {
        return (
            <div>
                {this.displaySearchResults()}
            </div>
        );
    }
}

export default SearchResultsComponent;
