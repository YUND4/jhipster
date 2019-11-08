/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import JobUpdateComponent from '@/entities/job/job-update.vue';
import JobClass from '@/entities/job/job-update.component';
import JobService from '@/entities/job/job.service';

import EmployeeService from '@/entities/employee/employee.service';

import TaskService from '@/entities/task/task.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Job Management Update Component', () => {
    let wrapper: Wrapper<JobClass>;
    let comp: JobClass;
    let jobServiceStub: SinonStubbedInstance<JobService>;

    beforeEach(() => {
      jobServiceStub = sinon.createStubInstance<JobService>(JobService);

      wrapper = shallowMount<JobClass>(JobUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          jobService: () => jobServiceStub,

          employeeService: () => new EmployeeService(),

          taskService: () => new TaskService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.job = entity;
        jobServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(jobServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.job = entity;
        jobServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(jobServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
