import axios from "axios";

const getNaoConformidades = async () => {
    try {
      const response = await axios.get("http://localhost:3000/non-conformities?_sort=ocurrence-date&_order=desc");
      const naoConformidades = response.data;
  
      if(naoConformidades){
        const result = await Promise.all(
          naoConformidades.map(async (nc) => {
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
        return naoConformidades
      }
    } catch (error) {
      console.error(error);
    }
  };
  
const getNaoConformidadeById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/non-conformities/${id}`);
    const naoConformidade = response.data;

    let updatedNc = {...naoConformidade};

    if(naoConformidade.departments) {
      const departmentsPromises = naoConformidade.departments.map(async (departmentId) => {
        const departmentResponse = await axios.get(`http://localhost:3000/departments/${departmentId}`);
        return departmentResponse.data;
      });
      const departments = await Promise.all(departmentsPromises);
      updatedNc = { ...updatedNc, departments };
    }

    if(naoConformidade['corrective-actions']){
      const correctiveActionsPromises = naoConformidade['corrective-actions'].map(async (correctiveActionId) => {
        const correctiveActionsResponse = await axios.get(`http://localhost:3000/corrective-actions/${correctiveActionId}`);
        return correctiveActionsResponse.data;
      });
      const corretiveActions = await Promise.all(correctiveActionsPromises);
      updatedNc = { ...updatedNc, 'corrective-actions': corretiveActions };
    }

    return updatedNc;
  } catch (error) {
    console.error(error);
  }
}

const createNaoConformidade = (data) => {
    return axios.post("http://localhost:3000/non-conformities", data);
}

const updateNaoConformidade = (data, id) => {
    return axios.put("http://localhost:3000/non-conformities/" + id, data);
}

const removeNaoConformidade = (id) => {
    return axios.delete("http://localhost:3000/non-conformities/" + id);
}

export {
    getNaoConformidades,
    getNaoConformidadeById,
    createNaoConformidade,
    updateNaoConformidade,
    removeNaoConformidade,
}