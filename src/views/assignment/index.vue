<template>
    <div class="app-container">
        <el-row :gutter="20">
        
        <!-- First column -->
        <el-col :span="8">
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
                            :class="assignment.status == 'open' ? 'crm-color-primary-light' : 'crm-color-disabled'">

                            <span class="crm-heading-medium-title">
                                <el-tag 
                                    :type="assignment.status == 'open' ? 'success' : 'info'" size="mini">
                                    {{ assignment.status.toUpperCase() }}
                                </el-tag>
                                {{ assignment.assigned_by.name }} 
                            </span>

                            <span class="crm-timestamp" style="float: right">
                                {{ assignment.start_at | moment("from", "now") }}
                            </span>

                            <div class="crm-heading-content">
                                {{ assignment.title }}
                            </div>

                        </div>
                    </div>

                    <!-- New assignment modal pop-up -->
                    <el-dialog title="New Assignment" :visible.sync="modalAssignment">
                        <el-form>                    

                            <!-- Title -->
                            <el-form-item label="Title" :label-width="formLabelWidth">
                                <el-input v-model="newAssignment.title"></el-input>
                            </el-form-item>

                            <!-- Assign to -->
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

                            <!-- Date picker -->
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

                            <!-- Description -->
                            <el-form-item label="Description" :label-width="formLabelWidth">
                                <el-input type="textarea" v-model="newAssignment.description" :rows="5"></el-input>
                            </el-form-item>

                            <el-row>
                                <el-col :span="12">
                                <!-- Type selection     -->
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
                                <!-- Upload button     -->
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
                        <!-- Create or cancel buttons -->
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="modalAssignment = false">Cancel</el-button>
                            <el-button type="primary" @click.prevent="add">Create</el-button>
                        </span>
                    </el-dialog>

                </div>

                <!-- Pagination -->
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
        <el-col :span="16">
            <div class="crm-box-container" style="overflow: scroll; height: 90vh;">

                <el-row>

                    <div class="crm-box-header crm-border-bottom clearfix">
                        <el-col :span="2">
                            <!-- Status -->
                            <el-tag 
                                :type="selectAssignment.status == 'open' ? 'success' : 'info'"> 
                                {{ selectAssignment.status.toUpperCase() }}
                            </el-tag>  
                        </el-col>

                        <!-- Complete assignment button -->
                        <el-col :offset="19" :span="3">
                            <div>
                                <el-button 
                                    @click="showAlert"
                                    :type="selectAssignment.status == 'open' ? 'success' : 'info'"
                                    :disabled="selectAssignment.status !== 'open'"
                                    icon="el-icon-success" 
                                    size="small" 
                                    style="float: right;">
                                        Complete
                                </el-button>
                            </div>
                        </el-col>

                    </div>

                </el-row>

                <div class="crm-box-content">

                    <div style="margin-bottom:10px;" v-if="selectAssignment">

                        <el-row>
                            <!-- Container header -->
                            <div class="crm-heading-title" v-if="selectAssignment">
                                {{ selectAssignment.title }}
                            </div>

                            <!-- Created at -->
                            <el-col :span="12">
                                <div class="crm-timestamp crm-row-bg" v-if="selectAssignment">
                                    {{ moment(selectAssignment.start_at).format('dddd, DD MMM YYYY') }}
                                </div>
                            </el-col>

                            <!-- Due date -->
                            <el-col :span="12">
                                <div style="float:right" class="crm-timestamp crm-row-bg" v-if="selectAssignment">
                                    Due by: {{ moment(selectAssignment.end_at).format('dddd, DD MMM YYYY') }}
                                </div>
                            </el-col>
                        </el-row>

                        <!-- Assignor to Assignee -->
                        <el-row>
                            <el-col>
                                <span class="crm-heading-small-title">
                                    <span class="assignor-name">{{ selectAssignment.assigned_by.name + " to" }}</span>

                                    <span class="assignee-name"
                                        v-for="(assigned_to, index) in selectAssignment.assigned_to" :key="index">
                                        {{ assigned_to.name + ", " }}
                                    </span>
                                </span>
                            </el-col>
                            
                        </el-row>
                        
                    </div>
                    
                    <el-row>

                        <!-- Container content -->
                        <div class="crm-heading-content" v-if="selectAssignment">
                            {{selectAssignment.description}}
                        </div>
                    </el-row>

                    <!-- Comment box -->
                    <el-row>
                        <div class="list crm-box-comment form" v-if="selectAssignment">
                            
                            <!-- Add comment -->
                            <div class="list crm-box-comment form">
                                <text-area-emoji-picker 
                                    v-model="data.body"
                                    placeholder="Insert a comment"
                                    @handleEnter="postMessage"
                                    :disable="isSubmitted"
                                    />
                            </div>
                            
                            <!-- Comment list -->
                            <el-row class="list crm-box-comment form" v-for="(comment, index) in selectAssignment.comments" :key="index">
                                <div>
                                    <el-row>
                                    
                                    <el-col>
                                        <span class="crm-heading-medium-title">{{ comment.commentor_name }}</span>
                                        <span class="crm-timestamp clearfix" justify="end">{{ comment.created_at | moment("from", "now") }}</span>
                                    </el-col>

                                    </el-row>

                                    <el-row>
                                        <span class="crm-heading-content">{{ comment.body }}</span>
                                    </el-row>

                                </div>
                            </el-row>
                            <div class="divider"/>
                        </div>
                    </el-row>

                </div>

            </div>
        </el-col>


        </el-row>

    </div>
