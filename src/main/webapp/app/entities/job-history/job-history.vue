<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.jobHistory.home.title')" id="job-history-heading">Job Histories</span>
            <router-link :to="{name: 'JobHistoryCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-job-history">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.jobHistory.home.createLabel')">
                    Create a new Job History
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && jobHistories && jobHistories.length === 0">
            <span v-text="$t('jhipsterApp.jobHistory.home.notFound')">No jobHistories found</span>
        </div>
        <div class="table-responsive" v-if="jobHistories && jobHistories.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('startDate')"><span v-text="$t('jhipsterApp.jobHistory.startDate')">Start Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('endDate')"><span v-text="$t('jhipsterApp.jobHistory.endDate')">End Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('language')"><span v-text="$t('jhipsterApp.jobHistory.language')">Language</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('job.id')"><span v-text="$t('jhipsterApp.jobHistory.job')">Job</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('department.id')"><span v-text="$t('jhipsterApp.jobHistory.department')">Department</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('employee.id')"><span v-text="$t('jhipsterApp.jobHistory.employee')">Employee</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="jobHistory in jobHistories"
                    :key="jobHistory.id">
                    <td>
                        <router-link :to="{name: 'JobHistoryView', params: {jobHistoryId: jobHistory.id}}">{{jobHistory.id}}</router-link>
                    </td>
                    <td>{{jobHistory.startDate | formatDate}}</td>
                    <td>{{jobHistory.endDate | formatDate}}</td>
                    <td v-text="$t('jhipsterApp.Language.' + jobHistory.language)">{{jobHistory.language}}</td>
                    <td>
                        <div v-if="jobHistory.job">
                            <router-link :to="{name: 'JobView', params: {jobId: jobHistory.job.id}}">{{jobHistory.job.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="jobHistory.department">
                            <router-link :to="{name: 'DepartmentView', params: {departmentId: jobHistory.department.id}}">{{jobHistory.department.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="jobHistory.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: jobHistory.employee.id}}">{{jobHistory.employee.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'JobHistoryView', params: {jobHistoryId: jobHistory.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'JobHistoryEdit', params: {jobHistoryId: jobHistory.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(jobHistory)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jhipsterApp.jobHistory.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-jobHistory-heading" v-bind:title="$t('jhipsterApp.jobHistory.delete.question')">Are you sure you want to delete this Job History?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-jobHistory" v-text="$t('entity.action.delete')" v-on:click="removeJobHistory()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./job-history.component.ts">
</script>
