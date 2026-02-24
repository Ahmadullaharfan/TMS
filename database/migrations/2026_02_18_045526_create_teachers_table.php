<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('teachers', function (Blueprint $table) {
        $table->id();

        $table->string('first_name');
        $table->string('last_name');
        $table->string('father_name');
        $table->string('grandfather_name')->nullable();

        $table->string('email')->unique();
        $table->string('phone')->nullable();

        $table->date('date_of_birth')->nullable();  
        $table->enum('gender', ['male', 'female'])->nullable(); 

        $table->string('specialization')->nullable();

        $table->string('profile_photo')->nullable();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
