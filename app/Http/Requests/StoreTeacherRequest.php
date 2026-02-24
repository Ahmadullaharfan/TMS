<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
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
            //
        'first_name'        => 'required|string|max:255',
        'last_name'         => 'required|string|max:255',
        'father_name'       => 'required|string|max:255',
        'grandfather_name'  => 'nullable|string|max:255',
        'email'             => 'required|email|unique:teachers,email',
        'phone'             => 'nullable|string|max:20',
        'date_of_birth'     => 'nullable|date',
        'gender'            => 'nullable|in:male,female',
        'specialization'    => 'nullable|string|max:255',
        'profile_photo'     => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }
}
