import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICountry } from '@/shared/model/country.model';
import AlertService from '@/shared/alert/alert.service';

import CountryService from './country.service';

@Component
export default class Country extends mixins(Vue2Filters.mixin) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('countryService') private countryService: () => CountryService;
  private removeId: number = null;
  public countries: ICountry[] = [];

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
    this.retrieveAllCountrys();
  }

  public clear(): void {
    this.retrieveAllCountrys();
  }

  public retrieveAllCountrys(): void {
    this.isFetching = true;

    this.countryService()
      .retrieve()
      .then(
        res => {
          this.countries = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: ICountry): void {
    this.removeId = instance.id;
  }

  public removeCountry(): void {
    this.countryService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.country.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllCountrys();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
