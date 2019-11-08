import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const Region = () => import('../entities/region/region.vue');
// prettier-ignore
const RegionUpdate = () => import('../entities/region/region-update.vue');
// prettier-ignore
const RegionDetails = () => import('../entities/region/region-details.vue');
// prettier-ignore
const Country = () => import('../entities/country/country.vue');
// prettier-ignore
const CountryUpdate = () => import('../entities/country/country-update.vue');
// prettier-ignore
const CountryDetails = () => import('../entities/country/country-details.vue');
// prettier-ignore
const Location = () => import('../entities/location/location.vue');
// prettier-ignore
const LocationUpdate = () => import('../entities/location/location-update.vue');
// prettier-ignore
const LocationDetails = () => import('../entities/location/location-details.vue');
// prettier-ignore
const Department = () => import('../entities/department/department.vue');
// prettier-ignore
const DepartmentUpdate = () => import('../entities/department/department-update.vue');
// prettier-ignore
const DepartmentDetails = () => import('../entities/department/department-details.vue');
// prettier-ignore
const Task = () => import('../entities/task/task.vue');
// prettier-ignore
const TaskUpdate = () => import('../entities/task/task-update.vue');
// prettier-ignore
const TaskDetails = () => import('../entities/task/task-details.vue');
// prettier-ignore
const Employee = () => import('../entities/employee/employee.vue');
// prettier-ignore
const EmployeeUpdate = () => import('../entities/employee/employee-update.vue');
// prettier-ignore
const EmployeeDetails = () => import('../entities/employee/employee-details.vue');
// prettier-ignore
const Job = () => import('../entities/job/job.vue');
// prettier-ignore
const JobUpdate = () => import('../entities/job/job-update.vue');
// prettier-ignore
const JobDetails = () => import('../entities/job/job-details.vue');
// prettier-ignore
const JobHistory = () => import('../entities/job-history/job-history.vue');
// prettier-ignore
const JobHistoryUpdate = () => import('../entities/job-history/job-history-update.vue');
// prettier-ignore
const JobHistoryDetails = () => import('../entities/job-history/job-history-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    }
    ,
    {
      path: '/entity/region',
      name: 'Region',
      component: Region,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/region/new',
      name: 'RegionCreate',
      component: RegionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/region/:regionId/edit',
      name: 'RegionEdit',
      component: RegionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/region/:regionId/view',
      name: 'RegionView',
      component: RegionDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/country',
      name: 'Country',
      component: Country,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/country/new',
      name: 'CountryCreate',
      component: CountryUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/country/:countryId/edit',
      name: 'CountryEdit',
      component: CountryUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/country/:countryId/view',
      name: 'CountryView',
      component: CountryDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/location',
      name: 'Location',
      component: Location,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/location/new',
      name: 'LocationCreate',
      component: LocationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/location/:locationId/edit',
      name: 'LocationEdit',
      component: LocationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/location/:locationId/view',
      name: 'LocationView',
      component: LocationDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/department',
      name: 'Department',
      component: Department,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/department/new',
      name: 'DepartmentCreate',
      component: DepartmentUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/department/:departmentId/edit',
      name: 'DepartmentEdit',
      component: DepartmentUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/department/:departmentId/view',
      name: 'DepartmentView',
      component: DepartmentDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/task',
      name: 'Task',
      component: Task,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/task/new',
      name: 'TaskCreate',
      component: TaskUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/task/:taskId/edit',
      name: 'TaskEdit',
      component: TaskUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/task/:taskId/view',
      name: 'TaskView',
      component: TaskDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/employee',
      name: 'Employee',
      component: Employee,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/employee/new',
      name: 'EmployeeCreate',
      component: EmployeeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/employee/:employeeId/edit',
      name: 'EmployeeEdit',
      component: EmployeeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/employee/:employeeId/view',
      name: 'EmployeeView',
      component: EmployeeDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/job',
      name: 'Job',
      component: Job,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/job/new',
      name: 'JobCreate',
      component: JobUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/job/:jobId/edit',
      name: 'JobEdit',
      component: JobUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/job/:jobId/view',
      name: 'JobView',
      component: JobDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/job-history',
      name: 'JobHistory',
      component: JobHistory,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/job-history/new',
      name: 'JobHistoryCreate',
      component: JobHistoryUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/job-history/:jobHistoryId/edit',
      name: 'JobHistoryEdit',
      component: JobHistoryUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/job-history/:jobHistoryId/view',
      name: 'JobHistoryView',
      component: JobHistoryDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
