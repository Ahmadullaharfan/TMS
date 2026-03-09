<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Models\Enrollment;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    /**
     * Store a newly created payment for an enrollment.
     */
    public function store(StorePaymentRequest $request, Enrollment $enrollment)
    {
        DB::transaction(function () use ($request, $enrollment): void {
            Payment::create([
                'enrollment_id' => $enrollment->id,
                'amount' => $request->validated('amount'),
                'paid_at' => $request->validated('paid_at'),
                'payment_method' => 'cash',
                'receipt_no' => $request->validated('receipt_no'),
                'note' => $request->validated('note'),
            ]);

            $enrollment->loadMissing('course');
            $enrollment->refreshFeeStatus();
        });

        return back()->with('success', 'Payment added successfully.');
    }
}

