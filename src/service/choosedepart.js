import axios from 'axios';

// 加载医生列表
export const loadDepart = (data = { patientId: 2}) => axios.put('/p/api/sds/sysDoctor/selectDoctorByPatient', data).then(res => res.data)
