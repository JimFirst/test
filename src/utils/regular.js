export  function checkTelpnone(rule, value, callback){
    const telArr=[
        '134','135','136','137','138','139','147','148','150','151','152','157','158','159','172','178','182','183','184','187','188','198',
        '130','131','132','145','146','155','156','166','171','175','176','185','186',
        '133','149','153','173','174','177','180','181','189','199',
        '170'
    ]
    if(!value){
        return callback(new Error('不能为空'));
    }else{
        const val = value.substring(0,3)
        if(
            telArr.some(v=>{
                return v == val
            })
        ){
            if(value.length==11){
                callback()
            }else{
                return callback(new Error('请输入正确的手机号码')); 
            }
            callback()
        }else{
            return callback(new Error('请输入正确的手机号码')); 
        }  
    }             
}

export  function checkLongitude(rule, value, callback){
    const longreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d*)|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0*|180)$/;
    // const longreg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,10})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,10}|180)$/;    
    if(!value){
        return callback(new Error('不能为空'));
    }else{
        if(!longreg.test(value)){
            return callback(new Error('经度范围为0-180！')); 
           }else{
               callback();
           }
    }             
}
export  function checkLatitude(rule, value, callback){
    const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d*|90\.0*|[0-8]?\d{1}|90)$/;
    // const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,10}|90\.0{0,10}|[0-8]?\d{1}|90)$/;
    if(!value){
        return callback(new Error('不能为空'));
    }else{
        if(!latreg.test(value)){
            return callback(new Error('纬度范围为0-90！')); 
           }else{
               callback();
           }
    }             
}
export  function versionCode(rule, value, callback){
    const verreg = /\d+(.\d+)*/;
    if(!value){
        return callback(new Error('不能为空'));
    }else{
        if(!verreg.test(value)){
            return callback(new Error('版本号只能由数字和小数点组成!如2.1')); 
           }else{
               callback();
           }
    }             
}

export const clickoutside = {
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
        }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
// 获取当前dom的位置
export function setPosition(ref,refTrees){
    let sizes=ref.getBoundingClientRect(),that=this;
    refTrees.style.position='fixed';
    if(document.body.clientHeight-sizes.y>280){
        refTrees.style.top=sizes.y+sizes.height-4+'px';
        refTrees.style.left=sizes.x;
        refTrees.style.width=sizes.width+2+'px';
    }else{
        refTrees.style.top=sizes.y-274+'px';
        refTrees.style.left=sizes.x;
        refTrees.style.width=sizes.width+2+'px';
    }
}
// 时间戳转字符串
export function  dateFormat(row,column) {
    var date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return this.toTime(date);
}
export function  dayDateFormat(row,column) {
    var date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return this.toDateTime(date);
}
// 分割数组
export function splitArr(arr){
    let arr_length = arr.length;
    let newArr = [];
    for(let i=0;i<arr_length;i+=10){
        newArr.push(arr.slice(i,i+10));
    }
    return newArr;
}


// 密码等级*/
export function getPwdRank (szPwd) {
    var iRank = 0
    szPwd.match(/[a-z]/g) && iRank++
    szPwd.match(/[A-Z]/g) && iRank++
    szPwd.match(/[0-9]/g) && iRank++
    szPwd.match(/[^a-zA-Z0-9]/g) && iRank++ // 符号
    if (szPwd.length < 6 || szPwd.length >16) {
      iRank = 0
    }
    if(iRank>2){
        if(szPwd.length < 8){
            iRank = 2;
        }
    }
    //if (iRank === 3) iRank = 4
    // if (iRank === 2) {
    //   if ((szPwd.match(/[0-9]/g) && szPwd.match(/[a-z]/g)) || (szPwd.match(/[0-9]/g) && szPwd.match(/[A-Z]/g))) {
    //     iRank = 1
    //   } else {
    //     iRank = 3
    //   }
    // }
    return iRank
  }