import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders HOME page with GROCERIES text", () => {
  render(<App />);
  const mainLink = screen.getByText(/GROCERIES/);
  expect(mainLink).toBeInTheDocument();
});

// test('renders Topbar component with GROCERIES text', () => {
//   render(<Topbar />);
//   const mainLink = screen.getByText(/GROCERIES/)
//   expect(mainLink).toBeInTheDocument();
// });
