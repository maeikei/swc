@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $year)
        <a href="/swc/play/{{$year}}">{{$year}}</a>
    @endforeach
@endsection

