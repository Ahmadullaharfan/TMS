<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Course;
use App\Models\Payment;
use App\Models\Student;
use App\Http\Requests\StoreEnrollmentRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('enrollments/index', [
            'enrollments' => Enrollment::with('student', 'course')
                ->latest()
                ->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('enrollments/add_enrollment', [
            'students' => Student::select('id', 'first_name', 'last_name')->orderBy('first_name')->get(),
            'courses' => Course::select('id', 'title', 'course_fee')->orderBy('title')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnrollmentRequest $request)
    {
        DB::transaction(function () use ($request): void {
            $validated = $request->validated();

            $enrollment = Enrollment::create([
                'student_id' => $validated['student_id'],
                'course_id' => $validated['course_id'],
                'enrollment_date' => $validated['enrollment_date'] ?? null,
                'status' => $validated['status'],
                'total_paid' => 0,
                'fee_status' => 'unpaid',
            ]);

            $paymentAmount = (float) ($validated['payment_amount'] ?? 0);
            if ($paymentAmount > 0) {
                Payment::create([
                    'enrollment_id' => $enrollment->id,
                    'amount' => $paymentAmount,
                    'paid_at' => $validated['payment_date'] ?? null,
                    'payment_method' => 'cash',
                    'receipt_no' => $validated['receipt_no'] ?? null,
                    'note' => $validated['payment_note'] ?? null,
                ]);
            }

            $enrollment->loadMissing('course');
            $enrollment->refreshFeeStatus();
        });

        return redirect()->route('enrollments.index')->with('success', 'Enrollment created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Enrollment $enrollment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Enrollment $enrollment)
    {
        return inertia('enrollments/update_enrollment', [
            'enrollment' => $enrollment->load('student', 'course', 'payments'),
            'students' => Student::select('id', 'first_name', 'last_name')->orderBy('first_name')->get(),
            'courses' => Course::select('id', 'title', 'course_fee')->orderBy('title')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Enrollment $enrollment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enrollment $enrollment)
    {
        DB::transaction(function () use ($enrollment): void {
            $enrollment->payments()->delete();
            $enrollment->delete();
        });
        return redirect()
            ->route('enrollments.index')
            ->with('success', 'Enrollment deleted successfully.');
    }
}
