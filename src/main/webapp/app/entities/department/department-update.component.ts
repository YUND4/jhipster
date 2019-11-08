import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import LocationService from '../location/location.service';
import { ILocation } from '@/shared/model/location.model';

import EmployeeService from '../employee/employee.service';
import { IEmployee } from '@/shared/model/employee.model';

import AlertService from '@/shared/alert/alert.service';
import { IDepartment, Department } from '@/shared/model/department.model';
import DepartmentService from './department.service';

const validations: any = {
  department: {
    departmentName: {
      required
    }
  }
};

@Component({
  validations
})
export default class DepartmentUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('departmentService') private departmentService: () => DepartmentService;
  public department: IDepartment = new Department();

  @Inject('locationService') private locationService: () => LocationService;

  public locations: ILocation[] = [];

  @Inject('employeeService') private employeeService: () => EmployeeService;

  public employees: IEmployee[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.departmentId) {
        vm.retrieveDepartment(to.params.departmentId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.department.id) {
      this.departmentService()
        .update(this.department)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.department.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.departmentService()
        .create(this.department)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.department.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveDepartment(departmentId): void {
    this.departmentService()
      .find(departmentId)
      .then(res => {
        this.department = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.locationService()
      .retrieve()
      .then(res => {
        this.locations = res.data;
      });
    this.employeeService()
      .retrieve()
      .then(res => {
        this.employees = res.data;
      });
  }
}
