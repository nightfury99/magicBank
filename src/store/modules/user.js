import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user_id: '',
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    useroutlets: [],
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
    },
    SET_USER_OUTLETS: (state, useroutlets) => {
      state.useroutlets = useroutlets
    }
  },

  actions: {
    
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(resp => {
            const data = resp.data
            setToken(data.jwt)
            commit('SET_TOKEN', data.jwt)
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
          const data = response.data
          
          let roles = []
          let uoutlets = []

          roles.push(data.groups.name)
          
          if (roles.length) {
            commit('SET_ROLES', roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.avatar)
          commit('SET_USER_ID', data._id)

          var x
          for (x = 0; x < data.useroutlets.length; x++) {
            uoutlets.push(data.useroutlets[x].outlet_id)
          }
          
          commit('SET_USER_OUTLETS', uoutlets)
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
        commit('SET_USER_OUTLETS', [])
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
