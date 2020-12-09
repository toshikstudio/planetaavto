@extends('layouts.app')

@section('headscripts')
    <link rel="stylesheet" href="{{asset('css/admin.css')}}">
@endsection
@section('content')
<div class="wide-container">
    @include('layouts.navbar')
    <h1>Административная панель</h1>
    @include('layouts.menu')
    <h3>Контактная информация</h3>
    <div class="row justify-content-center">
        <form class="form-horizontal" action="{{route('admin.custom.store')}}"  method="POST" novalidate>
            @csrf
            <fieldset class="form-group position-relative has-icon-left mb-1">
              <label for="worktime">Режим работы</label>
              <input type="text" class="form-control form-control-sm" placeholder="Режим работы" name='worktime' value="{{$custom->worktime}}">
            </fieldset>
            <fieldset class="form-group position-relative has-icon-left mb-1">
              <label for="worktime">Телефон</label>
              <input type="text" class="form-control form-control-sm" placeholder="Телефон" name='phone' value="{{$custom->phone}}">
            </fieldset>
            <button type="submit" class="btn-planeta">Сохранить</button>
        </form>

    </div>
    <h3 style="margin-bottom: 10px">Наши автосалоны</h3>
    <a href="{{route('admin.salons.create')}}" class="btn-planeta">Добавить</a>
    <table class="salons__table" cellspacing="0">
        <thead>
            <th>Наименование</th>
            <th>Описание</th>
            <th>Адрес</th>
            <th>Координаты</th>
            <th>Действие</th>
        </thead>
        <tbody>
            @foreach($salons as $salon)
            <tr data-name="{{$salon->name}}">
                <td><a href="{{route('admin.salons.edit',$salon->id)}}">{{$salon->name}}</a></td>
                <td>{!!$salon->description!!}</td>
                <td>{{$salon->address}}</td>
                <td>{{$salon->longitude}}, {{$salon->latitude}}</td>
                <td><button class="del-button btn-planeta" data-id="{{$salon->id}}">Удалить</button></td>
            </tr>
            @foreach($subsalons as $subsalon)
                @if ($subsalon->parent_id==$salon->id)
                <tr data-name="{{$subsalon->name}}">
                    <td></td>
                    <td>{!!$subsalon->description!!}</td>
                    <td><a href="{{route('admin.salons.edit',$subsalon->id)}}">{{$subsalon->name}}</a></td>
                    <td></td>
                    <td><button class="del-button btn-planeta" data-id="{{$salon->id}}">Удалить</button></td>
                </tr>
                @endif
            @endforeach
            @endforeach
        </tbody>
    </table>
    @include('layouts.confirm')
    <form id="deleteform" action="" method="POST" data-action="{{route('admin.salons.destroy','aaa')}}">
        {{ method_field('DELETE') }}
        {{ csrf_field() }}
    </form>
</div>
@endsection
@section('scripts')
    <script type="text/javascript" src="{{asset('js/jquery-3.4.0.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/bootstrap.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/delwithmodal.js')}}"></script>
@endsection