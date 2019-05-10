<template>
    <div>
        <el-card class="box-card">

            <div slot="header" class="clearfix">
                <span>Assignment</span>
                <el-button style="float: right" size="mini" type="warning" @click="modalAssignment=true" icon="el-icon-plus" circle></el-button>

            </div>

            <div v-for="(assignment, i) in assignments" :key="`A-${i}`">
                <el-card class="box-card">
                    <div>
                        <el-tag style="float: right" type="success" size="mini">ACTIVE</el-tag>

                        <div class="name">
                            {{assignment.fullname}}
                        </div>

                        <div class="date" style="float: right">
                            {{assignment.startdate}}
                        </div>

                        <div class="job-title">
                            {{assignment.jobtitle}}
                        </div>

                        {{assignment.title}}

                        <div class="description">
                            {{assignment.description}}
                        </div>

                        <div class="tags">
                            {{assignment.tags}}
                        </div>

                    </div>
                </el-card>

                <el-dialog title="New Assignment" :visible.sync="modalAssignment">
                <el-form v-on:submit.prevent="addAssignment">

                    <el-form-item label="Name" :label-width="formLabelWidth">
                        <el-input v-model="newAssignment.fullname" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Job Title" :label-width="formLabelWidth">
                        <el-input v-model="newAssignment.jobtitle" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Date" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="Start date" v-model="newAssignment.startdate" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="Due date" v-model="newAssignment.duedate" style="width: 100%;"></el-date-picker>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="Title" :label-width="formLabelWidth">
                        <el-input v-model="newAssignment.title" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="Description" :label-width="formLabelWidth">
                        <el-input type="textarea" v-model="newAssignment.description"></el-input>
                    </el-form-item>

                    <el-form-item label="Tags" :label-width="formLabelWidth">
                        <el-input v-model="newAssignment.tags" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-input type="submit" value="Submit"></el-input>

                </el-form>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="modalAssignment = false">Cancel</el-button>
                    <el-button type="primary" @click="newAssignment">Create</el-button>
                </span> -->
            </el-dialog>

            </div>
        </el-card>

    </div>
</template>


<script>
  export default {
    data() {
      return {
        modalAssignment: false,
        formLabelWidth: '120px',
        newAssignment: {},
        assignments: [
            {
                fullname: 'Christina Hellen',
                jobtitle: 'Salesperson',
                startdate: '13/3/2019',
                duedate: '20/3/2019',
                title: 'SUBMISSION OF PAPERS',
                description: 'Submit all of the papers received by normies from the workspace.',
                tags: '#YEET'
            },
            {
                fullname: 'Peter Quill',
                jobtitle: 'Star-Lord',
                startdate: '24/4/2019',
                duedate: '24/8/2019',
                title: 'FIND GAMORA',
                description: 'The last time you heard about her, she\'s dead. Track her throughout the entire universe. Whatever it takes.',
                tags: '#Space'
            }
        ],
     }
    },
    methods: {
        addAssignment: function(e){
            this.assignments.push({
                fullname: this.newAssignment.fullname,
                jobtitle: this.newAssignment.jobtitle,
                startdate: this.newAssignment.startdate,
                duedate: this.newAssignment.duedate,
                title: this.newAssignment.title,
                description: this.newAssignment.description,
                tags: this.newAssignment.tags
            });
            e.preventDefault();
        }
    },
}
</script>


<style scoped>
    .name {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 5px;
    }

    .date {
        font-size: 14px;
    }

    .job-title {
        font-size: 14px;
        color: #2980b9;
        padding-bottom: 10px;
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

</style>
