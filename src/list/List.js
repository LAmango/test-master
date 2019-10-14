import React from "react";
import { Grid, TextField } from "@material-ui/core";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      front: this.props.front,
      back: this.props.back
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
    }, 750);
  };

  handleBack = event => {
    clearTimeout(this.timeout);
    this.setState({
      back: event.target.value
    });
    this.timeout = setTimeout(() => {
      const { id } = this.props;
      this.props.update(id, "back", this.state.back);
    }, 750);
  };

  render() {
    const { front, back } = this.state;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              fullWidth
              id="front"
              label="front"
              onChange={this.handleFront}
              value={front}
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              id="back"
              label="back"
              onChange={this.handleBack}
              value={back}
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default List;
