@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $month)
        <a href="/swc/play/{{$file}}">{{$file}}</a>
    @endforeach
@endsection

