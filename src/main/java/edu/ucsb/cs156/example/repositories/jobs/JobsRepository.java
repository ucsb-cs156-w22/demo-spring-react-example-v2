package edu.ucsb.cs156.example.repositories.jobs;

import edu.ucsb.cs156.example.entities.jobs.Job;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobsRepository extends CrudRepository<Job, Long> {
}
