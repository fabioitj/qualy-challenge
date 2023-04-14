import React from "react";
import { render, screen } from '@testing-library/react';
import DepartamentosPage from "./index";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const axiosDefault = axios.create({
  headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      'content-type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Expires: 0,
  }
});

const mockDepartments = [
  {
      "name": "Management",
      "id": 2
  },
  {
      "name": "Sales",
      "id": 3
  },
  {
      "name": "Testando",
      "id": 5
  },
]

const mockRegex = /.*\/departments/;

describe('departments list page', () => {

  const Component = ({...props}) => <Router><DepartamentosPage {...props}/></Router>

  let mock;

  beforeEach(() => {
      mock = new MockAdapter(axiosDefault);
      mock.onGet(mockRegex).reply(200, mockDepartments);
  });

  afterEach(() => {
      mock.reset();
      jest.clearAllMocks();
  })

  const props = {
      locations: {
          state: {
              departamentos: mockDepartments
          }
      }
  }


  it('should render title', async () => {
    render(<Component {...props}/>);

    expect(await screen.findByText(/Departamentos/)).toBeInTheDocument();
  })

  it('should render following columns: id, name and actions', async () => {
    render(<Component {...props}/>);

    expect(await screen.findByRole('columnheader', { name: 'Id' })).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Nome' })).toBeInTheDocument();
    expect(await screen.findByRole('columnheader', { name: 'Ações' })).toBeInTheDocument();
  })

  it('should list departments infos: id, name', async () => {
    render(<Component {...props}/>);

    expect(await screen.findByText(mockDepartments[0].id)).toBeInTheDocument();
    expect(await screen.findByText(mockDepartments[0].name)).toBeInTheDocument();

    expect(await screen.findByText(mockDepartments[1].id)).toBeInTheDocument();
    expect(await screen.findByText(mockDepartments[1].name)).toBeInTheDocument();
  });
});