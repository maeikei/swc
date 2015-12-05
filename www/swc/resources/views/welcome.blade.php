@extends('layouts.master')

@section('content')
    @foreach ($clipsSortTime as $year => $ClipsYear)
        <div class="clipGroupYear">
        @foreach ($ClipsYear as $month => $ClipsMonth)
            <div class="clipGroupMonth">
            @foreach ($ClipsMonth as $day => $ClipsDay)
                <div class="clipGroupDay">
                    {{{$year}}}.{{{$month}}}.{{{$day}}}
                </div>
                <div class="clipGroupDayClip">
                @foreach ($ClipsDay as $Clip)
                    <a href="/swc/play/{{{$Clip}}}">{{{str_replace('.',':',str_replace($year . '.' . $month . '.' . $day . '.','',$Clip))}}}</a>
                @endforeach
                </div>
            @endforeach
            </div>
        @endforeach
        </div>
    @endforeach
@endsection

