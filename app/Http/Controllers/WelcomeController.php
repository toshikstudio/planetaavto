<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Custom;

class WelcomeController extends Controller
{
	public function index() {
		$custom=Custom::first();
		return view('welcome',compact('custom'));
	}
}
