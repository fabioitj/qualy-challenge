import axios from "axios";

const getDepartments = () => {
    return axios.get("http://localhost:3000/departments");
};

const getDepartmentById = (id) => {
    return axios.get(`http://localhost:3000/departments/${id}`);
};

const verifyDepartmentBeingUsed = async (id) => {
    const nonConformities = await axios.get(`http://localhost:3000/non-conformities?departments_like=${id}`);
    return (nonConformities.data ? nonConformities.data.length > 0 : false);
}

const createDepartment = (data) => {
    return axios.post('http://localhost:3000/departments', data);
}

const updateDepartment = (id, data) => {
    return axios.put(`http://localhost:3000/departments/${id}`, data);
}

const removeDepartment = (id) => {
    return axios.delete(`http://localhost:3000/departments/${id}`);
}

export {
    getDepartments,
    getDepartmentById,
    verifyDepartmentBeingUsed,
    createDepartment,
    updateDepartment,
    removeDepartment
};