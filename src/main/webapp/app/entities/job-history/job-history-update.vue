<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.jobHistory.home.createOrEditLabel" v-text="$t('jhipsterApp.jobHistory.home.createOrEditLabel')">Create or edit a JobHistory</h2>
                <div>
                    <div class="form-group" v-if="jobHistory.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="jobHistory.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.jobHistory.startDate')" for="job-history-startDate">Start Date</label>
                        <div class="d-flex">
                            <input id="job-history-startDate" type="datetime-local" class="form-control" name="startDate" :class="{'valid': !$v.jobHistory.startDate.$invalid, 'invalid': $v.jobHistory.startDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.jobHistory.startDate.$model)"
                            @change="updateInstantField('startDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.jobHistory.endDate')" for="job-history-endDate">End Date</label>
                        <div class="d-flex">
                            <input id="job-history-endDate" type="datetime-local" class="form-control" name="endDate" :class="{'valid': !$v.jobHistory.endDate.$invalid, 'invalid': $v.jobHistory.endDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.jobHistory.endDate.$model)"
                            @change="updateInstantField('endDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.jobHistory.language')" for="job-history-language">Language</label>
                        <select class="form-control" name="language" :class="{'valid': !$v.jobHistory.language.$invalid, 'invalid': $v.jobHistory.language.$invalid }" v-model="$v.jobHistory.language.$model" id="job-history-language" >
                            <option value="FRENCH" v-bind:label="$t('jhipsterApp.Language.FRENCH')">FRENCH</option>
                            <option value="ENGLISH" v-bind:label="$t('jhipsterApp.Language.ENGLISH')">ENGLISH</option>
                            <option value="SPANISH" v-bind:label="$t('jhipsterApp.Language.SPANISH')">SPANISH</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.jobHistory.job')" for="job-history-job">Job</label>
                        <select class="form-control" id="job-history-job" name="job" v-model="jobHistory.job">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="jobHistory.job && jobOption.id === jobHistory.job.id ? jobHistory.job : jobOption" v-for="jobOption in jobs" :key="jobOption.id">{{jobOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.jobHistory.department')" for="job-history-department">Department</label>
                        <select class="form-control" id="job-history-department" name="department" v-model="jobHistory.department">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="jobHistory.department && departmentOption.id === jobHistory.department.id ? jobHistory.department : departmentOption" v-for="departmentOption in departments" :key="departmentOption.id">{{departmentOption.id}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.jobHistory.employee')" for="job-history-employee">Employee</label>
                        <select class="form-control" id="job-history-employee" name="employee" v-model="jobHistory.employee">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="jobHistory.employee && employeeOption.id === jobHistory.employee.id ? jobHistory.employee : employeeOption" v-for="employeeOption in employees" :key="employeeOption.id">{{employeeOption.id}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.jobHistory.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./job-history-update.component.ts">
</script>
