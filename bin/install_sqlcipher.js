// 安装sqlcipher

// https://github.com/TryGhost/node-sqlite3
// https://github.com/sqlcipher/sqlcipher
// https://coolaj86.com/articles/building-sqlcipher-for-node-js-on-raspberry-pi-2/

// https://github.com/zhouchangsheng/sqlcipher
// npm install sqlcipher --target=xxxx --target_arch=xx(x64 or ia32) --dist-url=xxx --runtime=xxx

let args = [];
const targetArgs = args.filter(function (arg) {
    return /^--(runtime|target)/.test(arg);
});
const targetStr = targetArgs.reduce(function (m, arg) {
    return m + " " + arg;
}, "");

exec('export LDFLAGS="-L/usr/local/lib"');
exec('export CPPFLAGS="-I/usr/local/include -I/usr/local/include/sqlcipher"');
exec('export CXXFLAGS="$CPPFLAGS"');
cd("../node_modules/sqlite3");
exec("npm i --build-from-source --sqlite_libname=sqlcipher --sqlite=/usr/local --verbose" + targetStr);
