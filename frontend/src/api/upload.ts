import axios from 'src/utils/axios';

export const uploadImage = (formData: FormData) =>
  axios.post('/api/upload/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }); 