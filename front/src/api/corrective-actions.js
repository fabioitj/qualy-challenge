import axios from "axios"

const getCorrectiveActions = () => {
    return axios.get("http://localhost:3000/corrective-actions");
}

const getCorrectiveActionById = (id) => {
    return axios.get(`http://localhost:3000/corrective-actions/${id}`);
}

const createCorrectiveAction = (data) => {
    return axios.post("http://localhost:3000/corrective-actions", data);
}

const updateCorrectiveAction = (id, data) => {
    return axios.put(`http://localhost:3000/corrective-actions/${id}`, data);
}

const removeCorrectiveAction = (id) => {
    return axios.delete(`http://localhost:3000/corrective-actions/${id}`);
}

export {
    getCorrectiveActions,
    getCorrectiveActionById,
    createCorrectiveAction,
    updateCorrectiveAction,
    removeCorrectiveAction,
};