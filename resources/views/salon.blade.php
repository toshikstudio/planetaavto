@extends('layouts.app')
@section('headscripts')
    <link rel="stylesheet" href="{{asset('css/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('css/owl.theme.default.min.css')}}">
    <script type="text/javascript" src="https://api-maps.yandex.ru/2.1/?apikey=ec4f0a36-2541-4a04-94d6-fb50282f77fc&lang=ru_RU"></script>
    <script src="//yastatic.net/taxi-widget/ya-taxi-widget.js" charset="UTF-8"></script>
@endsection
@section('content')
    <div class="container">
        <header>
            <a href="/">
                <img src="{{asset('img/logo.png')}}" alt="Лого">
            </a>
            <p>Мультибрендовый автосервис</p>
        </header>
        <main>
            <div class="slider-left">
                <div class="owl-carousel slide-big owl-theme">
                    @foreach($photos as $photo)
                        <div class="item item-big">
                            <img src="{{asset('photos/'.$photo->full_path)}}" alt="Slide">
                        </div>
                    @endforeach
                </div>
                <div class="small-slides">
                    <div class="owl-carousel slide-small owl-theme">
                    @foreach($photos as $photo)
                        <div class="item item-small">
                            <img src="{{asset('photos/'.$photo->full_path)}}" alt="Slide">
                        </div>
                    @endforeach
                    </div>
                </div>
            </div>
            <div class="text-right">
                <p data-id="{{$salon->id}}" class="right-title">{{$salon->name}}</p>
                <p class="right-text">{!!$salon->description!!}</p>
                <div class="phone-time-block">
                    <div class="phone-time-block__phone">
                        <img src="{{asset('img/phone-icon.png')}}" alt="">
                        <a href="tel:{{$salon->phone}}">{{$salon->phone}}</a>
                    </div>
                    <div class="phone-time-block__time">
                        <img src="{{asset('img/time-icon.png')}}" alt="">
                        <span>{{$salon->worktime}}</span>
                    </div>
                </div>
                <div class="button-block">
                    <div class="border-grey">
                        <div class="border-white">
                            <a href="/?long={{$salon->longitude}},lat={{$salon->latitude}}" id="build_route" class="main-buttons">Построить маршрут</a>
                        </div>
                    </div>
                    <div class="yataxi-block">
                        <div class="border-grey">
                            <div class="border-white ya-taxi-widget"
                                data-size="s"
                                data-custom-layout="true"
                                data-title="Вызвать Яндекс такси"
                                data-point-b="{{$salon->longitude}},{{$salon->latitude}}"
                                data-use-location="true"
                                data-proxy-url="https://3.redirect.appmetrica.yandex.com/route?start-lat={start-lat}&amp;start-lon={start-lon}&amp;end-lat={end-lat}&amp;end-lon={end-lon}&amp;ref=widget&amp;appmetrica_tracking_id=1178268795219780156&amp;utm_source=widget"
                            >
                                <div data-description="true"></div>
                                <div><a id="yataxi" href="#" target="_blank" data-link="true" class="main-buttons">Вызвать Яндекс такси</a></div>
                                <div data-disclaimer="true"></div>                            
<!--                                 <button id="yataxi" class="main-buttons">Вызвать Яндекс Такси</button>
 -->                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <div class="video-content">
            @foreach($upd_videos as $video)
                <div class="video">
                    <a href="{{$video->full_path}}" target="_blank">
                        <img src="https://img.youtube.com/vi/{{$video->yt_index}}/sddefault.jpg">
                        <div class="video__bottom-buttons">
                            <img src="{{asset('img/triangle.png')}}" alt="">
                            <div class="video__bottom-buttons-strips">
                                <div class="video__bottom-buttons-blue-strip"></div>
                            </div>
                        </div>
                        <div class="blue-fon"></div>
                        <div class="play-button">
                            <div class="ellipse">
                                <img src="{{asset('img/ellipse.png')}}" alt="">
                            </div>
                            <div class="triangle">
                                <img src="{{asset('img/triangle.png')}}" alt="">
                            </div>
                        </div>
                    </a>
                </div>
            @endforeach
            <div class="video" style="display: none">
                <img src="{{asset('img/videopr4.png')}}" alt="">
                <div class="video__bottom-buttons">
                    <img src="{{asset('img/triangle.png')}}" alt="">
                    <div class="video__bottom-buttons-strips">
                        <div class="video__bottom-buttons-blue-strip"></div>
                    </div>
                </div>
                <div class="blue-fon"></div>
                <div class="play-button">
                    <div class="ellipse">
                        <img src="{{asset('img/ellipse.png')}}" alt="">
                    </div>
                    <div class="triangle">
                        <img src="{{asset('img/triangle.png')}}" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>    
    <div class="modal fade" id="yamapModal" tabindex="-1" role="dialog" aria-labelledby="yaMapModal" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">Как добраться</div>
          <div class="modal-body">
              <div id="modal_yamap">
                  
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="msgbox-cancel btn-planeta" data-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
    <div class="navigator-container">
        <div class="navigator-text">
            <p class="baloon-features navigator-features">Мое местоположение</p>
        </div>
    </div>
@endsection
@section('scripts')
    <script src="{{asset('js/jquery-3.4.0.min.js')}}"></script>
    <script src="{{asset('js/bootstrap.min.js')}}"></script>
    <script src="{{asset('js/owl.carousel.min.js')}}"></script>
    <script src="{{asset('js/salon.js')}}?v={{filemtime('js/salon.js')}}"></script>
@endsection