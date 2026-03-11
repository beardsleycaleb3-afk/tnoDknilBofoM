require 'json'
require 'net/http'

data = JSON.parse(`go run three.go`)
puts data['geometry']  # 0oo0O00O vertices → Three.js
