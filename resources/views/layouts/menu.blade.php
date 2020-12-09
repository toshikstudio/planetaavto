    <div class="admin__menu">
    	@if (curr_user()->type>=1)
        <a href="/admin">Контакты и салоны</a>
        @endif
    	@if (curr_user()->type>=2)
        <a href="/admin/users">Пользователи</a>
        @endif
        <a href="/profile">Мой профиль</a>
    </div>
