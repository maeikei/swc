@extends('layouts.master')

@section('content')
    @foreach ($name as $file)
        <a href="/swc/play/{{$file}}">{{$file}}</a>
    @endforeach
@endsection

