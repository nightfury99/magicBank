<template>
    <div class="app-container">
        <el-row :gutter="20">
        
        <!-- First column -->
        <el-col :span="12">
            <div class="scroll crm-box-container" style="height: 90vh; overflow: scroll; padding-bottom: 30px;">
                
                <div class="crm-box-header">
                    <span>Assignment List</span>
                    <el-button style="float: right" size="mini" type="warning" @click="modalAssignment=true" icon="el-icon-plus" circle></el-button>
                </div>

                <!-- Assignment cards list -->
                <div v-for="(assignment, i) in assignments" :key="i">
                    <div type="flex assignment" @click="descriptionMethod(assignment)">
                        <div 
                            class="list crm-box-content data" 
                            :class="assignment.status == 1 ? 'crm-color-primary-light' : ''">
                            
                            <span class="crm-heading-medium-title">
                                {{ assignment.assigned_by.name }}
                            </span>

                            <span class="crm-timestamp" style="float: right">
                                {{ assignment.created_at | moment("from", "now") }}
                            </span>

                            <div class="crm-heading-content">
                                {{ assignment.title }}
                            </div>

                        </div>
                    </div>

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
                                                :key="item.id" :label="item.name" 
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
                                    <el-col :span="2" :offset="1">To</el-col>
                                    <el-col :span="10">
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

                <el-row>
                    <el-col :span="24" align="center">
                        <pagination
                            background
                            layout="prev, pager, next"
                            :page-count="query.page_count"
                            :total="query.total"
                            @pagination="getAssignments" />
                    </el-col>
                </el-row>
            </div>
        </el-col>

        <!-- Second column -->
        <el-col :span="12">
            <div class="crm-box-container" style="overflow: scroll; height: 90vh;">
                
                <div class="crm-box-header crm-border-bottom clearfix">
                    <el-button type="success" icon="el-icon-sucess" style="float: right;">Complete</el-button>
                </div>

                <div class="crm-box-content">

                    <div style="margin-bottom:10px;" v-if="selectAssignment">
                        
                        <el-row>
                            <el-col :span="20">
                                <span class="crm-heading-small-title">
                                    <span class="assignee-name">{{ selectAssignment.assigned_by.name }}</span> to <span class="assignee-name">{{ selectAssignment.assigned_to.name }}</span>
                                </span>
                            </el-col>
                            <el-col :span="4">
                                <div class="crm-timestamp crm-row-bg" v-if="selectAssignment">
                                    {{ moment(selectAssignment.created_at).format('DD MMM YYYY') }}
                                </div>
                            </el-col>
                        </el-row>
                        
                        <el-row>
                            
                        </el-row>
                        
                    </div>
                    
                    <!-- Container header -->
                    <div class="crm-heading-title" v-if="selectAssignment">
                        {{ selectAssignment.title }}
                    </div>

                    <!-- Container content -->
                    <div class="crm-heading-content" v-if="selectAssignment">
                        {{selectAssignment.description}}
                    </div>

                </div>

            </div>
        </el-col>


        </el-row>

    </div>
</template>


<script>
import { getAssignments, createAssignment, getUsers } from '@/api/assignment'
import moment from 'moment'
import Pagination from '@/components/Pagination'

  export default {

    components: {
        Pagination
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
        selectAssignment: {},
        users: [],
        query: {
            page: 1,
            page_count: 1,
            total: 0,
        },
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

        getAssignments(val) {

            if (val) {
                this.query.page = val.page
            }

            getAssignments(this.query)
                .then(resp => {
                    this.assignments = resp.data.data
                    this.query.page_count = resp.data.meta.pagination.total_pages
                    this.query.total = resp.data.meta.pagination.total

                    this.selectAssignment = this.assignments[0]
                })
        },

        getUsers() {
            getUsers()
                .then(resp => {
                    this.users = resp.data.data
                })
        },

        descriptionMethod: function(assignment) {
            this.selectAssignment = assignment
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

    .date-desc {
        font-size: 14px;
        padding-bottom: 6px;
        color: #7f8c8d;
    }

    .tags {
        font-size: 14px;
        color: #f39c12;
    }

    .el-card {
        margin-bottom: 10px;
        overflow-y: auto;
    }

    .el-card:hover {
        cursor: pointer;
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

    .list.crm-box-content {
        border-bottom: 1px solid;
        border-color: #FFF8BC;
        cursor: pointer;
    }
    
    .data:hover, .crm-box-content.selected {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    

</style>
