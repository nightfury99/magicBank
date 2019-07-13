<template>
    <div>

        <GmapMap
            :center="this.currentCoordinate"
            :zoom="10"
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
            >

            <GmapMarker
                v-for="(marker, index) in markers"
                :key="index"
                :position="marker.position"
                :clickable="true"
                :draggable="false"
                :icon="marker.icon"
                @click="handleMarkerClick(marker)" />
        </GmapMap>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>Filter</span>
            </div>
            <div class="item" placeholder="Customer Type">
                <el-select v-model="filter.type" @change="getCustomers">
                    <el-option
                        v-for="(type, i) in customerTypes"
                        :key="i"
                        :label="type"
                        :value="type"
                    />
                </el-select>
            </div>
            <div class="item" placeholder="Radius">
                <el-select v-model="filter.radius" @change="getCustomers">
                    <el-option
                        v-for="(boundary, i) in boundaries"
                        :key="i"
                        :label="`${boundary}km`"
                        :value="boundary"
                    />
                </el-select>
            </div>
            <div class="item" placeholder="Branch">
                <el-select v-model="filter.branch_id" @change="getCustomers">
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
import { getCustomerMapSearch } from '@/api/customer'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            currentCoordinate: {lat: 2.909004, lng: 101.654508},
            selectedBoundary: '',
            boundaries: [10, 30, 50, 100],
            customerTypes: ['All', 'Suspect', 'Prospect', 'Customer'],
            branches: [],
            filter: {
                radius: 10,
                type: 'All',
                branch_id: '',
                lat: 3.536137,
                lng: 102.147557,
            },

            markers: [],
            path: {
                marker: process.env.MEDIA_PATH + '/' + process.env.MARKER_FOLDER
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
                    this.filter.branch_id = this.branches[0].id

                    this.getCustomers()
                })
        },

        handleMarkerClick(marker) {
            this.$router.push({ name: 'CustomerOne', params: { id: marker.id } })
        },

        getCustomers() {
            
            this.markers = []

            getCustomerMapSearch(this.filter)
                .then(resp => {

                    let ms = resp.data.data

                    ms.forEach(m => {

                        let marker = {
                            id: m.id,
                            label: m.name,
                            position: {lat: m.location.lat, lng: m.location.lng},
                        }

                        if(m.branch.code === 'TOLLING' || m.branch.code === 'LGEP') {
                            marker.icon = `${this.path.marker}/ic_${m.type}_${m.branch.code}.png`
                        } else {
                            marker.icon = `${this.path.marker}/ic_${m.type}.png`
                        }

                        this.markers.push(marker);

                    })
                })
        }
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
