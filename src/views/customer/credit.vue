<template>
    <div class="app-container">

        <router-link :to="{ name: 'answer', params: { type: 'credit' }}">
            <el-button type="primary">Create KYC Question</el-button>
        </router-link>

        <el-row :gutter="20">

        <el-tabs type="border-card" style="height: 910px;">

            <el-tab-pane label="Comment">
                <Comment/>
            </el-tab-pane>

            <el-tab-pane label="Securities">
                <Securities/>
            </el-tab-pane>

            <el-tab-pane label="Contact">
                <Contact/>
            </el-tab-pane>

            <el-tab-pane label="Credit KYC">
                <KYC/>
            </el-tab-pane>

            <el-tab-pane label="Credit Application Tracker">
                <AppTracker/>
            </el-tab-pane>

            <el-tab-pane label="Credit History">
                <History/>
            </el-tab-pane>

        </el-tabs>

        </el-row>

    </div>
</template>

<script>
import Comment from './components/comment'
import Securities from './components/securities'
import Contact from './components/contact'
import KYC from './components/KYC'
import AppTracker from './components/appTracker'
import History from './components/history'


export default {
    
    components: {
        Comment,
        Securities,
        Contact,
        KYC,
        AppTracker,
        History
    },
}

</script>

