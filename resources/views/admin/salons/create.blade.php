@extends('layouts.app')

@section('headscripts')
    <link rel="stylesheet" href="{{asset('css/admin.css')}}?v={{filemtime('css/admin.css')}}">
    <link rel="stylesheet" href="{{asset('css/stick.css')}}?v={{filemtime('css/stick.css')}}">
    <script type="text/javascript" src="https://api-maps.yandex.ru/2.1/?apikey=ec4f0a36-2541-4a04-94d6-fb50282f77fc&lang=ru_RU"></script>

@endsection
@section('content')
	<div class='wide-container'>
	    @include('layouts.navbar')
	    <h1>Создание салона</h1>
		<form class="form-horizontal" action="{{route('admin.salons.store')}}" enctype="multipart/form-data" method="POST">
			{{ csrf_field() }}
			@include('admin.salons.partials.form')
			<div class="admin__save-buttons">
				<button class="btn-planeta btn-submit" type="button">Сохранить</button>
				<a class="btn-planeta" href="{{route('home')}}">Закрыть</a>
			</div>
		</form>
	</div>
@endsection

@section('scripts')
	<script src="{{asset('js/jquery-3.4.0.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('js/bootstrap.min.js')}}"></script>
    <script src="{{asset('js/ckeditor.js')}}"></script>
    <script src="{{asset('js/smarttable.js')}}"></script>
    <script src="{{asset('js/stick.js')}}?v={{filemtime('js/stick.js')}}"></script>
	<script src="{{asset('js/fileload.js')}}?v={{filemtime('js/fileload.js')}}"></script>
	<script src="{{asset('js/admmap.js')}}?v={{filemtime('js/admmap.js')}}"></script>
@endsection
