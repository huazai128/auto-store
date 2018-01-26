// import config from './config';


// console.log(config);

// 生成一个256字节的Buffer实例
var bytes = new Buffer(256)

// 遍历每个字节，写入内容
for (var i = 0; i < bytes.length; i++) {
	bytes[i] = i
}

var end = bytes.slice(240, 256)

console.log(end[0]) // 240
end[0] = 0
console.log(end[0]) // 0


