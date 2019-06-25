import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeadStyle = styled.h1`
  margin: ${props => (props.margin ? props.margin : '0 0 1rem')};
  padding: ${props => (props.padding ? props.padding : '0')};
`;

const Primary = styled(HeadStyle)`
  font-size: 4rem;
`;

const Secondary = styled(HeadStyle)`
  font-size: 1.75rem;
`;

const selectHeadline = type => {
  switch (type) {
    case 'Primary':
      return Primary;
    case 'Secondary':
      return Secondary;
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
  type: 'Secondary'
};

Headline.propTypes = {
  type: PropTypes.oneOf(['Primary', 'Secondary']),
  children: PropTypes.node,
  margin: PropTypes.string,
  padding: PropTypes.string
};

export default Headline;
