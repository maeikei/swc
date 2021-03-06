<?php

namespace swc\Http\Controllers;

use Illuminate\Http\Request;

use swc\Http\Requests;
use swc\Http\Controllers\Controller;

use Log;
use File;

class LoginController extends Controller
{
     protected $keyRoot_;
     public function __construct() {
          $this->keyRoot_ = storage_path() . '/publicKeys/';
          File::makeDirectory($this->keyRoot_, 0775, true, true);
     }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return view('login');
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
        //Log::info('store: '.$request->method());
        if ($request->isMethod('post')) {
          $bodyContent = $request->getContent();
          //Log::info($bodyContent);
          $bodyContent = str_replace("'","",$bodyContent);
          //Log::info($bodyContent);
          $bodyJson = json_decode($bodyContent);
          Log::info(json_last_error_msg());
          if (isset($bodyJson->publicKey)) {
            $token = hash('sha256',$bodyJson->publicKey);
            Log::info($token);
            $keyPath = $this->keyRoot_ . $token . '/';
            Log::info($keyPath);
            File::makeDirectory($keyPath, 0777, true, true);
            //$output = shell_exec('mkdir -p' . $keyPath);
            //Log::info($output);
            //$output = shell_exec('touch ' . $keyPath . '/publicKey.pem');
            file_put_contents($keyPath . '/publicKey.pem', $bodyJson->publicKey);
            return response()->json(['token' => $token]);
          }
          if (isset($bodyJson->signature)&&isset($bodyJson->token)) {
            $token = $bodyJson->token;
            Log::info($token);
            $signature = $bodyJson->signature;
            //Log::info($signature);
            $signArrayStr = explode( ',', $signature );
            Log::info($signArrayStr);
            $count = count($signArrayStr);
            $signArray = [];
            for ($i = 0; $i < $count; $i++) {
                 $byte = hexdec($signArrayStr[$i]);
                 Log::info($byte);
                 $signArray[] = $byte;
            }
            //var_dump($signArray);
            $signString = implode(array_map("chr", $signArray));
            Log::info('$signString=' . $signString);
            $keyPath = 'file://' . $this->keyRoot_ . $token . '/publicKey.pem';
            Log::info('$keyPath=' . $keyPath);
            $pubkeyid = openssl_pkey_get_public($keyPath);
            Log::info('$pubkeyid=' . $pubkeyid);
            try {
                 $ok = openssl_verify($token, $signString, $pubkeyid);
                 openssl_free_key($pubkeyid);
                 Log::info($ok);
                 if ($ok == 1) {
                     return response()->json(['status' => 'success']);
                 } elseif ($ok == 0) {
                     return response()->json(['status' => 'failure']);
                 } else {
                     return response()->json(['status' => 'failure']);
                 }
            } catch (Exception $e) {
                 Log::info($e);
            }
          }
          return response()->json(['status'=>'success']);
        }
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
