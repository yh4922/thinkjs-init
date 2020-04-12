const {SchameTypes, Schema} = require('mongoose');
module.exports = class extends think.Mongoose {
  get schema() {
    var _schema = new Schema({
      name: {type: String, default: '张三'}
    })
    _schema.pre('save',  function(next){
      // 保存进数据库之前的一些操作
      next();
    });
    _schema.pre('update',  function(next){
      // 更新数据库据之前的操作
      this.update_time = new Date();
      next();
    });
    _schema.index({status: 1}); // 创建索引
    _schema.index({uid: 1, aid: 1, update_time: -1}); // 组合索引
    return _schema;
  }
}