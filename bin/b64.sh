#!/bin/bash

#获取输入、编码为base64并在终端上显示

# echo $1

if [ "$1" = "decode" ]; then
    # 切换成集中监管平台
    echo "输入要解码的文本："
    read input_text
    output_text=`echo -n $input_text | base64 --decode`
    echo "文本为：$output_text"
else
    echo "输入要编码到base64的文本："
    read input_text
    output_text=`echo -n $input_text | base64`
    echo "Base64编码文本为：$output_text"
fi
