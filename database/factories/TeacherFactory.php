<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'first_name' => $this->faker->firstName,
        'last_name' => $this->faker->lastName,
        'father_name' => $this->faker->firstName,
        'grandfather_name' => $this->faker->firstName,
        'email' => $this->faker->unique()->safeEmail,
        'phone' => $this->faker->phoneNumber,
        'date_of_birth' => $this->faker->date('Y-m-d'),
        'gender' => $this->faker->randomElement(['male', 'female']),
        'specialization' => $this->faker->word,
        'profile_photo' => null, // or a fake path if needed
    ];
    }
}
