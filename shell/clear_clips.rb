#!/usr/bin/ruby
files_last_one=`ls -r /media/hdd/ssroot/livestreaming/wv.ss.*.mov | tail -n 600`
files_last_two=`ls -r /media/hdd/ssroot/livestreaming/wv.ss.*.mov | tail -n 400`
lastOne = files_last_one.split(("\n"));
lastTwo = files_last_two.split(("\n"));
p lastOne
p lastTwo
