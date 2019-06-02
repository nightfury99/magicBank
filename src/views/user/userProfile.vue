<template>
    <div class="app-container">
        <el-row :gutter="20">
        
            <!-- First column -->
            <el-col :span="10">
                <el-card class="box-card; scroll" style="height: 910px;">
                </el-card>
            </el-col>

            <!-- Second column -->
            <el-col :span="14">
                <el-card class="box-card; scroll" shadow="never" style="height: 910px;">
                </el-card>
            
            </el-col>
        </el-row>
    </div>
</template>


<script>
import { getAssignments, createAssignment, getUsers } from '@/api/assignment'
import moment from 'moment'
import Pagination from '@/components/Pagination'

  export default {
    
    name: 'index',
    components: {
        Pagination
    },
      
    data() {
      return {
        image: 'https://1ofdmq2n8tc36m6i46scovo2e-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/Steven_Hallam-slide.jpg',
     }
    },

    mounted() {
    },

    methods: {

    }
}
</script>

<style scoped>

</style>
