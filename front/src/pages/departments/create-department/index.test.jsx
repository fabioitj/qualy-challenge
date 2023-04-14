import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import CreateDepartmentPage from "./index";

const Component = () => {
  return (
    <Router>
      <CreateDepartmentPage/>
    </Router>
  )
}

describe('departments create page', () => {

  it('should render title', async () => {
    render(<Component/>);

    expect(await screen.findByText(/Create department/)).toBeInTheDocument();
  })

  it('should render fields', async () => {
    render(<Component/>);

    expect(await screen.findByLabelText(/Name/)).toBeInTheDocument();
  })

  it('should render save and back buttons', async () => {
    render(<Component/>);

    expect(await screen.findByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});