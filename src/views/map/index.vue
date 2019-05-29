<template>
    <div>

        <GmapMap
            :center="this.currentCoordinate"
            :zoom="7"
            :options="{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false
            }"
            style="width: 100%; height: 92vh"
            />

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Filter</span>
            </div>
            <div class="item" placeholder="Customer Type">
                <el-select v-model="filter.type">
                    <el-option
                        v-for="(type, i) in customerTypes"
                        :key="i"
                        :label="type"
                        :value="type"
                    />
                </el-select>
            </div>
            <div class="item" placeholder="Radius">
                <el-select v-model="filter.radius">
                    <el-option
                        v-for="(boundary, i) in boundaries"
                        :key="i"
                        :label="boudary"
                        :value="boundary"
                    />
                </el-select>
            </div>
            <div class="item" placeholder="Branch">
                <el-select v-model="filter.branch">
                    <el-option
                        v-for="(branch, i) in branches"
                        :key="i"
                        :label="branch.name"
                        :value="branch.id"
                    />
                </el-select>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getBranch } from '@/api/branch'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            currentCoordinate: {},
            selectedBoundary: '',
            boundaries: ['10km', '30km', '50km', 'All'],
            customerTypes: ['All', 'Suspect', 'Prospect'],
            branches: [],
            filter: {
                radius: '10km',
                type: 'All',
                branch: '',
            }
        }
    },
	
    computed: {
        ...mapGetters([
            'roles'
        ])
    },

    created() {
        this.geolocation()
        this.getBranches()
    },
        
    methods: {
        geolocation() {
            navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError)
        },

        buildUrl: function(position) {
            this.currentCoordinate = {lat: position.coords.latitude, lng: position.coords.longitude}
        },

        geoError(error) {
            this.$notify({
                title: 'Error',
                message: `Error getting location: ${error}`,
                type: 'error'
            });
        },

        getBranches() {
            getBranch()
                .then(resp => {
                    this.branches = resp.data.data
                })
        },
    }
}
</script>

<style scoped>

    .box-card {
        position: absolute;
        top: 0px;
        margin-top: 25px;
        margin-left: 25px;
        z-index: 100;
    }

    .item {
        margin-bottom: 5px;
    }

</style>
