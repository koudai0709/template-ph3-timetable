<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CourseController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $validated = $request->validate([
            'day' => ['nullable', 'integer', 'between:1,5'],
        ]);

        $day = $validated['day'] ?? null;
        $query = Course::query();

        if ($day !== null) {
            $query->where('day', (int) $day);
        }

        $courses = $query->orderBy('day')->orderBy('period')->orderBy('id')->get();

        return CourseResource::collection($courses);
    }

    public function show(Course $course): CourseResource
    {
        $course->load('tags');

        return new CourseResource($course);
    }
}
