import React from "react";
import styled from "styled-components";

const Content = styled.div`
  color: black;
  width: 500px;
  padding: 140px 0;
  text-align: center;
  height: 100%;
`;

const Counter = styled.div`
  position: absolute;
  right: 0;
  padding: 10px;
  color: gray;
`;

class Card extends React.Component {
  render() {
    const { cardSet, side, current, total } = this.props;
    return (
      <div>
        {cardSet && (
          <Counter>
            {current}/{total}
          </Counter>
        )}
        <Content>{side}</Content>
      </div>
    );
  }
}

export default Card;
