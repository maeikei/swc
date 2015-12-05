@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $year => $ClipsMonth)
        <a href="/swc/play/{{{$year}}}">{{{$year}}}</a>
        <br/>
        @foreach ($ClipsMonth as $month => $ClipsDay)
            <a href="/swc/play/{{{$month}}}">{{{$month}}}</a>
            <br/>
            @foreach ($ClipsDay as $day => $ClipsHour)
                <a href="/swc/play/{{{$day}}}">{{{$day}}}</a>
                <br/>
                @foreach ($ClipsHour as $hour => $Clip)
                    <a href="/swc/play/{{{$hour}}}">{{{$hour}}}</a>
                @endforeach
            @endforeach
        @endforeach
    @endforeach
@endsection

