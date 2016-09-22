/**
 * @desc log4js日志配置文件
 * @author jianfeng_huang.
 * @date 2016/9/22.
 */
var log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console',
            category: 'console'
        },
        {
            type: 'file',
            filename: 'log/log.log',
            pattern: '-yyyy-MM-dd',
            maxLogSize: 10240,
            backups: 3,
            category: 'dateFileLog',
            alwaysIncludePattern: true
        }
    ],
    replaceConsole: true,
    levels: {
        dateFileLog: 'debug',
        console: 'debug'
    }
});

var dateFileLog = log4js.getLogger('dateFileLog');
var consoleLog = log4js.getLogger('console');

exports.logger = dateFileLog;