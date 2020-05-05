using System.ComponentModel.DataAnnotations;

namespace Timeline.Models
{
    public class Authenticate
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}