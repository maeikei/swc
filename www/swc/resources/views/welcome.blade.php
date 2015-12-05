@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $year => $ClipsMonth)
        <a href="/swc/play/{{{$year}}}">{{{$year}}}</a>
    @endforeach
@endsection

