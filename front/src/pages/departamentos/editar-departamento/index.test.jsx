import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import EditarDepartamentoPage from "./index";

const Component = () => {
  return (
    <Router>
      <EditarDepartamentoPage/>
    </Router>
  )
}

describe('departments edit page', () => {

  it('should render title', async () => {
    render(<Component/>);

    expect(await screen.findByText(/Editar departamentos/)).toBeInTheDocument();
  })

  it('should render fields', async () => {
    render(<Component/>);

    expect(await screen.findByLabelText(/Nome/)).toBeInTheDocument();
  })

  it('should render save and back buttons', async () => {
    render(<Component/>);

    expect(await screen.findByRole('button', { name: 'Voltar' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });
});