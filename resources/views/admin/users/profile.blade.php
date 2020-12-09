@extends('layouts.app')

@section('headscripts')
    <link rel="stylesheet" href="{{asset('css/admin.css')}}">
@endsection
@section('content')
<div class="wide-container">
    @include('layouts.navbar')
    <h1>Административная панель</h1>
    @include('layouts.menu')
    <h3>Мой профиль</h3>
	<form class="form-horizontal" action="{{route('admin.users.update',curr_user()->id)}}" method="POST">
		{{ csrf_field() }}
		{{ method_field('PUT') }}
		<fieldset class="form-group position-relativemb-1">
		  <label for="Наименование">Ваше имя</label>
		  <input type="text" class="form-control form-control-sm" placeholder="Наименование" name='name' value="{{curr_user()->name}}" required>
		  <span class="is-invalid">Поле должно быть заполнено</span>
		</fieldset>
		<fieldset class="form-group position-relativemb-1">
		  <label for="Наименование">Новый пароль</label>
		  <input type="password" class="form-control form-control-sm" placeholder="Новый пароль" name='password'>
		  <span class="is-invalid">Пароль и подтверждение должны совпадать</span>
		</fieldset>
		<fieldset class="form-group position-relativemb-1">
		  <label for="Наименование">Подтверждение</label>
		  <input type="password" class="form-control form-control-sm" placeholder="Подтверждение" name='confirm_password'>
		</fieldset>
		<div class="admin__save-buttons">
			<button class="btn-planeta btn-submit" type="button">Сохранить</button>
			<a class="btn-planeta" href="{{route('home')}}">Закрыть</a>
		</div>
	</form>
</div>
@include('layouts.msgbox')
@section('scripts')
    <script type="text/javascript" src="{{asset('js/jquery-3.4.0.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/bootstrap.min.js')}}"></script>
    <script src="{{asset('js/userprofile.js')}}?v={{filemtime('js/userprofile.js')}}"></script>
@endsection