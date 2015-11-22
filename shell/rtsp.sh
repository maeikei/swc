#!/bin/bash
CP_NAME=wv.ss.`date '+%Y.%m.%d.%H.%M'`
CP_TIME=600
avconv -i rtsp://192.168.1.254/sjcam.mov  -an -f mp4 -vcodec copy -y  -t ${CP_TIME} livestreaming/${CP_NAME}.mov
