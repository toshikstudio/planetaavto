<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Custom extends Model
{
    protected $fillable=['phone','logo','worktime'];
	public $timestamps=false;
}
