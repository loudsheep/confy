<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;

class PostController extends Controller
{
    // show posts page
    public function index(Request $request)
    {
    }

    // display post creation page
    public function create(Request $request)
    {
        return Inertia::render('Posts/CreatePost');
    }

    // store/save post to DB
    public function store(Request $request)
    {
        $request->validate([
            'body' => ["required", "string", "min:10", "max:500"],
            'images' => ["array", "max:5"],
            'images.*' => ["image", "mimes:jpg,png,bmp,gif", "max:5120"]
        ]);

        $post = $request->user()->posts()->create([
            'body' => $request->body,
        ]);

        foreach ($request->images as $key => $value) {
            if ($value == null) continue;

            $path = $value->store('uploads', 'public');
            $image = Image::make(public_path("storage/" . $path))->fit(500, 500);
            $image->save();

            $path = "/storage/" . $path;

            $post->images()->create([
                'image_url' => $path,
            ]);
        }

        return redirect()->back();
    }

    // show post page
    public function show(Request $request)
    {
    }

    // display edit view
    public function edit(Request $request)
    {
    }

    // save changed/edit
    public function update(Request $request)
    {
    }

    // delete post
    public function destroy(Request $request)
    {
    }
}
