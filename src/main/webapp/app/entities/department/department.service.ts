import axios from 'axios';

import { IDepartment } from '@/shared/model/department.model';

const baseApiUrl = 'api/departments';

export default class DepartmentService {
  public find(id: number): Promise<IDepartment> {
    return new Promise<IDepartment>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
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

  public create(entity: IDepartment): Promise<IDepartment> {
    return new Promise<IDepartment>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IDepartment): Promise<IDepartment> {
    return new Promise<IDepartment>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
