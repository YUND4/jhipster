<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.job.home.title')" id="job-heading">Jobs</span>
            <router-link :to="{name: 'JobCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-job">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.job.home.createLabel')">
                    Create a new Job
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
        <div class="alert alert-warning" v-if="!isFetching && jobs && jobs.length === 0">
            <span v-text="$t('jhipsterApp.job.home.notFound')">No jobs found</span>
        </div>
        <div class="table-responsive" v-if="jobs && jobs.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('jobTitle')"><span v-text="$t('jhipsterApp.job.jobTitle')">Job Title</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('minSalary')"><span v-text="$t('jhipsterApp.job.minSalary')">Min Salary</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('maxSalary')"><span v-text="$t('jhipsterApp.job.maxSalary')">Max Salary</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('employee.id')"><span v-text="$t('jhipsterApp.job.employee')">Employee</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="job in jobs"
                    :key="job.id">
                    <td>
                        <router-link :to="{name: 'JobView', params: {jobId: job.id}}">{{job.id}}</router-link>
                    </td>
                    <td>{{job.jobTitle}}</td>
                    <td>{{job.minSalary}}</td>
                    <td>{{job.maxSalary}}</td>
                    <td>
                        <div v-if="job.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: job.employee.id}}">{{job.employee.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'JobView', params: {jobId: job.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'JobEdit', params: {jobId: job.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(job)"
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
            <span slot="modal-title"><span id="jhipsterApp.job.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-job-heading" v-bind:title="$t('jhipsterApp.job.delete.question')">Are you sure you want to delete this Job?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-job" v-text="$t('entity.action.delete')" v-on:click="removeJob()">Delete</button>
            </div>
        </b-modal>
        <div v-show="jobs && jobs.length > 0">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./job.component.ts">
</script>
