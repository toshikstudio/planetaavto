<header class="map-footer">
	<div class="footer-logo-div">
		<a href="{{url('/')}}">
	        <img src="{{asset('img/logo.png')}}" alt="Лого">
		</a>
        <p>Мультибрендовый автосервис</p>
    </div>
    <div class="login-block">
        @guest
        	<a href='/login'>Войти</a>
        @else
        	<a href='/admin'>Админка</a>
            <a href="{{ route('logout') }}"
               onclick="event.preventDefault();
                        document.getElementById('logout-form').submit();"
            >
                Выйти
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                @csrf
            </form>
        @endguest
    </div>
</header>
