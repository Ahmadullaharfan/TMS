<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEnrollmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_id' => [
                'required',
                'integer',
                'exists:students,id',
                Rule::unique('enrollments')->where(fn ($query) => $query->where('course_id', $this->course_id)),
            ],
            'course_id' => 'required|integer|exists:courses,id',
            'enrollment_date' => 'nullable|date',
            'status' => 'required|in:active,completed,dropped',
            'payment_amount' => 'nullable|numeric|min:0',
            'payment_date' => 'nullable|date',
            'receipt_no' => 'nullable|string|max:255|unique:payments,receipt_no',
            'payment_note' => 'nullable|string',
        ];
    }
}
