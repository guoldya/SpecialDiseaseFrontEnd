 
import axios from 'axios';

 
export const loadCards = (data = {}) => axios.put('sysPatient/read/list', data).then(res => res.data)
