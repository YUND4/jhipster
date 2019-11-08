<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.employee.home.title')" id="employee-heading">Employees</span>
            <router-link :to="{name: 'EmployeeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-employee">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.employee.home.createLabel')">
                    Create a new Employee
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
        <div class="alert alert-warning" v-if="!isFetching && employees && employees.length === 0">
            <span v-text="$t('jhipsterApp.employee.home.notFound')">No employees found</span>
        </div>
        <div class="table-responsive" v-if="employees && employees.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('firstName')"><span v-text="$t('jhipsterApp.employee.firstName')">First Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('lastName')"><span v-text="$t('jhipsterApp.employee.lastName')">Last Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('email')"><span v-text="$t('jhipsterApp.employee.email')">Email</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('phoneNumber')"><span v-text="$t('jhipsterApp.employee.phoneNumber')">Phone Number</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('hireDate')"><span v-text="$t('jhipsterApp.employee.hireDate')">Hire Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('salary')"><span v-text="$t('jhipsterApp.employee.salary')">Salary</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('commissionPct')"><span v-text="$t('jhipsterApp.employee.commissionPct')">Commission Pct</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('department.id')"><span v-text="$t('jhipsterApp.employee.department')">Department</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('manager.id')"><span v-text="$t('jhipsterApp.employee.manager')">Manager</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="employee in employees"
                    :key="employee.id">
                    <td>
                        <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}">{{employee.id}}</router-link>
                    </td>
                    <td>{{employee.firstName}}</td>
                    <td>{{employee.lastName}}</td>
                    <td>{{employee.email}}</td>
                    <td>{{employee.phoneNumber}}</td>
                    <td>{{employee.hireDate | formatDate}}</td>
                    <td>{{employee.salary}}</td>
                    <td>{{employee.commissionPct}}</td>
                    <td>
                        <div v-if="employee.department">
                            <router-link :to="{name: 'DepartmentView', params: {departmentId: employee.department.id}}">{{employee.department.id}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="employee.manager">
                            <router-link :to="{name: 'EmployeeView', params: {managerId: employee.manager.id}}">{{employee.manager.id}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'EmployeeView', params: {employeeId: employee.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EmployeeEdit', params: {employeeId: employee.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(employee)"
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
            <span slot="modal-title"><span id="jhipsterApp.employee.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-employee-heading" v-bind:title="$t('jhipsterApp.employee.delete.question')">Are you sure you want to delete this Employee?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-employee" v-text="$t('entity.action.delete')" v-on:click="removeEmployee()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./employee.component.ts">
</script>
