import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Error from './Error';

import {
  WHITE,
  DARKBLUE_BG,
  HANDHELD_MQ,
  MOBILE_TEXT
} from '../../_common/config';

const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: ${DARKBLUE_BG};
  border: none;
  color: ${WHITE};
  margin: 0;
  resize: none;
  display: block;
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

const Textarea = ({ minRows, maxRows, placeholder }) => {
  const [value, setValue] = useState('');
  const [rows, setRows] = useState(5);
  const [error, setError] = useState('');

  const handleChange = event => {
    const textareaLineHeight = 24;
    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    if (event.target.value === '') {
      setError('Required');
    } else {
      setError('');
    }

    setValue(event.target.value);
    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  return (
    <InputWrapper>
      <CommentInput
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        outline={error}
      />
      {error && <Error>{error}</Error>}
    </InputWrapper>
  );
};

Textarea.defaultProps = {
  minRows: 4,
  maxRows: 10
};

Textarea.propTypes = {
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  placeholder: PropTypes.string
};

export default Textarea;
