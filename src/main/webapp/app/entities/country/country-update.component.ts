import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import RegionService from '../region/region.service';
import { IRegion } from '@/shared/model/region.model';

import AlertService from '@/shared/alert/alert.service';
import { ICountry, Country } from '@/shared/model/country.model';
import CountryService from './country.service';

const validations: any = {
  country: {
    countryName: {}
  }
};

@Component({
  validations
})
export default class CountryUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('countryService') private countryService: () => CountryService;
  public country: ICountry = new Country();

  @Inject('regionService') private regionService: () => RegionService;

  public regions: IRegion[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.countryId) {
        vm.retrieveCountry(to.params.countryId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.country.id) {
      this.countryService()
        .update(this.country)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.country.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.countryService()
        .create(this.country)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.country.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveCountry(countryId): void {
    this.countryService()
      .find(countryId)
      .then(res => {
        this.country = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.regionService()
      .retrieve()
      .then(res => {
        this.regions = res.data;
      });
  }
}
