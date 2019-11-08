<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.task.home.title')" id="task-heading">Tasks</span>
            <router-link :to="{name: 'TaskCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-task">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.task.home.createLabel')">
                    Create a new Task
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
        <div class="alert alert-warning" v-if="!isFetching && tasks && tasks.length === 0">
            <span v-text="$t('jhipsterApp.task.home.notFound')">No tasks found</span>
        </div>
        <div class="table-responsive" v-if="tasks && tasks.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jhipsterApp.task.title')">Title</span></th>
                    <th><span v-text="$t('jhipsterApp.task.description')">Description</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="task in tasks"
                    :key="task.id">
                    <td>
                        <router-link :to="{name: 'TaskView', params: {taskId: task.id}}">{{task.id}}</router-link>
                    </td>
                    <td>{{task.title}}</td>
                    <td>{{task.description}}</td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'TaskView', params: {taskId: task.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'TaskEdit', params: {taskId: task.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(task)"
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
            <span slot="modal-title"><span id="jhipsterApp.task.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-task-heading" v-bind:title="$t('jhipsterApp.task.delete.question')">Are you sure you want to delete this Task?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-task" v-text="$t('entity.action.delete')" v-on:click="removeTask()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./task.component.ts">
</script>
