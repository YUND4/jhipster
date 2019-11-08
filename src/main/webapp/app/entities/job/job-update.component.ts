import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import TaskService from '../task/task.service';
import { ITask } from '@/shared/model/task.model';

import AlertService from '@/shared/alert/alert.service';
import { IJob, Job } from '@/shared/model/job.model';
import JobService from './job.service';

const validations: any = {
  job: {
    jobTitle: {},
    minSalary: {},
    maxSalary: {}
  }
};

@Component({
  validations
})
export default class JobUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('jobService') private jobService: () => JobService;
  public job: IJob = new Job();

  @Inject('employeeService') private employeeService: () => EmployeeService;

  public employees: IEmployee[] = [];

  @Inject('taskService') private taskService: () => TaskService;

  public tasks: ITask[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.jobId) {
        vm.retrieveJob(to.params.jobId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.job.tasks = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.job.id) {
      this.jobService()
        .update(this.job)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.job.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.jobService()
        .create(this.job)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.job.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveJob(jobId): void {
    this.jobService()
      .find(jobId)
      .then(res => {
        this.job = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
    this.taskService()
      .retrieve()
      .then(res => {
        this.tasks = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
