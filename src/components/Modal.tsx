import React, { ReactNode } from 'react';
import styled from 'styled-components';
import logo from "../assets/Logo.png";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
    return (
      <Overlay>
        <ModalContainer>
          <LogoImage src={logo} alt="Logo" />
          <ModalTitle>{title}</ModalTitle>
          <div>{children}</div>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </ModalContainer>
      </Overlay>
    );
  };

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin: 0 0 20px;
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background: transparent;
  border: none;
  color: gray;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 100px;
  height: auto;
  margin-bottom: 20px;
`;

export default Modal;
