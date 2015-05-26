/**
 * Created by waitfish on 15/5/26.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 使用 module.exports 导出 ip_local 模块
module.exports = mongoose.model('ip_local', new Schema({
        ip:String,
        country: String,
        country_id: String,
        area: String,
        area_id: String,
        region: String,
        region_id: String,
        city: String,
        city_id: String,
        isp: String,
        isp_id: String
    }
));