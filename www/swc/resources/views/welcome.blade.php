@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $year => $ClipsMonth)
        <a href="/swc/play/{{{$year}}}">{{{$year}}} Year</a>
        <br/>
        @foreach ($ClipsMonth as $month => $ClipsDay)
            <a href="/swc/play/{{{$month}}}">{{{$month}}} Month</a>
            <br/>
            @foreach ($ClipsDay as $day => $ClipsHour)
                <a href="/swc/play/{{{$day}}}">{{{$day}}} Date</a>
                <br/>
                @foreach ($ClipsHour as $hour => $Clip)
                    <a href="/swc/play/{{{$hour}}}">{{{$hour}}} Hour</a>
                @endforeach
            @endforeach
        @endforeach
    @endforeach
@endsection

