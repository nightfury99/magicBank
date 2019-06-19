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
                                        <el-select 
                                            v-model="newAssignment.assignee_id" 
                                            filterable 
                                            multiple 
                                            placeholder="Select" 
                                            style="width:100%">
                                            <el-option 
                                                v-for="item in users" 
                                                :key="item.id" 
                                                :label="item.name" 
                                                :value="item.id"> </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-form-item>

                            <el-form-item label="Date" :label-width="formLabelWidth">
                                <el-row>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="Start date" v-model="newAssignment.start" style="width:100%"></el-date-picker>
                                    </el-col>
                                    <el-col :span="1" :offset="1">To</el-col>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="Due date" v-model="newAssignment.end" style="width:100%"></el-date-picker>
                                    </el-col>
                                </el-row>
                            </el-form-item>

                            <el-form-item label="Description" :label-width="formLabelWidth">
                                <el-input type="textarea" v-model="newAssignment.description" :rows="5"></el-input>
                            </el-form-item>

                            <el-row>
                                <el-col :span="12">

                                <el-form-item label="Type" :label-width="formLabelWidth">
                                    <el-select 
                                        v-model="newAssignment.type"
                                        placeholder="Select">
                                        <el-option
                                            v-for="item in type"
                                            :key="item.type"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                </el-col>

                                <el-col :span="12">
                                <el-form-item label="Upload" :label-width="formLabelWidth">
                                    <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :auto-upload="false">
                                        <el-button size="small" type="primary">Click to upload</el-button>
                                    </el-upload>
                                </el-form-item>

                                </el-col>
                            </el-row>


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
                
                <el-row>

                    <div class="crm-box-header crm-border-bottom clearfix">
                        <el-col :span="21">
                        <el-tag type="success" style="float: right;"> 
                            {{ selectAssignment.status }}
                        </el-tag>
                        </el-col>


                        <el-col :span="3">
                        <el-button 
                            @click="showAlert"
                            type="success" 
                            icon="el-icon-sucess" 
                            size="small" 
                            style="float: right;">
                                Complete
                            </el-button>
                        </el-col>

                    </div>

                </el-row>

                <div class="crm-box-content">

                    <div style="margin-bottom:10px;" v-if="selectAssignment">
                        
                        <el-row>
                            <el-col :span="20">
                                <span class="crm-heading-small-title">
                                    <span class="assignee-name">{{ selectAssignment.assigned_by.name }}</span> to <span class="assignee-name">{{ selectAssignment.assigned_to.name }}</span>
                                </span>
                            </el-col>
                            
                            <!-- Created at -->
                            <el-col :span="4">
                                <div class="crm-timestamp crm-row-bg" v-if="selectAssignment">
                                    {{ moment(selectAssignment.created_at).format('DD MMM YYYY') }}
                                </div>
                            </el-col>
                        </el-row>
                        
                        <el-row>

                            <!-- Due date -->
                            <!-- <el-col :span="4">
                                <div class="crm-timestamp crm-row-bg" v-if="selectAssignment">
                                    {{ moment(selectAssignment.created_at).format('DD MMM YYYY') }}
                                </div>
                            </el-col> -->
                            
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
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import { getAssignments, createAssignment, getUsers } from '@/api/assignment'
import moment from 'moment'
import Pagination from '@/components/Pagination'

Vue.use(VueSweetalert2)

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
        type: [{
          value: 'Sales',
          label: 'Sales'
        }, {
          value: 'Credit',
          label: 'Credit'
        }, {
          value: 'Other',
          label: 'Other'
        },],
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

        showAlert(){
            // Use sweetalert2
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, confirm!'
                }).then((result) => {
                if (result.value) {
                    this.$swal(
                    'Completed!',
                    'The assignment has been completed',
                    'success'
                    )
                }
                })
        }
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
