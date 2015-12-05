<?php

namespace swc\Http\Controllers;

use Illuminate\Http\Request;

use swc\Http\Requests;
use swc\Http\Controllers\Controller;
use Log;

class WelcomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $files = shell_exec('find /media/hdd/ssroot/livestreaming/wv.ss.*.mov -type f -print0 | xargs -0 ls -t | sed -e "s/\/media\/hdd\/ssroot\/livestreaming\///"');
        //Log::info('$files=<' . $files . '>');
        $FilesArray = explode(".mov",$files);
        $FileName = [];
        foreach ($FilesArray as $file) {
            $name = str_replace("wv.ss.",'',$file);
            $name = str_replace(".mov",'',$name);
            $name = str_replace("\n",'',$name);
            $nameArray = explode(".",$name);
            Log::info('$nameArray[0]=<' . $nameArray[0] . '>');
            Log::info('$nameArray[1]=<' . $nameArray[1] . '>');
            Log::info('$nameArray[2]=<' . $nameArray[2] . '>');
            Log::info('$nameArray[3]=<' . $nameArray[3] . '>');
            Log::info('$nameArray[4]=<' . $nameArray[4] . '>');
            //Log::info('$file=<' . $file . '>');
            //Log::info('$name=<' . $name . '>');
            Log::info('$file=<' . $file . '>');
            array_push($FileName,$name);
        }
        return view('welcome',['clipsSortTime' =>$FileName]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
