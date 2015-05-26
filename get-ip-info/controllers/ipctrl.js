/**
 * Created by waitfish on 15/5/26.
 */


var ip_local = require('../models/ipinfo'); //获取 ip_local 信息
var request = require('request');

/**
 * 接到请求后，先从本地数据库查询，如果没有，从淘宝接口查询，然后记录到数据库
 * @param req
 * @param res
 */
function get_local_by_ip(req, res) {
    ip_local.findOne({ip: req.query.ip}, function (err, ipfind) {
            /**
             * 先从自己的数据库查询
             */
            if (err) throw err;

            //console.log(err);

            if (ipfind) {
                res.json(ipfind)
            } else {
                /**
                 * 若找不到则从淘宝的api拿，拿到后存到数据库，返回得到的结果。
                 */
                request.post({
                        url: 'http://ip.taobao.com/service/getIpInfo.php',
                        form: {ip: req.query.ip}
                    },
                    function (error, response, body) {
                        var info = JSON.parse(body);
                        if (!error && response.statusCode == 200) {
                            if (info.code === 0) {
                                res.json(info.data)
                                var new_ip = new ip_local(info.data);
                                new_ip.save()
                            }else{
                                res.send("接口调用失败，请检查接口文档。")
                            }


                        }
                    }
                )

            }

        }
    )


}


exports.get_local_by_ip = get_local_by_ip;