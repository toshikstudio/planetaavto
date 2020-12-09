<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SalonLabel extends Model
{
    protected $fillable=['title','salon_id','coordx','coordy','color','brands'];
}
