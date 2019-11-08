import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IRegion } from '@/shared/model/region.model';
import AlertService from '@/shared/alert/alert.service';

import RegionService from './region.service';

@Component
export default class Region extends mixins(Vue2Filters.mixin) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('regionService') private regionService: () => RegionService;
  private removeId: number = null;
  public regions: IRegion[] = [];

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
    this.retrieveAllRegions();
  }

  public clear(): void {
    this.retrieveAllRegions();
  }

  public retrieveAllRegions(): void {
    this.isFetching = true;

    this.regionService()
      .retrieve()
      .then(
        res => {
          this.regions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IRegion): void {
    this.removeId = instance.id;
  }

  public removeRegion(): void {
    this.regionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.region.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllRegions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
