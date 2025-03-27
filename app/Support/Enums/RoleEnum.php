<?php

namespace App\Support\Enums;

use App\Traits\Enums\Arrayable;

enum RoleEnum: string {
    use Arrayable;

    case SUPER_ADMIN = 'super_admin'; 
}
