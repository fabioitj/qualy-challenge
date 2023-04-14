import axios from "axios";

const getNonConformities = async () => {
    try {
      const response = await axios.get("http://localhost:3000/non-conformities?_sort=ocurrence-date&_order=desc");
      const nonConformities = response.data;
  
      if(nonConformities){
        const result = await Promise.all(
          nonConformities.map(async (nc) => {
            const departmentsPromises = nc.departments.map(async (id) => {
              const departmentResponse = await axios.get(`http://localhost:3000/departments/${id}`);
              return departmentResponse.data.name;
            });
            const departments = await Promise.all(departmentsPromises);
            const updatedNc = { ...nc, departments };
            return updatedNc;
          })
        );
    
        return result;
      }
      else {
        return nonConformities
      }
    } catch (e) {}
  };
  
const getNonConformitieById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/non-conformities/${id}`);
    const nonConformitie = response.data;

    let updatedNc = {...nonConformitie};

    if(nonConformitie.departments) {
      const departmentsPromises = nonConformitie.departments.map(async (departmentId) => {
        const departmentResponse = await axios.get(`http://localhost:3000/departments/${departmentId}`);
        return departmentResponse.data;
      });
      const departments = await Promise.all(departmentsPromises);
      updatedNc = { ...updatedNc, departments };
    }

    if(nonConformitie['corrective-actions']){
      const correctiveActionsPromises = nonConformitie['corrective-actions'].map(async (correctiveActionId) => {
        const correctiveActionsResponse = await axios.get(`http://localhost:3000/corrective-actions/${correctiveActionId}`);
        return correctiveActionsResponse.data;
      });
      const corretiveActions = await Promise.all(correctiveActionsPromises);
      updatedNc = { ...updatedNc, 'corrective-actions': corretiveActions };
    }

    return updatedNc;
  } catch (e) {}
}

const createNonConformitie = (data) => {
    return axios.post("http://localhost:3000/non-conformities", data);
}

const updateNonConformitie = (data, id) => {
    return axios.put("http://localhost:3000/non-conformities/" + id, data);
}

const removeNonConformitie = (id) => {
    return axios.delete("http://localhost:3000/non-conformities/" + id);
}

export {
    getNonConformities,
    getNonConformitieById,
    createNonConformitie,
    updateNonConformitie,
    removeNonConformitie,
}