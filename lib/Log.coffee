class Log
  @info: " INFO"
  @warn: " WARN"
  @err: "ERROR"

  @red: "\x1B[31m"
  @yellow: "\x1B[33m"
  @blue: "\x1B[34m"
  @reset: "\x1B[0m"

  constructor: (@app) ->

  info: (msg) ->
    @log(msg, Log.info, Log.blue)
  warn: (msg) ->
    @log(msg, Log.warn, Log.yellow)
  err: (msg) ->
    @log(msg, Log.err, Log.red)

  log: (msg, level, colour) ->
    console.log("#{colour + level} || #{@app} || #{new Date} || #{msg + Log.reset}")

exports.Log = Log
