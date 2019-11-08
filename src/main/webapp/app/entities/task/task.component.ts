import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITask } from '@/shared/model/task.model';
import AlertService from '@/shared/alert/alert.service';

import TaskService from './task.service';

@Component
export default class Task extends mixins(Vue2Filters.mixin) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('taskService') private taskService: () => TaskService;
  private removeId: number = null;
  public tasks: ITask[] = [];

  public isFetching = false;
  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllTasks();
  }

  public clear(): void {
    this.retrieveAllTasks();
  }

  public retrieveAllTasks(): void {
    this.isFetching = true;

    this.taskService()
      .retrieve()
      .then(
        res => {
          this.tasks = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ITask): void {
    this.removeId = instance.id;
  }

  public removeTask(): void {
    this.taskService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.task.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllTasks();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
