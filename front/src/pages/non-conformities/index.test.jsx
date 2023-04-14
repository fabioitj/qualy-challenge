import React from "react";
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import NonConformitiesPage from "./index";
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
        "id": 1,
        "description": "Non conformitie 2",
        "ocurrence-date": "2023-04-15T03:00:00.000Z",
        "departments": [
            {
                "name": "Production",
                "id": 1
            },
        ],
        "corrective-actions": [
            44,
            50
        ]
    },
    {
        "id": 2,
        "description": "New non cofnformitie",
        "ocurrence-date": "2023-04-21T03:00:00.000Z",
        "departments": [
            {
                "name": "Production",
                "id": 1
            },
            {
                "name": "Managment",
                "id": 2
            },
        ],
        "corrective-actions": [
            51,
            52
        ]
    },
]

const mockRegex = /.*\/non-conformities/;


describe('non-conformities list page', () => {

    const Component = ({...props}) => <Router><NonConformitiesPage {...props}/></Router>

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

        expect(await screen.findByText(/Non conformities/)).toBeInTheDocument();
    });

    it('should render following columns: date, description, departments and actions', async () => {
        render(<Component {...props}/>);

        expect(await screen.findByRole('columnheader', { name: 'Date' })).toBeInTheDocument();
        expect(await screen.findByRole('columnheader', { name: 'Description' })).toBeInTheDocument();
        expect(await screen.findByRole('columnheader', { name: 'Departments' })).toBeInTheDocument();
        expect(await screen.findByRole('columnheader', { name: 'Actions' })).toBeInTheDocument();
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