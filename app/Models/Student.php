<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
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
            'profile_photo',
        ];
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
}