import axios from "axios"

const getAcoesCorretivas = () => {
    return axios.get("http://localhost:3000/corrective-actions");
}

const getAcaoCorretivaById = (id) => {
    return axios.get(`http://localhost:3000/corrective-actions/${id}`);
}

const createAcaoCorretiva = (data) => {
    return axios.post("http://localhost:3000/corrective-actions", data);
}

const updateAcaoCorretiva = (id, data) => {
    return axios.put(`http://localhost:3000/corrective-actions/${id}`, data);
}

const removeAcaoCorretiva = (id) => {
    return axios.delete(`http://localhost:3000/corrective-actions/${id}`);
}

export {
    getAcoesCorretivas,
    getAcaoCorretivaById,
    createAcaoCorretiva,
    updateAcaoCorretiva,
    removeAcaoCorretiva,
};