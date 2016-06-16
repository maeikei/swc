#!/bin/bash
files_last600=`ls -r /media/hdd/ssroot/livestreaming/wv.ss.*.mov | tail -n 600`
echo ${files_last600}
files_last400=`ls -r /media/hdd/ssroot/livestreaming/wv.ss.*.mov | tail -n 400`
echo ${files_last400}

