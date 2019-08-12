import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user_id: '',
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_USER_ID: (state, id) => {
      state.user_id = id
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {

    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(resp => {
            const data = resp.data.data
            setToken(data.access_token)
            commit('SET_TOKEN', data.access_token)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data.data

          const roles = []
          const resRolesArr = data.roles

          var x
          for (x = 0; x < resRolesArr.length; x++) {
            roles.push(resRolesArr[x].slug)
          }

          if (roles.length) {
            commit('SET_ROLES', roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_USER_ID', data.id)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER_ID', '')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER_ID', '')
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
