import React from 'react';
import I18N from '../../i18n-messages';

import SearchFieldComponent from '../search-field/search-field-component';

function RootAppComponent () {
  return (
    <React.Fragment>
      <h1 id="welcome-title">{I18N.welcomeTitle}</h1>
      <SearchFieldComponent />
    </React.Fragment>
  );
}

export default RootAppComponent;
