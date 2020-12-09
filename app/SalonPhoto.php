<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalonPhoto extends Model
{
	protected $fillable=['salon_id','full_path','name'];
}
