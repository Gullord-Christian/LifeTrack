<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Run;

class RunImportController extends Controller
{
        public function import(Request $request)
        {
            debug($request);
             if (!$request->hasFile('file')) {
                return response()->json(['error' => 'No file received'], 400);
            }

            $request->validate([
                'file' => 'required|file|mimes:csv,txt',
            ]);

            $file = $request->file('file')->getPathname();
            $handle = fopen($file, 'r');

            $header = fgetcsv($handle); // Get column names

            while (($row = fgetcsv($handle)) !== false) {
                $data = array_combine($header, $row);

                if (!$data['date'] || !$data['distance']) {
                    continue;
                }

                \App\Models\Run::create([
                    'date' => $data['date'],
                    'duration_minutes' => $data['duration_minutes'] ?? 0,
                    'duration_seconds' => $data['duration_seconds'] ?? 0,
                    'distance' => $data['distance'],
                    'avg_hr' => $data['avghr'] ?? null,
                    'notes' => $data['notes'] ?? 'CSV import',
                ]);
            }

            fclose($handle);

            return response()->json(['message' => 'Runs imported successfully!']);
        }

}
