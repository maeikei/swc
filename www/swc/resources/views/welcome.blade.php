@extends('layouts.master')

@section('sidebar')
    @parent
    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
    @foreach ($name as $file)
        <a href="/swc/play/{{$file}}">{{$file}}</a>
    @endforeach
@endsection

