<?php

namespace swc\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Log;


class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \swc\Console\Commands\Inspire::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('inspire')
                 ->hourly();
        Log::info('run cd /media/hdd/ssroot && ./rtsp.sh');
        $schedule->exec('cd /media/hdd/ssroot && ./rtsp.sh')->everyTenMinutes();
        $schedule->exec('cd /media/hdd/ssroot && ./clear_clips.rb')->daily();
    }
}
