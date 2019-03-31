module.exports = {
  exec(msg) {
    msg.channel.send(`
    Here are a list of available commands:
    - !help (this thing you are viewing right now)
    `)
  }
}