<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Salon;
use App\SalonFeature;
use App\SalonLabel;

class ApiController extends Controller
{
	public function api(Request $request) {
		if ($request->func=='getsalons') {
			$prev_salons=[];
			$salons=Salon::where('parent_id',0)->orwhere('parent_id',null)->get();
			foreach ($salons as $salon) {
				$salon->coords=[$salon->latitude,$salon->longitude];
				$salon->href='/salons/'.$salon->id;
				$features=SalonFeature::where('salon_id',$salon->id)->get();
				$salon_features=[];
				foreach ($features as $feature) {
					array_push($salon_features, $feature->name);
				}
				$salon->features=$salon_features;
				array_push($prev_salons, $salon);
			}
			return json_encode($prev_salons);
		}else if ($request->func=='getsubsalons') {
			$subsalons=Salon::where('parent_id',$request->id)->select('id','name')->get();
			return json_encode($subsalons);
		}else if ($request->func=='getcoords') {
			$salon=Salon::find($request->id);
			return json_encode([$salon->latitude,$salon->longitude]);
		}else if ($request->func=='getaddress') {
			$salon=Salon::find($request->id);
			return $salon->address;
		}else if ($request->func=='getsalondata'){
			$salon=Salon::find($request->id);
			$labels=SalonLabel::where('salon_id',$request->id)->get();
			$labels_arr=[];
			foreach ($labels as $label) {
				$label->brands=json_decode($label->brands);
				$label->coords=[$label->coordx,$label->coordy];
				array_push($labels_arr, $label);
			}
			$salon->labels=$labels_arr;
			return json_encode($salon);
		}else{
			return 'unrecognized func: '.$request->func;
		}
	}
}
