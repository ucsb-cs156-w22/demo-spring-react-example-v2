package edu.ucsb.cs156.example.services;

import com.netflix.graphql.dgs.client.GraphQLResponse;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.StreamSupport;

@Service
public class GithubService {
  @Autowired
  GithubGraphQLService githubApi;

  public String projectId(String owner, String repo, int projNum) {
    GraphQLResponse result = githubApi.executeGraphQLQuery("""
      query($owner: String!, $repo: String!, $projNum: Int!){
        repository(owner: $owner, name: $repo) {
            project(number: $projNum) {
            id
            name
            }
        }
        }
      """,
      Map.of(
        "owner", owner,
        "repo", repo,
        "projNum", projNum
      ));

    // System.out.println("hi");
    
    return result.extractValue("repository.project.id");
  }
}
