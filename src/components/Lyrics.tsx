import React from "react";
import styled from "styled-components";

const Lyrics: React.FC = () => {
    return (
        <Container>
            <h1>가사</h1>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

export default Lyrics;