 
import axios from 'axios';

 
export const loadCards = (data = {}) => axios.put('/api/sds/sysPatient/read/list', data).then(res => res.data)
