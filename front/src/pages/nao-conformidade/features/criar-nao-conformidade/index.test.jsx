import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import CriarNaoConformidadePage from "./index";

const Component = () => {
  return (
    <Router>
      <CriarNaoConformidadePage/>
    </Router>
  )
}

describe('non-conformities create page', () => {

  it('should render title', async () => {
    render(<Component/>);

    expect(await screen.findByText(/Cadastrar Não Conformidade/)).toBeInTheDocument();
  })

  it('should render fields', async () => {
    render(<Component/>);

    expect(await screen.findByLabelText(/Descrição/)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Data de ocorrência/)).toBeInTheDocument();
    expect(await screen.findByLabelText(/Departamentos/)).toBeInTheDocument();
  })

  it('should render save and back buttons', async () => {
    render(<Component/>);

    expect(await screen.findByRole('button', { name: 'Voltar' })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });
});