import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HANDHELD_MQ } from '../_common/config';

const HeadStyle = styled.h1`
  margin: ${props => (props.margin ? props.margin : '0 0 1rem')};
  padding: ${props => (props.padding ? props.padding : '0')};
`;

const Large = styled(HeadStyle)`
  font-size: 4rem;

  @${HANDHELD_MQ} {
    font-size: 2.85rem;
  }
`;

const Medium = styled(HeadStyle)`
  font-size: 2.5rem;

  @${HANDHELD_MQ} {
    font-size: 1.78rem;
  }
`;

const Small = styled(HeadStyle)`
  font-size: 1.75rem;

  @${HANDHELD_MQ} {
    font-size: 1.25rem;
  }
`;

const selectHeadline = type => {
  switch (type) {
    case 'Large':
      return Large;
    case 'Medium':
      return Medium;
    case 'Small':
      return Small;
    default:
      return Medium;
  }
};

const Headline = ({ type, children, margin, padding }) => {
  const RenderHeadline = selectHeadline(type);

  return (
    <RenderHeadline
      margin={margin}
      padding={padding}
      dangerouslySetInnerHTML={{
        __html: children
      }}
    />
  );
};

Headline.defaultProps = {
  type: 'Small'
};

Headline.propTypes = {
  type: PropTypes.oneOf(['Large', 'Medium', 'Small']),
  children: PropTypes.node,
  margin: PropTypes.string,
  padding: PropTypes.string
};

export default Headline;
