<template>
    <div>
        <h1> Credit Application Tracker </h1>

        <div class="app-container">

            <el-row>
                <div class="filter-container">
                    <el-input v-model="listQuery.title" :disabled="true" placeholder="Title" style="width: 400px;" class="filter-item" />
                    <el-button class="filter-item" type="primary" icon="el-icon-search">
                        Search
                    </el-button>
                    <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
                        Add
                    </el-button> -->
                </div>
            </el-row>

            <el-row>
                <el-table
                    :key="tableKey"
                    v-loading="listLoading"
                    :data="list"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%;"
                    @sort-change="sortChange"
                >
                
                <el-table-column label="Title" min-width="150px">
                    <template slot-scope="{row}">
                    <span>{{ row.title }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Application Date" width="150px" align="center">
                    <template slot-scope="scope">
                    <span>{{ moment(scope.row.application_date).format('MMMM Do YYYY') }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Completion Date" width="150px" align="center">
                    <template slot-scope="scope">
                    <span>{{ moment(scope.row.completion_date).format('MMMM Do YYYY') }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Sales Rep" width="110px" align="center">
                    <template slot-scope="scope">
                    <span>{{ scope.row.sales_rep }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="Status" class-name="status-col" width="100" align="center">
                    <template slot-scope="{row}">
                    <el-tag :type="row.status | statusFilter">
                        {{ row.status }}
                    </el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
                    <template slot-scope="{row}">
                    <el-button v-if="row.status!='open'" size="mini" type="primary" @click="handleModifyStatus(row,'open')">
                        Open
                    </el-button>
                    <el-button v-if="row.status!='approved'" size="mini" type="success" @click="handleModifyStatus(row,'approved')">
                        Approve
                    </el-button>
                    <el-button v-if="row.status!='rejected'" size="mini" type="danger" @click="handleModifyStatus(row,'rejected')">
                        Reject
                    </el-button>
                    </template>
                </el-table-column>

                <el-table-column label="Comments" min-width="150px">
                    <template slot-scope="{row}">
                    <span>{{ row.comments }}</span>
                    </template>
                </el-table-column>

                </el-table>
            </el-row>

        </div>
    </div>
</template>


<script>
import moment from 'moment'

export default {
    name: 'AppTracker',
    filters: {
        statusFilter(status) {
        const statusMap = {
            open: 'primary',
            approved: 'success',
            rejected: 'danger'
        }
        return statusMap[status]
        },
        typeFilter(type) {
        return calendarTypeKeyValue[type]
        }
    },

    data() {
        return {
            list: null,
            listQuery: {
                page: 1,
                limit: 20,
                title: undefined,
                sales_rep: undefined,
            },
        }
    },

    methods: {
        moment: function (date) {
            return moment(date);
        },

        date: function (date) {
            return moment(date).format('MMMM Do YYYY');
        },

        handleModifyStatus(row, status) {
            this.$message({
                message: 'Success',
                type: 'success'
            })
            row.status = status
        },

    },
}
</script>
