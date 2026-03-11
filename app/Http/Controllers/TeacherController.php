<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Models\Teacher;
use Illuminate\Support\Facades\Storage;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('teachers/index', [
            'teachers' => Teacher::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('teachers/create_teacher');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('profile_photo')) {
            $data['profile_photo'] = $request->file('profile_photo')->store('teacher_photos', 'public');
        }

        Teacher::create($data);

        return redirect()->route('teachers.index')->with('success', 'Teacher created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        $teacher = Teacher::findOrFail($teacher->id);

        return inertia('teachers/show_teacher', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        return inertia('teachers/updat_teacher', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $data = $request->validated();

        if ($request->hasFile('profile_photo')) {
            if ($teacher->profile_photo && Storage::disk('public')->exists($teacher->profile_photo)) {
                Storage::disk('public')->delete($teacher->profile_photo);
            }

            $data['profile_photo'] = $request->file('profile_photo')->store('teacher_photos', 'public');
        }

        $teacher->update($data);

        return redirect()->route('teachers.index')->with('success', 'Teacher updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        if ($teacher->profile_photo && Storage::disk('public')->exists($teacher->profile_photo)) {
            Storage::disk('public')->delete($teacher->profile_photo);
        }

        $teacher->delete();
        return redirect()->route('teachers.index')->with('success', 'Teacher deleted successfully.');
    }
}
