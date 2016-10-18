/**
 * @desc 角色实体
 * @require
 * @author jianfeng_huang.
 * @date 2016/9/27.
 */

var RoleEntity = function (obj) {
    if(obj){
        this.id = obj.id;
        this.code = obj.code; //角色编码
        this.name = obj.name; //角色名称(管理员、负责人)
        this.isSys = obj.isSys; //是否是系统定义的角色
        this.createTime = obj.createTime;//创建时间
        this.updateTime = obj.updateTime; //修改时间
    }
};

module.exports = RoleEntity;