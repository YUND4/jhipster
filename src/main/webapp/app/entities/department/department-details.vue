<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="department">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.department.detail.title')">Department</span> {{department.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.department.departmentName')">Department Name</span>
                    </dt>
                    <dd>
                        <span>{{department.departmentName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.department.location')">Location</span>
                    </dt>
                    <dd>
                        <div v-if="department.location">
                            <router-link :to="{name: 'LocationView', params: {locationId: department.location.id}}">{{department.location.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="department.id" :to="{name: 'DepartmentEdit', params: {departmentId: department.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./department-details.component.ts">
</script>
