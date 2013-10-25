sjcl = require('./sjcl.min.js')

class ClientStore
  constructor: () ->
    @clients = []
    @numClients = 0

  getNext: () ->
    hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash((+new Date).toString()))
    @numClients = @clients.push(hash)
    { 'goldenTicket':hash, 'id':@numClients - 1 }

  leave: (hash, id) ->
    return false if @numClients == 0
    return false unless verify(hash, id)
    return true


  verify:(hash, id) ->
    @clients[id] == hash


exports.ClientStore = ClientStore