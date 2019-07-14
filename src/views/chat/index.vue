<template>
  <div class="app-container">
    <el-row :gutter="24" class="fillexpand">
      <el-col :span="8" class="fill">
        <div>
          <el-input v-model="search" prefix-icon="el-icon-search" placeholder="Search">
            <el-button slot="prepend" @click="startDirectMessage">+</el-button>
          </el-input>
        </div>
        <div class="chans">
          <el-card v-for="chan in chans" :key="chan.id" class="box-card" @click.native="selChan = chan">
            <span class="name">{{ chan.name }}</span>
          </el-card>
        </div>
      </el-col>
      <el-col v-if="selChan" :span="16" class="fillexpand">
        <div class="fill chatbox">
          <div class="chat-profile">
            <el-tooltip v-if="chanSubtitle" :content="chanSubtitle">
              <span>{{ selChan.name }}</span>
            </el-tooltip>
            <span v-else>{{ selChan.name }}</span>
            <div v-if="selChan.presence" :style="{ backgroundColor: 'green' }" class="status"/>
          </div>
          <div ref="history" class="chat-history">
            <div
              v-for="msg in selChan.msgs"
              :key="msg.timestamp"
              :class="{ sender: user_id === msg.from }"
              class="chat-message">
              <span class="content">{{ msg.message }}</span>
              <span class="timestamp">{{ msg.timestamp }}</span>
            </div>
          </div>
          <div class="chat-preedit">
            <textarea v-model.trim="message" placeholder="Type something..." rows="1" @keyup.enter="send"/>
            <el-button type="text">
              <svg-icon icon-class="send"/>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserShow, searchUser } from '@/api/user'
import { showGroup } from '@/api/group'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
      allChans: [
        // group channel have a prefix `group-` for `id`
        // {
        //   id: '835f2248-9a82-11e9-8688-02444cf6b726',
        //   name: 'Andrew',
        //   msgs: [
        //     {
        //       from: '835f2248-9a82-11e9-8688-02444cf6b726',
        //       message: 'hello world',
        //       timestamp: '2019-06-29T13:53:06.900Z'
        //     }
        //   ]
        // }
      ],
      selChan: null,
      message: null
    }
  },
  computed: {
    chans() {
      return this.allChans.filter(chan => chan.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    ...mapGetters(['user_id'])
  },
  asyncComputed: {
    async chanSubtitle() {
      if (this.selChan && this.selChan.id && this.selChan.id.startsWith('group-')) {
        const groupId = this.selChan.id.slice('group-'.length)
        const users = (await showGroup(groupId)).data.data.users
        return users.map(user => user.nickname).join(', ')
      }
    }
  },

  async created() {
    // group chat
    const user = await getUserShow(this.user_id)
    user.data.data.groups.forEach(group => {
      const groupChan = {
        id: `group-${group.id}`,
        name: group.name,
        presence: null,
        msgs: []
      }
      this.$chatClient.subscribe(groupChan.id)
        .watch(data => this.capture(data, groupChan.id))
      this.allChans.push(groupChan)
    })

    // direct message
    this.$chatClient.subscribe(this.user_id)
      .watch(data => this.capture(data, this.user_id))

    // new group event
    this.$chatClient.subscribe(`${this.user_id}-group`).watch(data => {
      const chan = {
        id: data.groupId,
        name: data.groupName,
        timestamp: null,
        msgs: []
      }
      this.allChans.unshift(chan)
    })
  },

  methods: {
    async send(event) {
      if (!this.message) {
        return
      }
      this.$chatClient.publish(this.selChan.id, {
        from: this.user_id,
        message: this.message,
        timestamp: new Date().toISOString()
      })
      this.message = null
    },
    async capture(data, channel) {
      const chan = this.allChans.find(chan => chan.id === channel)
      if (chan === undefined) {
        this.allChans.push(chan)
      }
      chan.msgs.push(data)
      // move channel to top of channel list
      this.allChans.splice(this.allChans.indexOf(chan), 1)
      this.allChans.unshift(chan)
      if (chan === this.selChan) {
        this.$nextTick(() => {
          this.$refs.history.scrollTo({ top: this.$refs.history.scrollHeight, behavior: 'smooth' })
        })
      }
    },

    async startDirectMessage() {
      this.$msgbox({
        title: 'Start direct message',
        message: this.$createElement('el-autocomplete', {
          props: {
            async fetchSuggestions(queryString, cb) {
              const users = queryString ? (await searchUser(queryString)).data.data : []
              cb(users.map(user => ({ value: user.nickname, id: user.uuid, ...user })))
            }
          },
          on: {
            select: async user => {
              let chan = this.allChans.find(chan => chan.id === user.uuid)
              if (chan) {
                this.selChan = chan
                return
              }
              chan = {
                id: user.uuid,
                name: user.nickname,
                timestamp: new Date().toISOString(),
                msgs: []
              }
              this.allChans.unshift(chan)
              this.$msgbox.close()
              this.selChan = chan
            }
          }
        }, [this.$createElement('el-button', {
          slot: 'append',
          on: {
            click: () => {
              this.$msgbox.close()
              this.$router.push({ name: 'group' })
            }
          }
        }, ['Group'])])
      })
    }
  }
}
</script>

<style scoped>
.el-input {
  margin-bottom: 20px;
}

.el-card {
  cursor: pointer;
}

.box-card:not(:last-child) {
  margin-bottom: 8px;
}

.name {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.chans {
  overflow-y: auto;
}

.fillexpand {
  height: calc(100vh - 90px);
}

.fill {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.status {
  border-radius: 100%;
  display: inline-block;
  margin-left: 1ex;
  height: 10px;
  width: 10px;
}

.chatbox {
  border: 2px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
}

.chat-profile {
  padding: 10px 20px;
  border-bottom: 2px solid #e4e7ed;
}

.chat-history {
  padding: 10px 20px;
  flex-grow: 1;
  overflow-y: auto;
}

.chat-message {
  margin: 10px;
}

.chat-message > .content {
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #ebeef5;
  display: inline-block;
}

.chat-message > .timestamp {
  font-size: 0.7rem;
  color: gray;
}

.chat-message.sender {
  direction: rtl;
}

.chat-message.sender > .content {
  background-color: #409eff;
}

.chat-preedit {
  background-color: #f2f6fc;
  border-top: 2px solid #e4e7ed;
}

.chat-preedit > .el-button {
  display: inline;
  padding: 0;
}

.chat-preedit > textarea {
  width: calc(100% - 68px);
  border: none;
  color: #606266;
  background-color: inherit;
  margin: 8px 12px;
  padding: 0;
}

.chat-preedit .svg-icon {
  width: 30px;
  height: 30px;
}
</style>
