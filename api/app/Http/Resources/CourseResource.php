<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (int) $this->id,
            'code' => $this->code,
            'name' => $this->name,
            'teacher' => $this->teacher,
            'day' => (int) $this->day,
            'period' => (int) $this->period,
            'room' => $this->room,
            'credits' => (int) $this->credits,
            'required' => (bool) $this->required,
            'tags' => $this->whenLoaded('tags', fn () => $this->tags->pluck('name')->values()->all()),
        ];
    }
}
