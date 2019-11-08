import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IRegion, Region } from '@/shared/model/region.model';
import RegionService from './region.service';

const validations: any = {
  region: {
    regionName: {}
  }
};

@Component({
  validations
})
export default class RegionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('regionService') private regionService: () => RegionService;
  public region: IRegion = new Region();
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.regionId) {
        vm.retrieveRegion(to.params.regionId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.region.id) {
      this.regionService()
        .update(this.region)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.region.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.regionService()
        .create(this.region)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.region.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveRegion(regionId): void {
    this.regionService()
      .find(regionId)
      .then(res => {
        this.region = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
