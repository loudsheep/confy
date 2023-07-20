<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function searchUsers(Request $request, $searchTerm = '')
    {
        if (trim($searchTerm) == '') {
            return [];
        }

        return User::with('profile')
            ->where('name', 'LIKE', '%' . $searchTerm . '%')
            ->where('id', '<>', $request->user()->id)
            ->limit(10)
            ->get();
    }
}
