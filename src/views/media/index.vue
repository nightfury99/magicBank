<template>
    <div class="app-container">

        <div class="crm-box-container">
            
            <div class="crm-box-header">
                <el-button type="primary" icon="el-icon-plus" @click="flag.isDialogVisible = true">Upload files</el-button>
            </div>

            <div class="crm-box-content">
                <el-image
                    style="width: 100px; height: 100px"
                    v-for="(image, index) in medias"
                    :key="index"
                    :src="`${path.image}/${image.name}`"
                    fit="fit"></el-image>
            </div>
        </div>

        <el-dialog
            title="Add New Media"
            :visible.sync="flag.isDialogVisible"
            width="33%"
            center
            @close="getMediasList">

                <el-upload
                    class="upload-demo"
                    drag
                    center
                    action="http://52.221.193.133:4000/upload"
                    :data="{bucket: 'gallery'}"
                    :on-preview="handlePreview"
                    multiple
                    list-type="picture">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                    <div class="el-upload__tip center" slot="tip">Any files with a size less than 500kb</div>
                </el-upload>

            <span slot="footer" class="dialog-footer">
                <el-button @click="flag.isDialogVisible = false">Close</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getMedias, uploadFile } from '@/api/file'

export default {
    data() {
        return {
            flag: {
                isDialogVisible: false,
            },
            medias: [],
            path: {
                image: process.env.MEDIA_PATH + '/' + process.env.STORAGE_FOLDER,
                upload: process.env.FILE_PATH + "/upload",
            }
        }
    },

    created() {
        this.getMediasList()
    },

    methods: {
        
        getMediasList: function() {
            this.medias = []
            getMedias()
                .then(resp => {
                    this.medias = resp.data
                })
        },

        handlePreview: function(file) {
            console.log(file)
        },

        handleDialogClose: function() {
            
        }
    }
}
</script>

<style scoped>
    .el-image {
        margin-right: 15px;
    }

    .crm-box-header {
        background-color: #FFF8BC;
        border-radius: 10px 10px 0px 0px;
    }

    .center {
        text-align:center;
    }

    .el-upload__text {
        width: 100%;
    }
</style>

