<template>
    <div class="app-container">
        <el-row :gutter="20">
        
        <!-- First column -->
        <el-col :span="10">
        <el-card class="box-card; scroll" style="height: 910px;">

            <!-- Card header         -->
            <div slot="header" class="clearfix">
                <span>Assignment List</span>
                <el-button style="float: right" size="mini" type="warning" @click="modalAssignment=true" icon="el-icon-plus" circle></el-button>

            </div>

            <!-- Assignment cards list -->
            <div v-for="(assignment, i) in assignments" :key="i">
                <el-card shadow="hover" class="box-card">
                    <div>
                        <el-tag style="float: right" type="success" size="mini">
                            {{assignment.status}}
                        </el-tag>

                        <div class="title">
                            {{assignment.title}}
                        </div>

                        <div class="date" style="float: right">
                            {{ moment(assignment.created_at).format('MMMM Do YYYY') }}
                        </div>

                        <div class="assignor-name">
                            {{assignment.assigned_by.name}}
                        </div>
                        <div class="assignee-name">
                            {{assignment.assigned_to.name}}
                        </div>

                        <!-- <div class="description">
                            {{assignment.description}}
                        </div> -->

                        <el-button size="mini" type="primary" plain @click="descriptionMethod">More info</el-button>

                    </div>
                </el-card>

                <!-- New assignment modal pop-up -->
                <el-dialog title="New Assignment" :visible.sync="modalAssignment">
                <el-form>                    

                    <el-form-item label="Title" :label-width="formLabelWidth">
                        <el-input v-model="newAssignment.title"></el-input>
                    </el-form-item>

                    <el-form-item label="Assign To" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="24">
                                <el-select v-model="newAssignment.assignee_id" filterable placeholder="Select" style="width:100%">
                                    <el-option 
                                        v-for="item in users" 
                                        :key="item" :label="item.name" 
                                        :value="item.id"> </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="Date" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="10">
                                <el-date-picker type="date" placeholder="Start date" v-model="newAssignment.start" style="width:100%"></el-date-picker>
                            </el-col>
                            <el-col :span="2" :offset="1"> to </el-col>
                            <el-col :span="10" :offset="1">
                                <el-date-picker type="date" placeholder="Due date" v-model="newAssignment.end" style="width:100%"></el-date-picker>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="Description" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="newAssignment.description" :rows="5"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modalAssignment = false">Cancel</el-button>
                    <el-button type="primary" @click.prevent="add">Create</el-button>
                </span>
                </el-dialog>

            </div>
        </el-card>
        </el-col>

        <!-- Second column -->
        <el-col :span="14">
        <el-container style="height: 910px; border: 1px solid #eee">
            
            <div :visible.sync="descriptionMethod">
                <description/>
            </div>
            
        </el-container>
        </el-col>


        </el-row>

    </div>
</template>


<script>
import { getAssignments, createAssignment, getUsers } from '@/api/assignment'
import moment from 'moment'
import description from './description.vue'

  export default {
    
    name: 'index',
    components: {
        description
    },
      
    data() {
      return {
        modalAssignment: false,
        formLabelWidth: '120px',
        newAssignment: {},
        inputVisible: false,
        assignments: [],
        options: [],
        value: '',
        descriptionMethod: []
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

        descriptionMethod() {

        },

        add: function(e) {

            // format date
            this.newAssignment.start = moment(this.newAssignment.start).format('YYYY-MM-DD')
            this.newAssignment.end = moment(this.newAssignment.end).format('YYYY-MM-DD')

            createAssignment(this.newAssignment)
                .then(resp => {
                    this.modalAssignment = false
                    this.newAssignment = {}

                    this.getAssignments()
                })
        },
    }
}
</script>


<style scoped>
    .title {
        font-size: 15px;
        font-weight: 600;
        padding-bottom: 6px;
    }

    .date {
        font-size: 14px;
    }

    .assignor-name {
        font-size: 14px;
        font-weight: 500;
        padding-bottom: 4px;
    }

    .assignee-name {
        font-size: 14px;
        color: #60a3bc;
        padding-bottom: 6px;
    }

    .description {
        font-size: 14px;
        color: #7f8c8d;
        padding-bottom: 10px;
    }

    .tags {
        font-size: 14px;
        color: #f39c12;
    }

    .el-card {
        margin-bottom: 10px;
        overflow-y: auto;
    }

    .el-tag + .el-tag {
        margin-left: 10px;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    

</style>
