<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'enrollment_date',
        'status',
        'total_paid',
        'fee_status',
    ];

    protected $casts = [
        'total_paid' => 'float',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function refreshFeeStatus(): void
    {
        $courseFee = (float) ($this->course?->course_fee ?? 0);
        $totalPaid = (float) $this->payments()->sum('amount');

        $status = 'unpaid';
        if ($totalPaid > 0 && $totalPaid < $courseFee) {
            $status = 'partial';
        } elseif ($totalPaid >= $courseFee && $courseFee > 0) {
            $status = 'paid';
        }

        if ($courseFee === 0.0) {
            $status = 'paid';
        }

        $this->update([
            'total_paid' => $totalPaid,
            'fee_status' => $status,
        ]);
    }
}
