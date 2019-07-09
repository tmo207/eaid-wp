import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BoxElement from '../ContentBox/BoxElement';
import ImageCricle from '../Image/ImageCircle';
import Text from '../Text';

import logo from '../../img/arrow.png';
import { PADDING_SMALL } from '../../_common/config';

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`;

const InfoWrapper = styled.div`
  display: inline-block;
`;

const Logo = styled.img`
  height: 32px;
  transition: 0.3s;
  transform: ${props => (props.open ? 'rotate(180deg)' : '')};
`;

const Left = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin: 1rem;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const DescriptionContainer = styled.div`
  padding: ${props => (props.open ? '1rem' : '0 1rem')};
  color: #000000;
  background-color: rgba(255, 255, 255, 0.5);
  height: ${props => (props.open ? 'auto' : '0')};
  overflow: hidden;
  transition: padding 0.15s, height 2s;
`;

const WebsiteWrapper = styled.div`
  padding-bottom: ${PADDING_SMALL};
`;

const Email = styled.a`
  z-index: 1000;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const Profile = ({ person }) => {
  const [open, setOpen] = useState(false);

  const {
    biografie,
    email_adresse: email,
    name,
    tatigkeit,
    website,
    bild
  } = person;
  return (
    <>
      <BoxElement>
        <ProfileWrapper onClick={() => setOpen(!open)}>
          <div>
            <ImageCricle image={bild} />
          </div>
          <Left>
            <InfoWrapper>
              <Text bold margin="0 0 0.15rem">
                {name}
              </Text>
              {tatigkeit && <Text margin="0 0 0.15rem">{tatigkeit}</Text>}
              {email && (
                <Email
                  href={`mailto:${email}`}
                  className="noLine"
                  onClick={e => e.stopPropagation()}
                  dangerouslySetInnerHTML={{
                    __html: email
                  }}
                />
              )}
            </InfoWrapper>
            {biografie && <Logo open={open} src={logo} />}
          </Left>
        </ProfileWrapper>
      </BoxElement>
      {biografie && (
        <DescriptionContainer open={open}>
          {website && (
            <WebsiteWrapper>
              <Text bold inline>
                {'Persönliche Website: '}
              </Text>
              <a href={website}>
                <Text inline>{website}</Text>
              </a>
            </WebsiteWrapper>
          )}
          <Text>{biografie}</Text>
        </DescriptionContainer>
      )}
    </>
  );
};

Profile.propTypes = {
  person: PropTypes.shape({
    biografie: PropTypes.string,
    email_adresse: PropTypes.string,
    name: PropTypes.string,
    tatigkeit: PropTypes.string,
    website: PropTypes.string,
    bild: PropTypes.string
  }).isRequired
};

export default Profile;
