<template>
    <div class="app-container">

        <el-row :gutter="20">

        <el-tabs type="border-card" style="height: 910px;">

            <el-tab-pane label="Comment">
                <Comment/>
            </el-tab-pane>

            <el-tab-pane label="Attributes">
                <Attributes/>
            </el-tab-pane>

            <el-tab-pane label="Contact">
                <Contact/>
            </el-tab-pane>

            <el-tab-pane label="Sales KYC">
                <KYC/>
            </el-tab-pane>

            <el-tab-pane label="Call Log">
                <CallLog/>
            </el-tab-pane>

            <el-tab-pane label="News Tracker">
                <NewsTracker/>
            </el-tab-pane>

        </el-tabs>

        </el-row>

    </div>
</template>

<script>
import Comment from './components/comment'
import Attributes from './components/attributes'
import Contact from './components/contact'
import KYC from './components/KYC'
import CallLog from './components/callLog'
import NewsTracker from './components/newsTracker.vue'


export default {
    
    components: {
        Comment,
        Attributes,
        Contact,
        KYC,
        CallLog,
        NewsTracker
    },

}
</script>
