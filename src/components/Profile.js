import React, { useState } from 'react';
import styled from 'styled-components';

import BoxElement from './ContentBox/BoxElement';
import ImageCricle from './Image/ImageCircle';
import Text from './Text';

import logo from '../img/arrow.png';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin: 1rem;
`;

const DescriptionContainer = styled.div`
  padding: ${props => (props.open ? '1rem' : '0 1rem')};
  color: #000000;
  background-color: rgba(255, 255, 255, 0.5);
  height: ${props => (props.open ? 'auto' : '0')};
  overflow: hidden;
  transition: padding 0.15s, height 2s;
`;

export const Profile = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BoxElement>
        <ProfileWrapper onClick={() => setOpen(!open)}>
          <div>
            <ImageCricle />
          </div>
          <Left>
            <InfoWrapper>
              <Text bold margin={'0 0 0.15rem'}>
                Peter Schaar
              </Text>
              <Text margin={'0 0 0.15rem'}>Vorsitzender</Text>
              <Text secondary>mail@eaid-berlin.de</Text>
            </InfoWrapper>
            <Logo open={open} src={logo} />
          </Left>
        </ProfileWrapper>
      </BoxElement>
      <DescriptionContainer open={open}>
        <Text margin={'0.5rem 0'}>Das isser.</Text>
        <Text margin={'0.5rem 0'}>Das isser.</Text>
        <Text margin={'0.5rem 0'}>
          Das isser. SAjak sdjkas asdjklasdj aksldjkasdj aslkdj askldsosidoas
          dkoewkd eow jdaskjd askljd.
        </Text>
      </DescriptionContainer>
    </>
  );
};

export default Profile;
