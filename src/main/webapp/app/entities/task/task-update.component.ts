import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import JobService from '../job/job.service';
import { IJob } from '@/shared/model/job.model';

import AlertService from '@/shared/alert/alert.service';
import { ITask, Task } from '@/shared/model/task.model';
import TaskService from './task.service';

const validations: any = {
  task: {
    title: {},
    description: {}
  }
};

@Component({
  validations
})
export default class TaskUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('taskService') private taskService: () => TaskService;
  public task: ITask = new Task();

  @Inject('jobService') private jobService: () => JobService;

  public jobs: IJob[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.taskId) {
        vm.retrieveTask(to.params.taskId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.task.id) {
      this.taskService()
        .update(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.task.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.taskService()
        .create(this.task)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.task.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveTask(taskId): void {
    this.taskService()
      .find(taskId)
      .then(res => {
        this.task = res;
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
  }
}
