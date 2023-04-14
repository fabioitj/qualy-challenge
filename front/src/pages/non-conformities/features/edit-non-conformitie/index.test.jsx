import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import EditNonConformitiePage from "./index";

const Component = () => {
  return (
    <Router>
      <EditNonConformitiePage/>
    </Router>
  )
}

describe('non-conformities edit page', () => {

  it('should render title', async () => {
    render(<Component/>);

    expect(await screen.findByText(/Edit non conformitie/)).toBeInTheDocument();
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

  it('should render corrective actions columns', async () => {
    render (<Component/>);

    expect(await screen.findByRole('columnheader', { name: 'What'})).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Why'})).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'How'})).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Where'})).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Until when'})).toBeInTheDocument();
  });
});