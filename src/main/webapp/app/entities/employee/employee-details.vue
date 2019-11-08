<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="employee">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.employee.detail.title')">Employee</span> {{employee.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.firstName')">First Name</span>
                    </dt>
                    <dd>
                        <span>{{employee.firstName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.lastName')">Last Name</span>
                    </dt>
                    <dd>
                        <span>{{employee.lastName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.email')">Email</span>
                    </dt>
                    <dd>
                        <span>{{employee.email}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.phoneNumber')">Phone Number</span>
                    </dt>
                    <dd>
                        <span>{{employee.phoneNumber}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.hireDate')">Hire Date</span>
                    </dt>
                    <dd>
                        <span>{{employee.hireDate | formatDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.salary')">Salary</span>
                    </dt>
                    <dd>
                        <span>{{employee.salary}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.commissionPct')">Commission Pct</span>
                    </dt>
                    <dd>
                        <span>{{employee.commissionPct}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.department')">Department</span>
                    </dt>
                    <dd>
                        <div v-if="employee.department">
                            <router-link :to="{name: 'DepartmentView', params: {departmentId: employee.department.id}}">{{employee.department.id}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.employee.manager')">Manager</span>
                    </dt>
                    <dd>
                        <div v-if="employee.manager">
                            <router-link :to="{name: 'EmployeeView', params: {managerId: employee.manager.id}}">{{employee.manager.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="employee.id" :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./employee-details.component.ts">
</script>
