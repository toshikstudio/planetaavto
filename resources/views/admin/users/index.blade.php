@extends('layouts.app')

@section('headscripts')
    <link rel="stylesheet" href="{{asset('css/admin.css')}}">
@endsection
@section('content')
<div class="wide-container">
    @include('layouts.navbar')
    <h1>Административная панель</h1>
    @include('layouts.menu')
    <h3>Пользователи</h3>
    <table class="salons__table" cellspacing="0">
        <thead>
            <th>Имя</th>
            <th>E-mail</th>
            <th>Тип</th>
            <th>Действие</th>
        </thead>
        <tbody>
            @foreach($users as $user)
            <tr data-name="{{$user->name}}">
                <td><a href="{{route('admin.users.edit',$user->id)}}">{{$user->name}}</a></td>
                <td>{{$user->email}}</td>
                <td>{{$user->typeref}}</td>
                <td><button class="del-button btn-planeta" data-id="{{$user->id}}">Удалить</button></td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @include('layouts.confirm')
    <form id="deleteform" action="" method="POST" data-action="{{route('admin.users.destroy','aaa')}}">
        {{ method_field('DELETE') }}
        {{ csrf_field() }}
    </form>

</div>
@section('scripts')
    <script type="text/javascript" src="{{asset('js/jquery-3.4.0.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/bootstrap.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/delwithmodal.js')}}"></script>
@endsection