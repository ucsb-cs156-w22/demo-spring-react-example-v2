package edu.ucsb.cs156.example.services;

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

  public List<String> userOrganizations() {
    JsonNode result = githubApi.executeGraphQLQuery("""
      query {
        viewer {
          organizations(first: 20) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
      """);

    return
      StreamSupport.stream(result.at("/data/viewer/organizations/edges").spliterator(), false)
        .map(n -> n.at("/node/name").asText())
        .toList();
  }

  public String projectId(String owner, String repo, int projNum) {
    JsonNode result = githubApi.executeGraphQLQuery("""
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

    return result.at("/data/repository/project/id").asText();
  }
}
