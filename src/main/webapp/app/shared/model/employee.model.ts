import { IDepartment } from '@/shared/model/department.model';
import { IJob } from '@/shared/model/job.model';
import { IEmployee } from '@/shared/model/employee.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Date;
  salary?: number;
  commissionPct?: number;
  department?: IDepartment;
  jobs?: IJob[];
  manager?: IEmployee;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Date,
    public salary?: number,
    public commissionPct?: number,
    public department?: IDepartment,
    public jobs?: IJob[],
    public manager?: IEmployee
  ) {}
}
