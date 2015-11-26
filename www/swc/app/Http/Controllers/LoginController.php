<?php

namespace swc\Http\Controllers;

use Illuminate\Http\Request;

use swc\Http\Requests;
use swc\Http\Controllers\Controller;

use Log;

class LoginController extends Controller
{
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
    		//
		$bodyContent = $request->getContent();
		//Log::info($bodyContent);
		$bodyContent = str_replace("'","",$bodyContent);
		Log::info($bodyContent);
		$bodyJson = json_decode($bodyContent);
		Log::info(json_last_error_msg());
		if (isset($bodyJson->kty) && 'RSA'== $bodyJson->kty) {
			$token = hash('sha512',$bodyContent);
			Log::info($token);
			return response()->json(['token' => $token]);
		}
		if (isset($bodyJson->signature)) {
			$token = $bodyJson->token;
			Log::info($token);
			$signature = $bodyJson->signature;
			Log::info($signature);
			return response()->json(['token' => $token]);
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
