#!/usr/bin/ruby
files_last600=`ls -r /media/hdd/ssroot/livestreaming/wv.ss.*.mov | tail -n 600`
files_last400=`ls -r /media/hdd/ssroot/livestreaming/wv.ss.*.mov | tail -n 400`
files_last600.each_line {|file|
  p file
}
