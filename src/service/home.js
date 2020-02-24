 
import axios from 'axios';

// 加载就诊卡片
export const loadCards = (data = {}) => axios.put('/sysPatient/read/list', data).then(res => res.data)
