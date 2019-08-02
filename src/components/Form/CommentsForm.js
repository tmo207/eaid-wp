import React from 'react';
import styled from 'styled-components';

import Input from './Input';
import BoxContainer from '../ContentBox/BoxContainer';
import BoxElement from '../ContentBox/BoxElement';
import Headline from '../Headline';
import Textarea from './Textarea';

import { PADDING_SMALL, WHITE, DARKBLUE_FONT } from '../../_common/config';

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
  background: ${WHITE};
`;

const CommentsForm = () => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <BoxContainer>
      <BoxElement>
        <Headline margin={'0'}>Schreibe einen Kommentar</Headline>
      </BoxElement>
      <FormWrapper
        onSubmit={handleSubmit}
        action="PATH TO FILE WHICH HANDELS SENDING"
        method="post"
      >
        <BoxElement wrap>
          <Textarea placeholder="Kommentar*" />
          <Input placeholder="Name*" name="name" />
          <Input type="email" placeholder="E-Mail*" name="email" />
        </BoxElement>
        <div className="buttons">
          <SubmitButton type="submit" disabled={''}>
            Submit
          </SubmitButton>
        </div>
      </FormWrapper>
    </BoxContainer>
  );
};

export default CommentsForm;
