<input type="hidden" id='features_input' value='{{$features}}'>
<input type="hidden" id='salon_id' value='{{$salon->id}}'>
<fieldset class="form-group position-relativemb-1">
  <label for="Наименование">Наименование</label>
  <input type="text" class="form-control form-control-sm" placeholder="Наименование" name='name' value="{{$salon->name}}" required>
  <span class="is-invalid">Поле должно быть заполнено</span>
</fieldset>
<fieldset class="form-group position-relativemb-1">
  <label for="Наименование">Режим работы</label>
  <input type="text" class="form-control form-control-sm" placeholder="Режим работы" name='worktime' value="{{$salon->worktime}}" required>
  <span class="is-invalid">Поле должно быть заполнено</span>
</fieldset>
<fieldset class="form-group position-relativemb-1">
  <label for="Наименование">Телефон</label>
  <input type="text" class="form-control form-control-sm" placeholder="Телефон" name='phone' value="{{$salon->phone}}" required>
  <span class="is-invalid">Поле должно быть заполнено</span>
</fieldset>
<fieldset class="form-group position-relativemb-1 radio-group">
	<input type="hidden" name="type" value="{{$salon->type}}">
	<input type="radio" data-value="1" id="complex">
	<label for="complex">Комплекс (территория)</label>
	<input type="radio" data-value="2" id="room">
	<label for="room">Помещение</label>
    <span class="is-invalid">Должен быть выбран один из вариантов</span>
</fieldset>
<fieldset class="form-group position-relativemb-1 select-group">
	<label for="parent_id" name="parent_id">Родительский салон</label>
	<select name="parent_id" id="parent_id">
		<option value="0">Не выбран</option>
		@foreach($parents as $parent)
			<option value="{{$parent->id}}"
				{{$parent->id==$salon->parent_id ? "selected" : ""}}
				>{{$parent->name}}</option>
		@endforeach
	</select>
</fieldset>
<fieldset class="form-group position-relative mb-1">
  <label for="address">Адрес</label>
  <input type="text" id="address" class="form-control form-control-sm" placeholder="Адрес" name='address' value="{{$salon->address}}">
  <span class="is-invalid">Поле должно быть заполнено</span>
</fieldset>
<div id="adm_yamap"></div>
<fieldset class="form-group position-relative mb-1">
  <label for="Описание">Описание</label>
  <textarea id="description" type="text" class="form-control form-control-sm" placeholder="Описание" name='description' required>{{$salon->description}}</textarea>
</fieldset>
<div class="coords-wrapper">
	<div class="d-flex justify-content-start coords">
		<fieldset class="form-group position-relative mb-1">
		  <label for="Широта">Широта</label>
		  <input type="text" class="form-control form-control-sm" placeholder="Широта" name='latitude' value="{{$salon->latitude}}">
		</fieldset>
		<fieldset class="form-group position-relative mb-1 ml-2">
		  <label for="Долгота">Долгота</label>
		  <input type="text" class="form-control form-control-sm" placeholder="Долгота" name='longitude' value="{{$salon->longitude}}">
		</fieldset>
	</div>
</div>
<div class="d-flex justify-content-between">
	<div class="photos-block">
		<h3>Фотографии салона</h3>
		<div id="ramka" class="d-flex flex-column justify-content-end align-items-center">
		    <input type="hidden" name="deletedphotos">
		    <div class="uploaded-photos">
		        @foreach($photos as $photo)
		            <div style="transform: scale(1)" id="photo{{$photo->id}}" data-id="{{$photo->id}}" class="photo-div">
		                <div class="title-div">
		                    <p id="title{{$photo->id}}" class="photo-title">{{$photo->id}}</p>
		                </div>
		                <button type="button" class="close-btn">Х</button>
		                <img class="photo-img" src="{{asset('photos/'.$photo->full_path)}}" data-src="{{asset('photos/'.$photo->full_path)}}" alt="">
		            </div>
		        @endforeach
		    </div>
		    <label for="file1" class="filupp btn btn-login">
		        <span class="filupp-file-name btn-planeta js-value">Выберите фото</span>
		        <input type="file" name="file1" accept="image/*" value="1" id="file1">
		    </label>
		</div>
	</div>
	<div class="features-block">
		<h3>Характеристики салона</h3>
	    <div class="d-flex">
	        <button type="button" class="btn-planeta props-btn-add">Добавить</button>
	    </div>
		<table class="props char__table" cellspacing="0">
			
		</table>
		<input type="hidden" name='features'>
	</div>
</div>
<div class="salon-map-wrapper">
	<h3>Карта салона</h3>
	<div class="salon-map d-flex flex-column justify-content-end">
		<div class="map-buttons">
			
		</div>
		<div class="map-image">
			@if(isset($salon->map_path))
				<img src="{{asset($salon->map_path)}}" style="width: {{$salon->map_sizex}}px; height: {{$salon->map_sizey}}px" alt="">
			@endif
		</div>
		<div class="map-sizes">
			<label for="">Размер гориз.</label>
			<input type="numeric" name='map_sizex' id='map_sizex' value="{{$salon->map_sizex}}">
			<label for="">Размер верт.</label>
			<input type="numeric" name='map_sizey' id='map_sizey' value="{{$salon->map_sizey}}">
		</div>
	    <label for="mapfile" class="filupp btn btn-login">
	        <span class="filupp-file-name btn-planeta js-value">Выберите фото-план салона</span>
	        <input type="file" name="mapfile" accept="image/*" value="1" id="mapfile">
	    </label>
	    <input type="hidden" name="labels" value="{{$labelstr}}">
	</div>
</div>
<div class="video-wrapper">
	<h3>Видео</h3>
	<button class="btn-planeta video-add" type="button">Добавить</button>
	<div class="video-container">
		@foreach($upd_videos as $video)
			<div class="video-block">
				<input type="text" class="video-ref" placeholder="Ссылка на видео youtube" value="{{$video->full_path}}" name="video{{$video->index}}">
				<span class="video-del">X</span>
				<iframe width="580" height="310" src="{{$video->embed_path}}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
				</iframe>
			</div>
		@endforeach
	</div>
</div>
<div class="stick-template">
    <div class="handler_up" style="display: none">
        <span class="handler_up__color"></span>
    </div>
    <div class="stick">
        <p class="stick__title">Сервис</p>
        <p class="stick__brand">Jaguar</p>
        <p class="stick__brand">LandRover</p>
	    <button type="button" class="stick__edit">e</button>
	    <button type="button" class="stick__del">Х</button>
    </div>
    <div class="handler">
        <span class="handler__color"></span>
    </div>
</div>
<div class="video-template">
	<input type="text" class="video-ref" placeholder="Ссылка на видео youtube">
	<span class="video-del">X</span>
	<iframe width="580" height="310" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
	</iframe>

</div>
@include('layouts.msgbox')
<div class="map-sizes-template">
<!-- 	<div class="form-group">
		<label for="">Размер гориз.</label>
		<input type="numeric" name='map_sizex' id='map_sizex'>
	</div>
	<div class="form-group">
		<label for="">Размер верт.</label>
		<input type="numeric" name='map_sizey' id='map_sizex'>
	</div>
 --></div>
