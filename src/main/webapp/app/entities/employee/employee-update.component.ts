import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import DepartmentService from '../department/department.service';
import { IDepartment } from '@/shared/model/department.model';

import JobService from '../job/job.service';
import { IJob } from '@/shared/model/job.model';

import AlertService from '@/shared/alert/alert.service';
import { IEmployee, Employee } from '@/shared/model/employee.model';
import EmployeeService from './employee.service';

const validations: any = {
  employee: {
    firstName: {},
    lastName: {},
    email: {},
    phoneNumber: {},
    hireDate: {},
    salary: {},
    commissionPct: {}
  }
};

@Component({
  validations
})
export default class EmployeeUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('employeeService') private employeeService: () => EmployeeService;
  public employee: IEmployee = new Employee();

  @Inject('departmentService') private departmentService: () => DepartmentService;

  public departments: IDepartment[] = [];

  @Inject('jobService') private jobService: () => JobService;

  public jobs: IJob[] = [];

  public employees: IEmployee[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.employeeId) {
        vm.retrieveEmployee(to.params.employeeId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.employee.id) {
      this.employeeService()
        .update(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.employee.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.employeeService()
        .create(this.employee)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.employee.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.employee[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.employee[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.employee[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.employee[field] = null;
    }
  }

  public retrieveEmployee(employeeId): void {
    this.employeeService()
      .find(employeeId)
      .then(res => {
        res.hireDate = new Date(res.hireDate);
        this.employee = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.departmentService()
      .retrieve()
      .then(res => {
        this.departments = res.data;
      });
    this.jobService()
      .retrieve()
      .then(res => {
        this.jobs = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
