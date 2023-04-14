import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import CreateNonConformitiePage from "./index";

const Component = () => {
  return (
    <Router>
      <CreateNonConformitiePage/>
    </Router>
  )
}

describe('non-conformities create page', () => {

  it('should render title', async () => {
    render(<Component/>);

    expect(await screen.findByText(/Create non conformitie/)).toBeInTheDocument();
  })

  it('should render fields', async () => {
    render(<Component/>);

    expect(await screen.findByLabelText(/Description/)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Ocurrence date/)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Departments/)).toBeInTheDocument();
  })

  it('should render save and back buttons', async () => {
    render(<Component/>);

    expect(await screen.findByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});