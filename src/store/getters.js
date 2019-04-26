const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  useroutlets: state => state.user.useroutlets,
  user_id: state => state.user.user_id,
  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,
}
export default getters
