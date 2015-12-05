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
                @foreach ($ClipsDay as $Clip => $Time)
                    {{{var_dump($Clip)}}}
                    {{{var_dump($Time)}}}
                    <!--a href="/swc/play/{{{$Clip}}}">{{{$Time}}}</a-->
                @endforeach
                </div>
            @endforeach
            </div>
        @endforeach
        </div>
    @endforeach
@endsection

