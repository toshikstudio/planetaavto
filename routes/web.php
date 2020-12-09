<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'WelcomeController@index');

Route::group(['prefix'=>'admin', 'namespace'=>'Admin', 'middleware'=>['web','auth']], function () {
	Route::get('/',"HomeController@index")->name('home');
	Route::resource('/custom', 'CustomController',['as'=>'admin']);
	Route::resource('/salons', 'SalonController',['as'=>'admin']);
	Route::resource('/users', 'UserController',['as'=>'admin']);
	}
);
Route::get('/salons/{id}', 'Admin\SalonController@show')->name('salons.show');
Route::get('/api', 'ApiController@api')->name('api');
Route::get('/profile', 'Admin\UserController@profile')->name('profile');


