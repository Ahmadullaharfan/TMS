<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use Illuminate\Support\Facades\Storage;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return inertia('students/index', [
            'students' => Student::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('students/create_student');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        //
        if($request->hasFile('profile_photo')) {
            $data = $request->validated();
            $data['profile_photo'] = $request->file('profile_photo')->store('student_photos', 'public');
            Student::create($data);
        } else {
            Student::create($request->validated());
        }

        return redirect()->route('students.index')->with('success', 'Student created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
        $student= Student::findOrFail($student->id);
        return inertia('students/show_student', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return inertia('students/update_student', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $data = $request->validated();

        if ($request->hasFile('profile_photo')) {
            if ($student->profile_photo && Storage::disk('public')->exists($student->profile_photo)) {
                Storage::disk('public')->delete($student->profile_photo);
            }

            $data['profile_photo'] = $request->file('profile_photo')->store('student_photos', 'public');
        }

        $student->update($data);

        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        if ($student->profile_photo && Storage::disk('public')->exists($student->profile_photo)) {
            Storage::disk('public')->delete($student->profile_photo);
        }

        $student->delete();

        return redirect()->route('students.index')->with('success', 'Student deleted successfully.');
    }
}

