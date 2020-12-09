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
	<form class="form-horizontal" action="{{route('admin.users.update',$user->id)}}" method="POST">
		{{ csrf_field() }}
		{{ method_field('PUT') }}
		<fieldset class="form-group position-relativemb-1">
		  <label for="Наименование">Ваше имя</label>
		  <input type="text" class="form-control form-control-sm" placeholder="Наименование" name='name' value="{{$user->name}}" required>
		  <span class="is-invalid">Поле должно быть заполнено</span>
		</fieldset>
		<fieldset class="form-group position-relativemb-1">
		  <label for="Наименование">E-mail</label>
		  <input type="text" class="form-control form-control-sm" placeholder="E-mail" name='email' value="{{$user->email}}" required>
		  <span class="is-invalid">Поле должно быть заполнено</span>
		</fieldset>
		<fieldset class="form-group position-relativemb-1">
		  <label for="Наименование">Тип</label>
			<select id="usertype_list" class="form-control form-control-sm" name="type" placeholder="Роль пользователя">
				@foreach($usertype_list as $key=>$value)
				  <option {{
					 old('type')!=null ?
					 	(trim(old('type'))==trim($key) ? "selected" : "")
					 :
					 	($user['type']!=null ?
					 		(trim($user['type'])==trim($key) ? "selected" : "")
					 	: "")
					 }}	value="{{$key}}">{{trim($value)}}</option>
				@endforeach
			</select>
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