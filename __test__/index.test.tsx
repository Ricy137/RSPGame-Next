/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MoveBoard from "@/modules/MoveBoard";
import { Move } from "@/services/game";

describe("MoveBoard", () => {
  it("renders MoveBoard", () => {
    render(
      <MoveBoard
        onChange={async () => {}}
        onBlur={async () => {}}
        name="move"
        setValue={async () => {}}
      />
    );
    expect(screen.getByTestId("move-board")).toBeInTheDocument();
    Move.forEach((move, index) => {
      if (index === 0) return;
      expect(screen.getByTestId(`move-item-${index}`)).toBeInTheDocument();
    });
  });
});
