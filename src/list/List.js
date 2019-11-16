import React from "react";
import "./List.scss";
import styled from "styled-components";
import { DeleteOutline, InfoOutlined, SwapHoriz } from "@material-ui/icons";
import { Paper, Grid, TextField, IconButton, Zoom } from "@material-ui/core";

const ButtonContainer = styled(Paper)`
  position: absolute !important;
  right: 12px;
  top: 5px;
`;

const DeleteButton = styled(IconButton)`
  background-color: transparent;
  padding: 1px !important;
`;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: this.props.front,
      back: this.props.back,
      deletedItem: null
    };
    this.timeout = null;
  }

  handleFront = event => {
    clearTimeout(this.timeout);
    this.setState({
      front: event.target.value
    });
    this.timeout = setTimeout(() => {
      const { id } = this.props;
      this.props.update(id, "front", this.state.front);
    }, 1000);
  };

  swapItems = (id, front, back) => {
    this.setState({
      front: this.state.back,
      back: this.state.front
    });
    this.props.swap(id, front, back);
  };
  handleDelete = id => {
    this.setState({
      deletedItem: this.props.id
    });

    setTimeout(() => {
      this.props.delete(id);
    }, 500);
  };

  handleBack = event => {
    clearTimeout(this.timeout);
    this.setState({
      back: event.target.value
    });
    this.timeout = setTimeout(() => {
      const { id } = this.props;
      this.props.update(id, "back", this.state.back);
    }, 1000);
  };

  render() {
    const { front, back } = this.state;
    console.log("LIST REDRAWN");
    return (
      <>
        <Zoom
          style={{ transformOrigin: "top" }}
          timeout={{ enter: 0, exit: 300 }}
          mountOnEnter
          unmountOnExit
          in={this.state.deletedItem !== this.props.id}
        >
          <Grid container spacing={3} className="list-item">
            <Grid item xs>
              <TextField
                fullWidth
                multiline
                rowsMax="4"
                id="front"
                label="front"
                onChange={this.handleFront}
                value={front}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                multiline
                rowsMax="4"
                id="back"
                label="back"
                onChange={this.handleBack}
                value={back}
              />
            </Grid>
            <ButtonContainer>
              <DeleteButton
                onClick={() => this.swapItems(this.props.id, front, back)}
              >
                <SwapHoriz fontSize="small" />
              </DeleteButton>
              <DeleteButton>
                <InfoOutlined fontSize="small" />
              </DeleteButton>
              <DeleteButton onClick={() => this.handleDelete(this.props.id)}>
                <DeleteOutline fontSize="small" />
              </DeleteButton>
            </ButtonContainer>
          </Grid>
        </Zoom>
      </>
    );
  }
}

export default List;
