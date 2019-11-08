<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="job">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.job.detail.title')">Job</span> {{job.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.job.jobTitle')">Job Title</span>
                    </dt>
                    <dd>
                        <span>{{job.jobTitle}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.job.minSalary')">Min Salary</span>
                    </dt>
                    <dd>
                        <span>{{job.minSalary}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.job.maxSalary')">Max Salary</span>
                    </dt>
                    <dd>
                        <span>{{job.maxSalary}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.job.employee')">Employee</span>
                    </dt>
                    <dd>
                        <div v-if="job.employee">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: job.employee.id}}">{{job.employee.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.job.task')">Task</span>
                    </dt>
                    <dd>
                        <span v-for="(task, i) in job.tasks" :key="task.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'TaskView', params: {taskId: task.id}}">{{task.title}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="job.id" :to="{name: 'JobEdit', params: {jobId: job.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./job-details.component.ts">
</script>
