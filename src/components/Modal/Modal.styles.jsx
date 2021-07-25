import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  overflow-y: scroll;
`;

export const ModalWindow = styled.div`
  position: relative;

  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);

  background-color: #fff;
`;

export const Button = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border: none;
  border-radius: 50%;
`;
