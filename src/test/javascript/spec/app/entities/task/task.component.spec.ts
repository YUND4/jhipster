/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import TaskComponent from '@/entities/task/task.vue';
import TaskClass from '@/entities/task/task.component';
import TaskService from '@/entities/task/task.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('Task Management Component', () => {
    let wrapper: Wrapper<TaskClass>;
    let comp: TaskClass;
    let taskServiceStub: SinonStubbedInstance<TaskService>;

    beforeEach(() => {
      taskServiceStub = sinon.createStubInstance<TaskService>(TaskService);
      taskServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TaskClass>(TaskComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          taskService: () => taskServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      taskServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTasks();
      await comp.$nextTick();

      // THEN
      expect(taskServiceStub.retrieve.called).toBeTruthy();
      expect(comp.tasks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      taskServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeTask();
      await comp.$nextTick();

      // THEN
      expect(taskServiceStub.delete.called).toBeTruthy();
      expect(taskServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
