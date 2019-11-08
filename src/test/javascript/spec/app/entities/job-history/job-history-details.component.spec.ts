/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import JobHistoryDetailComponent from '@/entities/job-history/job-history-details.vue';
import JobHistoryClass from '@/entities/job-history/job-history-details.component';
import JobHistoryService from '@/entities/job-history/job-history.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('JobHistory Management Detail Component', () => {
    let wrapper: Wrapper<JobHistoryClass>;
    let comp: JobHistoryClass;
    let jobHistoryServiceStub: SinonStubbedInstance<JobHistoryService>;

    beforeEach(() => {
      jobHistoryServiceStub = sinon.createStubInstance<JobHistoryService>(JobHistoryService);

      wrapper = shallowMount<JobHistoryClass>(JobHistoryDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { jobHistoryService: () => jobHistoryServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundJobHistory = { id: 123 };
        jobHistoryServiceStub.find.resolves(foundJobHistory);

        // WHEN
        comp.retrieveJobHistory(123);
        await comp.$nextTick();

        // THEN
        expect(comp.jobHistory).toBe(foundJobHistory);
      });
    });
  });
});
