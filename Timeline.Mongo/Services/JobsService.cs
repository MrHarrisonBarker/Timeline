using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using Timeline.Mongo.Models;

namespace Timeline.Mongo.Services
{
    public class JobsService
    {
        private readonly IMongoCollection<Job> _jobs;

        public JobsService(ITimelineDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _jobs = database.GetCollection<Job>(settings.JobsCollectionName);
        }

        public List<Job> GetJobList(List<ObjectId> jobIds)
        {

            var id = "asdaksdjkasd";
            var filterBuilder = Builders<Job>.Filter;
            // var filter = filterBuilder.In(x => x.Id, jobIds);
            
            FilterDefinition<Job> inJobList = Builders<Job>.Filter.In(x => x.Id, jobIds);
            // jobIds.FindIndex(x => new ObjectId(job.Id).Equals(x)) != -1
            return _jobs.Find(inJobList).ToList();
        }

        public List<Job> Get() =>
            _jobs.Find(job => true).ToList();

        public Job Get(string id) =>
            _jobs.Find<Job>(job => job.Id.Equals(new ObjectId(id))).FirstOrDefault();

        public Job Create(Job job)
        {
            _jobs.InsertOne(job);
            return job;
        }

        // public void Update(string id, Job jobIn) =>
        //     _jobs.ReplaceOne(job => job.Id == id, jobIn);
        //
        // public void Remove(Job jobIn) =>
        //     _jobs.DeleteOne(job => job.Id == jobIn.Id);
        //
        // public void Remove(string id) =>
        //     _jobs.DeleteOne(job => job.Id == id);
    }
}