</template>


<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import { getAssignments, createAssignment, addComment, toggleStatus } from '@/api/assignment'
import { getUsers } from '@/api/user'
import moment from 'moment'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import TextAreaEmojiPicker from '@/components/TextAreaEmojiPicker'

Vue.use(VueSweetalert2)

  export default {

    components: {
        Pagination,
        TextAreaEmojiPicker
    },
      
    data() {
      return {
        modalAssignment: false,
        formLabelWidth: '120px',
        newAssignment: {},
        inputVisible: false,
        assignments: [],
        asignee_id: [],
        options: [],
        value: '',
        selectAssignment: {},
        users: [],
        isSubmitted: false,
        data: {
                body: '',
                status: 'closed'
        },
        comment: {
            id: '',
            body: '',
            commentor_id: '',
            commentor_name: '',
            created_at: '',
            updated_at: ''
        },
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

    created() {
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
                    this.comments = this.assignments.comments
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

        postMessage: function() {

            this.isSubmitted = true
            addComment(this.selectAssignment.id, this.data)
                .then(resp => {
                    
                    this.data.body = ''
                    this.getAssignments();

                    this.isSubmitted = false
                })
        },

        toggleStatus: function() {
            
            toggleStatus(this.selectAssignment.id, this.data)
                .then(resp => {
                    this.data.status = ''
                    this.getAssignments();
                })
        },

        add: function(e) {

            // format date
            this.newAssignment.start = moment(this.newAssignment.start).format('YYYY-MM-DD')
            this.newAssignment.end = moment(this.newAssignment.end).format('YYYY-MM-DD')

            console.log(this.newAssignment)
            
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
                    this.toggleStatus(),

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
    .el-row {
        margin-bottom: 20px;
    }

    .assignor-name {
        font-size: 14px;
        font-weight: 500;
        padding-bottom: 4px;
    }

    .assignor-name {
        font-size: 14px;
        color: #60a3bc;
        padding-bottom: 6px;
    }

    .assignee-name {
        font-size: 14px;
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

    .list.crm-box-comment {
        border-bottom: 1px solid;
        border-color: #FFF8BC;
        cursor: pointer;
    }
    
    .data:hover, .crm-box-content.selected {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    
    .form {
        position:relative;
        background-color: #FFFFE0;
    }

</style>
