@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $year => $ClipsYear)
        <div class="clipGroupYear">
        @foreach ($ClipsYear as $month => $ClipsMonth)
            <div class="clipGroupMonth">
            @foreach ($ClipsMonth as $day => $ClipsDay)
                <div class="clipGroupDay">
                <a href="/swc/play/{{{$year}}}.{{{$month}}}.{{{$day}}}">{{{$year}}}.{{{$month}}}.{{{$day}}}</a>
                @foreach ($ClipsDay as $Clip)
                    <a href="/swc/play/{{{$Clip}}}">{{{$Clip}}}</a>
                @endforeach
                </div>
            @endforeach
            </div>
        @endforeach
        </div>
    @endforeach
@endsection

