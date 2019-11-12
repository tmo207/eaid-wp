import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import Error from './Error';

import {
  WHITE,
  DARKBLUE_BG,
  MOBILE_TEXT,
  HANDHELD_MQ
} from '../../_common/config';

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  height: 2.5rem;
  background: ${DARKBLUE_BG};
  border: none;
  color: ${WHITE};
  outline: ${props => (props.outline ? '1px solid red' : 'none')};

  &::placeholder {
    color: #799ad6;
    font-size: 1rem;
  }

  @${HANDHELD_MQ} {
    font-size: ${MOBILE_TEXT};
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 0.6rem;
`;

const Input = ({ placeholder, type, setContent, hasError, intl }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleChange = event => {
    setValue(event.target.value);
    setContent(event.target.value);

    if (
      type === 'email' &&
      !emailRegex.test(event.target.value.toLowerCase())
    ) {
      setError(intl.formatMessage({ id: 'COMMENTS_EMAIL_ERROR' }));
      if (hasError) {
        hasError(true);
      }
    } else {
      setError('');
      if (hasError) {
        hasError(false);
      }
    }
  };

  const handleBlur = event => {
    if (event.target.value === '') {
      setError(intl.formatMessage({ id: 'MANDATORY_FIELD' }));
    }
  };

  return (
    <InputWrapper>
      <InputField
        type="text"
        name={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        outline={error}
      />
      {error && <Error>{error}</Error>}
    </InputWrapper>
  );
};

Input.defaultProps = {
  type: 'name'
};

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['email', 'name']),
  setContent: PropTypes.func.isRequired,
  hasError: PropTypes.func
};

export default injectIntl(Input);
