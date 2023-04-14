const departmentToOptions = (departments) => departments ? departments.map(department => ({label: department.name, value: department.id})) : [];

export default departmentToOptions;