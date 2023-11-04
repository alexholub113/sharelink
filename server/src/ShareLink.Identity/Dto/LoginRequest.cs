﻿using System.ComponentModel.DataAnnotations;

namespace ShareLink.Identity.Dto;

public class LoginRequest
{
    [Required]
    [EmailAddress]
    public required string Email { get; init; }

    [Required]
    public required string Password { get; init; }
}