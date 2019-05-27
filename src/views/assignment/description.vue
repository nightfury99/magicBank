<template>
<div>

    <div v-for="(assignment, i) in assignments" :key="i">

        <!-- Container header         -->
        <el-header class="container-header">
            {{assignment.title}}
        </el-header>

        <!-- Container content -->
        <el-main>
            <el-row :gutter="20">

            <el-col :span="2">
                <img :src="avatar" class="user-avatar">
            </el-col>

            <el-col :span="10">
                <div class="assignor-name">
                    {{assignment.assigned_by.name}}
                </div>

                <div class="date">
                    {{ moment(assignment.created_at).format('MMMM Do YYYY') }}
                </div>

                <div class="assignee-name">
                    To: {{assignment.assigned_to.name}}
                </div>
            </el-col>
            </el-row>
            
            <el-row :gutter="20" class="description-box">
                {{assignment.description}}
            </el-row>
        </el-main>


        <!-- Assignment description -->
        <el-main class="container-main-center">
        </el-main>
    
    </div>

</div>
</template>

<script>
import { getAssignments, getUsers } from '@/api/assignment'
import moment from 'moment'
import index from './index.vue'

export default {
    name: 'description',
    props: {

    },

    data() {
        return {
            assignments: [],
        }
    },

    mounted() {
        this.getAssignments()
        this.getUsers()
    },

    methods: {

        moment: function (date) {
            return moment(date);
        },

        date: function (date) {
            return moment(date).format('MMMM Do YYYY');
        },

        getAssignments() {
            getAssignments()
                .then(resp => {
                    this.assignments = resp.data.data
                })
        },

        getUsers() {
            getUsers()
                .then(resp => {
                    this.users = resp.data.data
                })
        },

    }


}
</script>


<style scoped>

    .container-header {
        font-size: 16px;
        font-weight: bold;
        padding: 20px;
    }

    .container-main-center {
        font-size: 16px;
        margin: 350px;
        text-align: center;
    }

    .user-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .assignor-name {
        font-size: 14px;
        padding-bottom: 6px;
    }

    .date {
        font-size: 14px;
        padding-bottom: 6px;
        color: #7f8c8d;
    }

    .assignee-name {
        font-size: 14px;
        padding-bottom: 6px;
    }

    .description-box {
        padding: 32px;
    }


</style>
