import { IJob } from '@/shared/model/job.model';
import { IDepartment } from '@/shared/model/department.model';
import { IEmployee } from '@/shared/model/employee.model';

export const enum Language {
  FRENCH = 'FRENCH',
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH'
}

export interface IJobHistory {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  language?: Language;
  job?: IJob;
  department?: IDepartment;
  employee?: IEmployee;
}

export class JobHistory implements IJobHistory {
  constructor(
    public id?: number,
    public startDate?: Date,
    public endDate?: Date,
    public language?: Language,
    public job?: IJob,
    public department?: IDepartment,
    public employee?: IEmployee
  ) {}
}
