import React from "react";
import { create } from "react-test-renderer";
import Card from "../card/Card";

describe("Card Component", () => {
  it("Matches the snapshot", () => {
    const card = create(<Card />);
    expect(card.toJSON()).toMatchSnapshot();
  });

  it("Doesn't show current or total cards if a card set hasn't been chosen", () => {
    const component = create(<Card cardSet={null} />);
    const card = component.root;
    const childDiv = card.findByType("div");
    expect(childDiv.children.length).toEqual(1);
    expect(typeof card.props.side).toEqual("undefined");
  });

  it("Show current or total cards if a card set hasn't been chosen", () => {
    const component = create(<Card cardSet={"colors"} />);
    const card = component.root;
    const childDiv = card.findByType("div");
    expect(childDiv.children.length).toEqual(2);
  });

  it("Show current or total cards if a card set has been chosen", () => {
    const component = create(<Card cardSet={"colors"} />);
    const card = component.root;
    const childDiv = card.findByType("div");
    expect(childDiv.children.length).toEqual(2);
  });
});
