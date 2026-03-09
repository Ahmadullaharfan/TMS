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
    Schema::create('courses', function (Blueprint $table) {
        $table->id();

        $table->string('title');
        $table->text('description')->nullable();
        
        $table->decimal('course_fee', 10, 2)->default(0)->after('teacher_id');


        $table->foreignId('teacher_id')
              ->constrained('teachers')
              ->onDelete('cascade');

        $table->date('start_date')->nullable();
        $table->date('end_date')->nullable();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
