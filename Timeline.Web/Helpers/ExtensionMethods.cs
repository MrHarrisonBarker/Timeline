using System.Collections.Generic;
using System.Linq;
using Timeline.Models;

namespace Timeline.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<User> WithoutPasswords(this IEnumerable<User> users) {
            return users.Select(x => x.WithoutPassword());
        }

        public static User WithoutPassword(this User user) {
            user.Password = null;
            return user;
        }

        public static User WithoutImages(this User user)
        {
            user.AvatarUrl = null;
            return user;
        }
        
        public static User WithoutLists(this User user)
        {
            user.Associations = null;
            user.Affiliations = null;
            return user;
        }
    }
}