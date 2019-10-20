import React from 'react';
import { FormattedMessage } from 'react-intl';

const NotFoundPage = () => (
  <>
    <FormattedMessage id="404_HEADLINE" tagName="h1" />
    <FormattedMessage id="404_DESCRIPTION" tagName="p" />
  </>
);

export default NotFoundPage;
