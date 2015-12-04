@extends('layouts.master')

@section('sidebar')
@endsection

@section('content')
    @foreach ($name as $file)
        <a href="/swc/play/{{$file}}">{{$file}}</a>
    @endforeach
@endsection

