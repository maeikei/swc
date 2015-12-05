@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $year => $ClipsYear)
        @foreach ($ClipsYear as $month => $ClipsMonth)
            @foreach ($ClipsMonth as $day => $ClipsDay)
                <br/>
                <a href="/swc/play/{{{$year}}}.{{{$month}}}.{{{$day}}}">{{{$year}}}.{{{$month}}}.{{{$day}}}</a>
                <br/>
                @foreach ($ClipsDay as $Clip)
                    <a href="/swc/play/{{{$Clip}}}">{{{$Clip}}}</a>
                @endforeach
            @endforeach
        @endforeach
    @endforeach
@endsection

