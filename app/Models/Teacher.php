<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

  protected $fillable = [
    'first_name',
    'last_name',
    'father_name',
    'grandfather_name',
    'email',
    'phone',
    'date_of_birth',
    'gender',
    'specialization',
    'profile_photo',
];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}