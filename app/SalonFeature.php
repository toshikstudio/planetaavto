<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalonFeature extends Model
{
    protected $fillable=['name'];

	public static function getFeatures($salon_id) {
		$query=SalonFeature::where('salon_id','=',$salon_id)->select('salon_features.name as char');
		return $query->get();
	}

}
