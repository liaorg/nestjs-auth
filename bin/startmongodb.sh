#!/bin/sh

# 安装
# tar -zxvf mongodb-linux-x86_64-ubuntu2004-5.0.9.tgz
# sudo mv mongodb-linux-x86_64-ubuntu2004-5.0.9 /usr/local/mongodb5
# echo 'export PATH=/usr/local/mongodb5/bin:$PATH' >> ~/.bashrc

mkdir -p ~/mongodb
# 数据存储目录
mkdir -p ~/mongodb/data
# 日志文件目录
mkdir -p ~/mongodb/logs
# 配置文件目录
mkdir -p ~/mongodb/conf

# 启动
cp -f ./mongod.conf ~/mongodb/conf/mongod.conf
mongod -f ~/mongodb/conf/mongod.conf

#查看mongod状态
# ps -ef | grep mongod
# netstat -nltp|grep mongod
# mongo #通过命令mongo启动mongodb服务器

# 停止
# ps -ef | grep mongod
# kill -9 进程id