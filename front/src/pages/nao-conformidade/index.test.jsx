import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import NaoConformidadePage from "./index";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { formatDate } from "../../utils/format";

const axiosDefault = axios.create({
    headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        Expires: 0,
    }
});

const mockNonConformities = [
    {
        "id": 6,
        "description": "tyrtghfghfg",
        "ocurrence-date": "2023-04-22T03:00:00.000Z",
        "departments": [
            {
                "name": "Management",
                "id": 2
            }
        ],
        "corrective-actions": []
    },
    {
        "id": 9,
        "description": "Testando salvarrrr",
        "ocurrence-date": "2023-05-04T03:00:00.000Z",
        "departments": [
            {
                "name": "Management",
                "id": 2
            },
            {
                "name": "gsdgfsdfdrghjfdr",
                "id": 9
            },
            {
                "name": "Testando",
                "id": 5
            }
        ],
        "corrective-actions": [
            35,
            36,
            37
        ]
    },
]

const mockRegex = /.*\/non-conformities/;


describe('non-conformities list page', () => {

    const Component = ({...props}) => <Router><NaoConformidadePage {...props}/></Router>

    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axiosDefault);
        mock.onGet(mockRegex).reply(200, mockNonConformities);
    });

    afterEach(() => {
        mock.reset();
        jest.clearAllMocks();
    })

    const props = {
        locations: {
            state: {
                naoConformidade: mockNonConformities
            }
        }
    }

    it('should render title', async () => {
        render(<Component {...props}/>);

        expect(await screen.findByText(/Não conformidade/)).toBeInTheDocument();
    });

    it('should render following columns: date, description, departments and actions', async () => {
        render(<Component {...props}/>);

        expect(await screen.findByRole('columnheader', { name: 'Data' })).toBeInTheDocument();
        expect(await screen.findByRole('columnheader', { name: 'Descrição' })).toBeInTheDocument();
        expect(await screen.findByRole('columnheader', { name: 'Departamentos' })).toBeInTheDocument();
        expect(await screen.findByRole('columnheader', { name: 'Ações' })).toBeInTheDocument();
    });

    it('should list non-confirmities infos: date, description and departments', async () => {
        render(<Component {...props}/>);

        const firstDepartment = await screen.findAllByText(mockNonConformities[0].departments[0].name);
        const secondDepartment = await screen.findAllByText(mockNonConformities[1].departments[0].name);

        expect(await screen.findByText(formatDate(mockNonConformities[0]['ocurrence-date']))).toBeInTheDocument();
        expect(await screen.findByText(mockNonConformities[0].description)).toBeInTheDocument();
        expect(firstDepartment.length).toBeGreaterThan(0);

        expect(await screen.findByText(formatDate(mockNonConformities[1]['ocurrence-date']))).toBeInTheDocument();
        expect(await screen.findByText(mockNonConformities[1].description)).toBeInTheDocument();
        expect(secondDepartment.length).toBeGreaterThan(0);
    });
    
});