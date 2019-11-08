import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IEmployee } from '@/shared/model/employee.model';

const baseApiUrl = 'api/employees';

export default class EmployeeService {
  public find(id: number): Promise<IEmployee> {
    return new Promise<IEmployee>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity: IEmployee): Promise<IEmployee> {
    return new Promise<IEmployee>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IEmployee): Promise<IEmployee> {
    return new Promise<IEmployee>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
