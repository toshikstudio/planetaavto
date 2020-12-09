<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (curr_user()->type<2) {
            return redirect('admin');
        }
        $users=User::orderby('name');
        $users=$users->select(
                        'id',
                        'name',
                        'email',
                        'type',
                        DB::Raw('CASE   WHEN type=0 THEN "Пользователь"
                                        WHEN type=1 THEN "Менеджер" 
                                        WHEN type=2 THEN "Супервизор" 
                                        END as typeref')
                    );
        $users=$users->get();
        return view('admin.users.index',compact('users'));
    }

    public function profile()
    {
        return view('admin.users.profile');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (curr_user()->type<2) {
            return redirect('admin');
        }
        $user=User::find($id);
        $usertype_list=$user->userTypes();
        return view('admin.users.edit',compact('user','usertype_list'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($id!=curr_user()->id) {
            if (curr_user()->type<2) {
                return redirect('admin');
            }
        }
        $user=User::find($id);
        $user->name=$request->name;
        if (curr_user()->type==2) {
            $user->type=$request->type;
        }
        if ($request->password!="" && $request->password!=null) {
            $user->password=Hash::make($request->password);
        }
        $user->save();
        if (curr_user()->type>=2) {
            return redirect('admin/users');
        }else{
            return redirect('admin');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (curr_user()->type<2) {
            return redirect('admin');
        }
        User::destroy($id);
        return redirect('admin/users');
    }
}
