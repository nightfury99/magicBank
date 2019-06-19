<template>
    <div >
        <h1> Comment </h1>
        <!-- <el-row type="flex" justify="center"> -->
            <!-- <el-col :span="14"> -->
                <div class="crm-box-container">

                    <div class="crm-box-content form">
                        <text-area-emoji-picker 
                            v-model="data.body"
                            placeholder="Insert a comment"
                            @handleEnter="postMessage"
                            :disable="isSubmitted"
                            />
                    </div>

                    <el-row class="notes crm-box-content" v-for="(note, index) in notes" :key="index">
                        <div>
                            <el-row>
                            
                            <el-col :span="23">
                                <router-link :to="{ name: 'SingleNews', params: { id: notes.id }}">
                                <span class="crm-heading-medium-title">{{ note.created_by }}</span>
                                </router-link>
                                <span class="crm-timestamp clearfix" justify="end">{{ note.created_at | moment("from", "now") }}</span>
                            </el-col>
                            <el-col :span="1">
                                <el-button @click="changeDeleteId(news.id)" type="text" size="mini" icon="el-icon-delete" v-if="notes.created_by == name"></el-button>
                            </el-col>
                            
                            </el-row>

                            <el-row class="">
                            <p>{{ note.description }}</p>
                            </el-row>

                        </div>
                    </el-row>

                </div>
            <!-- </el-col> -->
        <!-- </el-row> -->
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import TextAreaEmojiPicker from '@/components/TextAreaEmojiPicker'

export default {
    components: { TextAreaEmojiPicker },

    data () {
        return {

        isSubmitted: false,

        data: {
            body: '',
        },
        
        notes: [
            {
                id: 1234-2345,
                created_by: 'kamil',
                created_at: '2019-06-15T22:34:53+08:00',
                description: 'saje test'
            },
            {
                id: 1234-2345,
                created_by: 'ahmad albab',
                created_at: '2019-06-15T22:34:53+08:00',
                description: 'saje test'
            },
            {
                id: 1234-2345,
                created_by: 'Haji Che Haizan bin Che Shameer',
                created_at: '2019-06-15T22:34:53+08:00',
                description: 'saje test'
            },
        ],

        note: {
            description: '',
            location: '',
            media: '',
            user: '',
            customer: '',
        },
    
        }
    },

    computed: {
        ...mapGetters([
        'name',
        'roles'
        ])
    },

    // post message from Create Post panel
    postMessage() {
      
    //   try {
    //     await postNewsboardStore(this.post)
    //   } catch (err) {
    //     console.log(err)
    //   }
      
      this.note.description = ''
      this.isSubmitted = false
    //   this.newsList()
    }
}
</script>

</<style scoped>

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.notes.crm-box-content {
  border-bottom: 1px solid;
  border-color: #e3e3e3;
}
</style>

