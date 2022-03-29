const users = [];

const userConnect = (id, userName) => {
  const user = {id, userName};
  users.push(user)
  return user
}

const userDisconnect = id => {
  const index = users.findIndex(user => user.id === id)

  if(index === -1) return

  return users.splice(index, 1)[0]
}

module.exports = {
  userConnect,
  userDisconnect
}