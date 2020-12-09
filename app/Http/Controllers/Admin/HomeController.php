<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Custom;
use App\Salon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if (curr_user()->type>=1) {
            $custom=Custom::first();        
            $salons=Salon::orderby('name')->where('parent_id',0)->orwhere('parent_id',null)->get();
            $subsalons=Salon::where('parent_id','<>',0)->where('parent_id','<>',null)->get();
            return view('home',compact('custom','salons','subsalons'));
        }else{
            return view('admin.users.profile');
        }
    }
}
