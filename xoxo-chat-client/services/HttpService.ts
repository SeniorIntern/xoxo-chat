import apiClient from './apiClient';

class HttpService<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return apiClient.get<T[]>(this.endpoint).then((res) => res.data);
  };

  getAllWithId = (id: string) => {
    return apiClient.get<T[]>(this.endpoint +'/'+ id).then((res) => res.data);
  };

  post = (data: T) => {
    return apiClient.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default HttpService;
