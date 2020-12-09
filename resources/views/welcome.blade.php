@extends('layouts.app')
@section('headscripts')
    <script type="text/javascript" src="https://api-maps.yandex.ru/2.1/?apikey=ec4f0a36-2541-4a04-94d6-fb50282f77fc&lang=ru_RU"></script>
@endsection
@section('content')
	<div class="single-page">
<!-- 		@include('layouts.navbar')
 -->	    <div id="yamap">
	    </div>
		<div class="wide-container" style="height: 100%">
		    <footer>
		        <div class="footer-logo-div">
		        	<a href="/">
			            <img src="img/logo.png" alt="">
		        	</a>
		            <p>Мультибрендовый автосервис</p>
		        </div>
		        <div class="phone-time-block__footer-time">
		            <img src="img/time-icon.png" alt="">
		            <span>{{$custom->worktime}}</span>
		        </div>
		        <div class="phone-time-block__footer-phone">
		            <span class="footer-phone-label">

		            </span>
		            <span>{{$custom->phone}}</span>
		        </div>
		        <div class="footer-border-grey">
		            <div class="footer-border-white">
		                <a href="tel: {{$custom->phone}}" class="footer-call-button">
		                    <img src="img/phone-icon-white.png" alt="">
		                </a>
		            </div>
		        </div>
		    </footer>
		</div>
	    <div class="sidebar">
	    	<div class="sidebar-content">
	    		<button class="sidebar-close">
	    			X
	    		</button>
	    		<div class="sidebar-big">
		    		<img src="" alt="" class="fon">
	    		</div>
	    	</div>
	    </div>
	</div>
    <div class="baloon-container">
        <div class="baloon">
            <div class="baloon-text">
            </div>
            <button class="baloon-footer">
            </button>
        </div>
    </div>
    <div class="navigator-container">
        <div class="navigator-text">
        	<p class="baloon-features navigator-features">Мое местоположение</p>
        </div>
    </div>
	<div class="stick-template">
	    <div class="handler_up" style="display: none">
	        <span class="handler_up__color"></span>
	    </div>
	    <div class="stick">
	    </div>
	    <div class="handler">
	        <span class="handler__color"></span>
	    </div>
	</div>
    <script src="{{asset('js/jquery-3.4.0.min.js')}}"></script>
    <script src="{{asset('js/stick.js')}}?v={{filemtime('js/stick.js')}}"></script>
    <script src="{{asset('js/map.js')}}?v={{filemtime('js/map.js')}}"></script>
@endsection
