import React from 'react';

class ApiSearchResultsComponent extends React.Component {


    render () {
        return (
            <div>
                { this.props.results && this.props.results.length && this.props.results.length > 0 ? 'I will show results' : 'no results' }
            </div>
        );
    }
}

export default ApiSearchResultsComponent;
