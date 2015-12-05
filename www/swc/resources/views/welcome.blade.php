@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $year => $ClipsMonth)
        @foreach ($ClipsMonth as $month => $ClipsDay)
            @foreach ($ClipsDay as $day => $ClipsHour)
                <br/>
                <a href="/swc/play/{{{$year}}}.{{{$month}}}.{{{$day}}}">{{{$year}}}.{{{$month}}}.{{{$day}}}</a>
                <br/>
                @foreach ($ClipsHour as $hour => $Clip)
                    <a href="/swc/play/{{{$Clip}}}">{{{$Clip}}}</a>
                @endforeach
            @endforeach
        @endforeach
    @endforeach
@endsection

