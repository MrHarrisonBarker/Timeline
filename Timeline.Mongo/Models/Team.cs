using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Timeline.Mongo.Models
{
    public class Team
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("Name")]
        public string Name { get; set; }
        
        [JsonIgnore] public List<ObjectId> JobIds { get; set; }
        
        [BsonIgnore]
        public List<Job> Jobs { get; set; }
    }
}