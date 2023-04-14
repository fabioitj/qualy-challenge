import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import EditDepartmentPage from "./index";

const Component = () => {
  return (
    <Router>
      <EditDepartmentPage/>
    </Router>
  )
}

describe('departments edit page', () => {

  it('should render title', async () => {
    render(<Component/>);

    expect(await screen.findByText(/Edit department/)).toBeInTheDocument();
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