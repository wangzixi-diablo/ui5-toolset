var scp = "SAP Cloud Platform";

var document_service = function(value){
　　console.log("SCP document service: " + value);
}

// 不能写成export sex这样的方式，如果这样就相当于export "boy",
// 外部文件就获取不到该文件的内部变量sex的值，因为没有对外输出变量接口,只是输出的字符串。
export {scp,document_service}  

/*也可以写成
export var sex="boy";export var echo=function(value){
　　console.log(value)
}

//因为function echo(){}等价于 var echo=function(){}所以也可以写成
export function echo(value){
　　　console.log(value)
}
*/
