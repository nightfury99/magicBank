<template>
    <div>
        <h1> Call Log </h1>
        <el-row>
             <el-col :span="5" :offset="19">
                <el-button style="float: right" type="warning" @click="modalCallLog = true" >Add Call Log</el-button>
            </el-col>

            
        </el-row>

        <el-row>
            <div class="app-container">
                <el-table
                    :data="callLog"
                    style="width: 100%">

                    <el-table-column
                    label="User Nickname"
                    prop="user.nickname">
                    </el-table-column>

                    <el-table-column
                    label="Datetime"
                    prop="datetime">
                    </el-table-column>

                    <el-table-column
                    label="PIC Name"
                    prop="pic">
                    </el-table-column>
                    
                    <el-table-column
                    label="Contact No"
                    prop="phone_number">
                    </el-table-column>
                    
                    <el-table-column
                    label="Reason"
                    prop="reason">
                    </el-table-column>
                    
                    <el-table-column
                    label="Feedback"
                    prop="feedback">
                    </el-table-column>
                    
                    <el-table-column
                    label="Duration"
                    prop="duration">
                    </el-table-column>

                </el-table> 
            </div>
        </el-row>

        <!-- New call Log modal pop-up -->
        <el-dialog title="New Call Log" :visible.sync="modalCallLog">
            <el-form>                    
                
                <!-- Title -->
                <el-form-item label="Title" :label-width="formLabelWidth">
                    <el-input v-model="newCallLog.title"></el-input>
                </el-form-item>

                <!-- Assign to -->
                <el-form-item label="Assign To" :label-width="formLabelWidth">
                    <el-row>
                        <el-col :span="24">
                            <el-select 
                                v-model="newCallLog.assignee_id" 
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
                            <el-date-picker type="date" placeholder="Start date" v-model="newCallLog.start" style="width:100%"></el-date-picker>
                        </el-col>
                        <el-col :span="1" :offset="1">To</el-col>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="Due date" v-model="newCallLog.end" style="width:100%"></el-date-picker>
                        </el-col>
                    </el-row>
                </el-form-item>

                <!-- Description -->
                <el-form-item label="Description" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="newCallLog.description" :rows="5"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                    <!-- Type selection     -->
                    <el-form-item label="Type" :label-width="formLabelWidth">
                        <el-select 
                            v-model="newCallLog.type"
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
                <el-button @click="modalCallLog = false">Cancel</el-button>
                <el-button type="primary" @click.prevent="add">Create</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>


<script>
import { getCallLog } from '@/api/customer'

export default {
    name: 'CallLog',

    data() {
        return {
            callLog: [],
            modalCallLog: false

        }
    },

    created() {
        const customerId = this.$store.state.route.params.customerId // get customer id from params

        console.log(customerId)
        this.getCallLog(customerId)
        // this callLog = 
        // this.getCallLog
    },

    methods: {
        getCallLog(customerId) {
            getCallLog(customerId)
                .then(resp => {
                    console.log(resp)
                    this.callLog = resp.data.data
                })
            console.log(this.callLog)
        }
    }
}
</script>
