<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'teacher_id',
        'course_fee',
        'start_date',
        'end_date',
    ];

    protected $casts = [
        'course_fee' => 'float',
    ];

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }
    
    public function students(){
        return $this->belongsToMany(Student::class, 'enrollments');
    }
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
