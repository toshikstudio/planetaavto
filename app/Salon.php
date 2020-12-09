<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Salon extends Model
{
    protected $fillable=['name','description','address','longitude','latitude','map_sizex','map_sizey','map_path','type',"parent_id","phone","worktime"];

    public function features() {
    	return Salon::hasMany('App\SalonFeature');
    }
    public function labels() {
    	return Salon::hasMany('App\SalonLabel');
    }
    public function videos() {
    	return Salon::hasMany('App\SalonVideo');
    }
}
