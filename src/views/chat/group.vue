<template>
  <div class="app-container">
    <h2>Create Group</h2>
    <el-input v-model="groupName" placeholder="Group Name"/>
    <el-select v-model="selUsers" :remote-method="remoteMethod" :loading="loading" multiple filterable remote placeholder="Users">
      <el-option v-for="user in users" :key="user.uuid" :label="user.name" :value="user.uuid"/>
    </el-select>
    <el-button @click="create">Create</el-button>
  </div>
</template>

<script>
import { searchUser } from '@/api/user'
import { createGroup, addUser } from '@/api/group'

export default {
  data() {
    return {
      groupName: '',
      users: [],
      selUsers: [],
      loading: false
    }
  },
  methods: {
    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        this.users = (await searchUser(query)).data.data
        this.loading = false
      } else {
        this.users = []
      }
    },
    async create() {
      const groupId = (await createGroup(this.groupName)).data.data.group_chat_id
      await Promise.all(this.selUsers.map(userId => addUser(groupId, userId)))
      this.selUsers.forEach(user => {
        this.$chatClient.publish(`${user}-group`, { groupId, groupName: this.groupName })
      })
      this.$router.go(-1)
    }
  }
}
</script>
