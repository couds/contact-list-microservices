import axios from 'axios';

const api = process.env.API;

export default {
  get: (request) => (
    axios.get(`${api}${request.endpoint}`, {
      params: request.params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
      .then(res => Promise.resolve(res.data))
  ),
  post: request => (
    axios.post(`${api}${request.endpoint}`, request.params, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      progress: request.options ? request.options.progress : undefined
    })
      .then(res => Promise.resolve(res.data))
  ),

  delete: (request) => (
    axios.delete(`${api}${request.endpoint}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      progress: request.options ? request.options.progress : undefined
    })
    .then(res => Promise.resolve(res.data))
  ),

  put: (request) => (
    axios.put(`${api}${request.endpoint}`, request.params, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      progress: request.options ? request.options.progress : undefined
    })
    .then(res => Promise.resolve(res.data))
  )
}
