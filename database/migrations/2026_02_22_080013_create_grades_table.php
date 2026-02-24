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
    Schema::create('grades', function (Blueprint $table) {
        $table->id();

        $table->foreignId('enrollment_id')
              ->constrained('enrollments')
              ->onDelete('cascade');

        $table->decimal('score', 5, 2);
        $table->string('letter_grade')->nullable();

        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
