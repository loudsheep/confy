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
            ->limit(10)
            ->get();
    }
}
