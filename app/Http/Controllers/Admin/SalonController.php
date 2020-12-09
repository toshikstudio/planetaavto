<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Salon;
use App\SalonPhoto;
use App\SalonFeature;
use App\SalonLabel;
use App\SalonVideo;
use Image;

class SalonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (curr_user()->type<1) {
            return redirect('admin');
        }
        $salon=new Salon;
        $photos=[];
        $upd_videos=[];
        $features='';
        $labelstr='[]';
        $parents=Salon::where('parent_id',0)->orwhere('parent_id',null)->get();
        return view('admin.salons.create',compact('salon','photos','features','labelstr','upd_videos','parents'));
    }

    public function savePhotos($request,$salon) {
        // обрабатываем переданные файлы
        $imgarray=[];
        $descarray=[];
        $mainflagsarray=[];
        for ($i=1;$i<100;$i++) {
            if ($request->hasfile('file'.$i)) {
                $image = $request->file('file'.$i);
                if ($image->isValid()) {
                    array_push($imgarray,$image);
                    array_push($descarray,'');
                    array_push($mainflagsarray,false);
                }
            }
        }
        $alreadyUploadedPhotosQty=-1;
        $uploadedPhotos=SalonPhoto::where('salon_id','=',$salon->id)->get();
        foreach($uploadedPhotos as $rec) {
            $pos=strpos($rec->full_path,'-');
            $num_photo=0+substr($rec->full_path,$pos+1,1);
            if ($num_photo>$alreadyUploadedPhotosQty) {
                $alreadyUploadedPhotosQty=$num_photo;
            }
        }
        $alreadyUploadedPhotosQty=$alreadyUploadedPhotosQty+1;
        $currentphotoname='photo'.$salon->id.'-';
        for ($i=0; $i<count($imgarray); $i++) {
            $img=Image::make($imgarray[$i]);
            $curr_photo_id=$i+$alreadyUploadedPhotosQty;
            $img=$img->fit(1024,768);
            $img=$img->save('photos/'.$currentphotoname.$curr_photo_id.'full'.'.jpg');
            $photo_obj=new SalonPhoto;
            $photo_obj->salon_id=$salon->id;
            $photo_obj->name=$descarray[$i];
            $photo_obj->full_path=$currentphotoname.$curr_photo_id.'full'.'.jpg';
            $photo_obj->save();
        }
    }

    public function saveMap($request,$salon) {
        if ($request->hasFile('mapfile')) {
            $image=$request->file('mapfile');
            if ($image->isValid()) {
                $img=Image::make($image);
                $img=$img->fit($request->map_sizex,$request->map_sizey);
                $img=$img->save('photos/'.'salon_plan'.$salon->id.'full'.'.jpg');
                $salon->map_path='photos/'.'salon_plan'.$salon->id.'full'.'.jpg';
                $salon->save();
            }
        }
    }

    public function saveFeatures($request,$salon) {
        if (isset($request->features)) {
            $arr_feature=json_decode($request->features);
            $salon->features()->delete();
            foreach ($arr_feature as $feature) {
                $rec_feature=new SalonFeature;
                $rec_feature->salon_id=$salon->id;
                $rec_feature->name=$feature->char;
                $rec_feature->save();
            }
        }
    }

    public function saveLabels($request,$salon) {
        if (isset($request->labels)) {

            $arr_labels=json_decode($request->labels);
            $salon->labels()->delete();
            foreach ($arr_labels as $label) {
                $rec_label=new SalonLabel;
                $rec_label->salon_id=$salon->id;
                $rec_label->title=$label->title;
                $rec_label->coordx=$label->coords[0];
                $rec_label->coordy=$label->coords[1];
                $rec_label->color=$label->color;
                $rec_label->islabel=$label->islabel;
                if ($label->islabel) {
                    $rec_label->subsalon_id=0;
                }else{
                    $rec_label->subsalon_id=$label->subsalon;
                }
                $rec_label->tail=$label->tail;
                $rec_label->brands=json_encode($label->brands);
                $rec_label->save();
            }
        }
    }

    public function saveVideos($request,$salon) {
        $salon->videos()->delete();
        for ($i=1;$i<100;$i++) {
            if (isset($request['video'.$i])) {
                $rec_video=new SalonVideo;
                $rec_video->salon_id=$salon->id;
                $rec_video->full_path=$request['video'.$i];
                $rec_video->save();
            }
        }
    }


    public function beforeRecording($salon,$request) {
        if ($request->deletedphotos!==null && $request->deletedphotos!='') {
            $arr_deleted=explode(',',$request->deletedphotos);
            foreach($arr_deleted as $del_id) {
                SalonPhoto::destroy($del_id);
            }
        }
        if (!isset($request->description)) {
            $salon->description="";
        }
        return $salon;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (curr_user()->type<1) {
            return redirect('admin');
        }
        $salon=new Salon;
        $salon->fill($request->all());
        if ($salon->type==1) {
            $salon->parent_id=0;
        }
        $salon=$this->beforeRecording($salon,$request);
        $salon->save();
        $this->savePhotos($request,$salon);
        $this->saveMap($request,$salon);
        $this->saveFeatures($request,$salon);
        $this->saveLabels($request,$salon);
        return redirect('admin');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $salon=Salon::find($id);
        $photos=SalonPhoto::where('salon_id',$id)->get();
        $videos=SalonVideo::where('salon_id',$id)->get();
        $upd_videos=[];$i=1;
        foreach ($videos as $video) {
            $video->index=$i;
            $video->embed_path=str_replace('watch?v=', 'embed/', $video->full_path);
            $video->yt_index=str_replace('https://www.youtube.com/watch?v=', '', $video->full_path);
            $i++;
            array_push($upd_videos, $video);
        }
        return view('salon',compact('salon','photos','upd_videos'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function edit($id)
    {
        if (curr_user()->type<1) {
            return redirect('admin');
        }
        $salon=Salon::find($id);
        $photos=SalonPhoto::where('salon_id',$id)->get();
        $videos=SalonVideo::where('salon_id',$id)->get();
        $features=json_encode(SalonFeature::getFeatures($id));
        $labels=SalonLabel::where('salon_id',$id)->get();
        $parents=Salon::where('parent_id',0)->orwhere('parent_id',null)->get();
        $upd_labels=[];
        foreach($labels as $label) {
            $upd_label=$label;
            $upd_label->coords=[$label->coordx,$label->coordy];
            $upd_label->brands=json_decode($label->brands);
            $upd_label->subsalon=$label->subsalon_id;
            // $upd_label->id=$label->id;
            // $upd_label->title=$label->title;
            // $upd_label->color=$label->color;
            // $upd_label->brands=$label->brands;
            array_push($upd_labels,$upd_label);
        }
        $labelstr=json_encode($upd_labels);
        $upd_videos=[];$i=1;
        foreach ($videos as $video) {
            $video->index=$i;
            $video->embed_path=str_replace('watch?v=', 'embed/', $video->full_path);
            $i++;
            array_push($upd_videos, $video);
        }

        return view('admin.salons.edit',compact('salon','photos','features','labelstr','upd_videos','parents'));
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
        if (curr_user()->type<1) {
            return redirect('admin');
        }
        $salon=Salon::find($id);
        $salon->fill($request->all());
        if ($salon->type==1) {
            $salon->parent_id=0;
        }
        $salon=$this->beforeRecording($salon,$request);
        $salon->save();
        $this->savePhotos($request,$salon);
        $this->saveMap($request,$salon);
        $this->saveFeatures($request,$salon);
        $this->saveLabels($request,$salon);
        $this->saveVideos($request,$salon);
        return redirect('admin');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (curr_user()->type<1) {
            return redirect('admin');
        }
        Salon::destroy($id);
        return redirect('admin');
    }
}
