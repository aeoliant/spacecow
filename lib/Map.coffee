class Map
	constructor: (@width, @height) ->

	middle: () ->
		{ x: @width / 2.0, y: @height / 2.0 }

	inBounds: (x, y) ->
		0 <= x < @width and 0 <= y < @height


exports.Map = Map
