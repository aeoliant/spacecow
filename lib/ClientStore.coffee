class ClientStore
  constructor: () ->
    @next = 0

  getNext: () ->
    ret = @next
    @next = @next + 1
    ret

exports.ClientStore = ClientStore