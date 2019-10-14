import React from "react";
import styled from "styled-components";

const LayoutContainter = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = props => {
  return <LayoutContainter>{props.children}</LayoutContainter>;
};

export default Layout;
