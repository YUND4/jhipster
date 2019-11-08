<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="jobHistory">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.jobHistory.detail.title')">JobHistory</span> {{jobHistory.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.jobHistory.startDate')">Start Date</span>
                    </dt>
                    <dd>
                        <span>{{jobHistory.startDate | formatDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.jobHistory.endDate')">End Date</span>
                    </dt>
                    <dd>
                        <span>{{jobHistory.endDate | formatDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.jobHistory.language')">Language</span>
                    </dt>
                    <dd>
                        <span v-text="$t('jhipsterApp.Language.' + jobHistory.language)">{{jobHistory.language}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.jobHistory.job')">Job</span>
                    </dt>
                    <dd>
                        <div v-if="jobHistory.job">
                            <router-link :to="{name: 'JobView', params: {jobId: jobHistory.job.id}}">{{jobHistory.job.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.jobHistory.department')">Department</span>
                    </dt>
                    <dd>
                        <div v-if="jobHistory.department">
                            <router-link :to="{name: 'DepartmentView', params: {departmentId: jobHistory.department.id}}">{{jobHistory.department.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.jobHistory.employee')">Employee</span>
                    </dt>
                    <dd>
                        <div v-if="jobHistory.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: jobHistory.employee.id}}">{{jobHistory.employee.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="jobHistory.id" :to="{name: 'JobHistoryEdit', params: {jobHistoryId: jobHistory.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./job-history-details.component.ts">
</script>
