import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import JobService from '../job/job.service';
import { IJob } from '@/shared/model/job.model';

import DepartmentService from '../department/department.service';
import { IDepartment } from '@/shared/model/department.model';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import AlertService from '@/shared/alert/alert.service';
import { IJobHistory, JobHistory } from '@/shared/model/job-history.model';
import JobHistoryService from './job-history.service';

const validations: any = {
  jobHistory: {
    startDate: {},
    endDate: {},
    language: {}
  }
};

@Component({
  validations
})
export default class JobHistoryUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('jobHistoryService') private jobHistoryService: () => JobHistoryService;
  public jobHistory: IJobHistory = new JobHistory();

  @Inject('jobService') private jobService: () => JobService;

  public jobs: IJob[] = [];

  @Inject('departmentService') private departmentService: () => DepartmentService;

  public departments: IDepartment[] = [];

  @Inject('employeeService') private employeeService: () => EmployeeService;

  public employees: IEmployee[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.jobHistoryId) {
        vm.retrieveJobHistory(to.params.jobHistoryId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.jobHistory.id) {
      this.jobHistoryService()
        .update(this.jobHistory)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.jobHistory.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.jobHistoryService()
        .create(this.jobHistory)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.jobHistory.created', { param: param.id });
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
      this.jobHistory[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.jobHistory[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.jobHistory[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.jobHistory[field] = null;
    }
  }

  public retrieveJobHistory(jobHistoryId): void {
    this.jobHistoryService()
      .find(jobHistoryId)
      .then(res => {
        res.startDate = new Date(res.startDate);
        res.endDate = new Date(res.endDate);
        this.jobHistory = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.jobService()
      .retrieve()
      .then(res => {
        this.jobs = res.data;
      });
    this.departmentService()
      .retrieve()
      .then(res => {
        this.departments = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
