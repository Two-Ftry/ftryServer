/**
 * @desc 客户实体信息
 * @require
 * @author jianfeng_huang.
 * @date 2016/9/22.
 */

var Customer = function (obj) {
    if(obj){
        this.name = obj.name; //客户名称 String
        this.type = obj.type; //客户类型 String
        this.parent = obj.parent; //母公司 Customer
        this.website = obj.website; //网址 String
        this.phone = obj.phone; //电话 String
        this.desc = obj.desc; //客户描述 String
        this.country = obj.country;//国家 String
        this.province = obj.province;//省/州 String
        this.city = obj.city; //市 String
        this.district = obj.district; //区 String
        this.address = obj.address; //客户地址 String
        this.owner = obj.owner;//客户所有人 User（最初和creator一致，可以将客户移交给其他人，此时owner就和creator不一样了）
        this.creator = obj.creator; //创建者 User（不可变更）
        this.createTime = obj.createTime; //创建时间 Date
        this.updateTime = obj.updateTime; //最新更新时间 Date
    }
};

Customer.prototype.getName = function(){
    return this.name;
};
Customer.prototype.setName = function(name){
    this.name = name;
};


Customer.prototype.getType = function(){
    return this.type;
};
Customer.prototype.setType = function(type){
    this.type = type;
};

Customer.prototype.getParent = function(){
  return this.parent;
};
Customer.prototype.setParent = function(parent){
    this.parent = parent;
};

Customer.prototype.getWebsite = function(){
    return this.website;
};
Customer.prototype.setWebsite = function(website){
    this.website = website;
};

Customer.prototype.getPhone = function(){
    return this.phone;
};
Customer.prototype.setPhone = function(phone){
    this.phone = phone;
};

Customer.prototype.getDesc = function(){
    return this.desc;
};
Customer.prototype.setDesc = function(desc){
    this.desc = desc;
};

Customer.prototype.getCountry = function(){
    return this.country;
};
Customer.prototype.setCountry = function(country){
    this.country = country;
};

Customer.prototype.getProvince = function(){
    return this.province;
};
Customer.prototype.setProvince = function(province){
    this.province = province;
};

Customer.prototype.getCity = function(){
    return this.city;
};
Customer.prototype.setCity = function(city){
    this.city = city;
};

Customer.prototype.getDistrict = function(){
    return this.district;
};
Customer.prototype.setDistrict = function(district){
    this.district = district;
};

Customer.prototype.getAddress = function(){
    return this.address;
};
Customer.prototype.setAddress = function(address){
    this.address = address;
};

Customer.prototype.getOwner = function(){
    return this.owner;
};
Customer.prototype.setOwner = function(owner){
    this.owner = owner;
};

Customer.prototype.getCreator = function(){
    return this.creator;
};
Customer.prototype.setCreator = function(creator){
    this.creator = creator;
};

Customer.prototype.getCreateTime = function(){
    return this.createTime;
};
Customer.prototype.setCreateTime = function(createTime){
    this.createTime = createTime;
};

Customer.prototype.getUpdateTime = function(){
    return this.updateTime;
};
Customer.prototype.setUpdateTime = function(updateTime){
    this.updateTime = updateTime;
};




module.exports = Customer;
