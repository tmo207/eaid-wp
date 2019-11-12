import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Input from './Input';
import BoxContainer from '../ContentBox/BoxContainer';
import BoxElement from '../ContentBox/BoxElement';
import Headline from '../Headline';
import Textarea from './Textarea';
import Text from '../Text';
import Error from './Error';
import LoadingSpinner from '../Blog/LoadingSpinner';

import {
  PADDING_SMALL,
  WHITE,
  DARKBLUE_FONT,
  DARKBLUE_BG
} from '../../_common/config';
import { getDateAndTime } from '../../_common/func';

const FormWrapper = styled.form`
  width: 100%;
`;

const SubmitButton = styled.button`
  width: 100%;
  font-weight: bold;
  color: ${DARKBLUE_FONT};
  padding: ${PADDING_SMALL};
  flex-grow: 1;
  border: none;
  background: ${props => (props.disabled ? DARKBLUE_BG : WHITE)};
`;

const CommentsForm = React.forwardRef(
  ({ postId, answerToParentId, answerToParentName, cancelAnswer }, ref) => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [hasError, setHasError] = useState(true);
    const [fetchError, setfetchError] = useState();
    const [commentSubmitted, setcommentSubmitted] = useState(false);
    const [fetching, setfetching] = useState(false);

    const data = {
      post: postId,
      parent: answerToParentId,
      author_name: author,
      author_email: email,
      date: getDateAndTime(),
      content
    };

    const handleSubmit = e => {
      e.preventDefault();
      setfetching(true);
      fetch('https://eaid-berlin.de/zzUbVKD3ckNW/wp-json/wp/v2/comments', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'client',
        body: JSON.stringify(data)
      }).then(response => {
        if (response.ok) {
          setfetchError(false);
          setcommentSubmitted(true);
          setfetching(false);
        } else {
          setfetchError(true);
          setcommentSubmitted(false);
          setfetching(false);
        }
      });
    };

    return (
      <div ref={ref}>
        <BoxContainer>
          <BoxElement>
            <FormattedMessage id="COMMENTS_WRITE">
              {headline => <Headline margin="0">{headline}</Headline>}
            </FormattedMessage>
          </BoxElement>
          {!commentSubmitted ? (
            <FormWrapper onSubmit={handleSubmit}>
              <BoxElement wrap>
                {answerToParentId !== 0 && (
                  <FormattedMessage
                    id="COMMENTS_ANSWER_TO"
                    values={{ subject: answerToParentName }}
                  >
                    {message => (
                      <Text onClick={cancelAnswer} secondary contentWidth>
                        {message}
                      </Text>
                    )}
                  </FormattedMessage>
                )}
                <FormattedMessage id="COMMENTS_PLACEHOLDER">
                  {message => (
                    <Textarea placeholder={message} setContent={setContent} />
                  )}
                </FormattedMessage>
                <Input placeholder="Name*" setContent={setAuthor} />
                <Input
                  type="email"
                  placeholder="E-Mail*"
                  setContent={setEmail}
                  hasError={setHasError}
                />
                {fetchError && (
                  <FormattedMessage id="COMMENTS_POST_ERROR">
                    {message => <Error>{message}</Error>}
                  </FormattedMessage>
                )}
              </BoxElement>
              <div className="buttons">
                <SubmitButton
                  type="submit"
                  disabled={
                    email === '' || author === '' || content === '' || hasError
                  }
                >
                  {fetching ? (
                    <LoadingSpinner dark />
                  ) : (
                    <FormattedMessage id="COMMENTS_POST_BUTTON">
                      {message => message}
                    </FormattedMessage>
                  )}
                </SubmitButton>
              </div>
            </FormWrapper>
          ) : (
            <BoxElement wrap>
              <FormattedMessage id="COMMENTS_SUCCESS">
                {message => <Text>{message}</Text>}
              </FormattedMessage>
            </BoxElement>
          )}
        </BoxContainer>
      </div>
    );
  }
);

CommentsForm.displayName = 'CommentsForm';

CommentsForm.propTypes = {
  disabled: PropTypes.bool,
  postId: PropTypes.number,
  answerToParentId: PropTypes.number,
  answerToParentName: PropTypes.string,
  cancelAnswer: PropTypes.func
};

export default CommentsForm;
