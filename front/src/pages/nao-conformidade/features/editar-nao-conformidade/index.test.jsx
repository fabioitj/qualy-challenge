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

describe('non-conformities edit page', () => {

  it('should render title', async () => {
    render(<Component/>);

    expect(await screen.findByText(/Editar Não Conformidade/)).toBeInTheDocument();
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

  it('should render corrective actions columns', async () => {
    render (<Component/>);

    expect(await screen.findByRole('columnheader', { name: 'O que'})).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Por que'})).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Como'})).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Onde'})).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Até quando'})).toBeInTheDocument();
  });
});