<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="country">
                <h2 class="jh-entity-heading"><span v-text="$t('jhipsterApp.country.detail.title')">Country</span> {{country.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jhipsterApp.country.countryName')">Country Name</span>
                    </dt>
                    <dd>
                        <span>{{country.countryName}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jhipsterApp.country.region')">Region</span>
                    </dt>
                    <dd>
                        <div v-if="country.region">
                            <router-link :to="{name: 'RegionView', params: {regionId: country.region.id}}">{{country.region.id}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="country.id" :to="{name: 'CountryEdit', params: {countryId: country.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./country-details.component.ts">
</script>
