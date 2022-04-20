package edu.ucsb.cs156.example.services;

import com.netflix.graphql.dgs.client.GraphQLResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.junit.jupiter.api.Test;

import edu.ucsb.cs156.example.ControllerTestCase;

import java.util.Map;

class GithubGraphQLServiceTests extends ControllerTestCase {

//   @MockBean
//   GithubGraphQLService mockGithubApi;

//   @Test
//   void test_projectId_returns_id() {
//     GithubService githubService = mock(GithubService.class);
//     when(mockGithubApi.executeGraphQLQuery("""
//         query($owner: String!, $repo: String!, $projNum: Int!){
//             repository(owner: $owner, name: $repo) {
//                 project(number: $projNum) {
//                 id
//                 name
//                 }
//             }
//             }
//           """,
//           Map.of(
//             "owner", owner,
//             "repo", repo,
//             "projNum", projNum
//           )))
//         .thenReturn("""{
//             'repository' : {
//                 'project' : {
//                     'id' : 'PRO_kwLOG0U47s4A11-W',
//                     'name' : 'W22 Play Page'
//                 }
//             }}""");
//     assertEquals(githubService.projectId(), "PRO_kwLOG0U47s4A11-W");
//   }

  // @Test
  // void test_projectId_returns_empty() {

  //   GithubGraphQLService githubGraphQLService = mock(GithubGraphQLService.class);
  //   GraphQLResponse gqlResponse = new GraphQLResponse("""
  //       {
  //           "repository" : {
  //               "project" : {
  //                   "id" : "",
  //                   "name" : ""
  //               }
  //           }
  //       }
  //       """);
  //   when(executeGraphQLQuery("""
  //       query($owner: String!, $repo: String!, $projNum: Int!){
  //           repository(owner: $owner, name: $repo) {
  //               project(number: $projNum) {
  //               id
  //               name
  //               }
  //           }
  //           }
  //         """,
  //         Map.of(
  //           "owner", "ucsb-cs156-w22",
  //           "repo", "HappierCows",
  //           "projNum", 1
  //         )))
  //       .thenReturn(gqlResponse);
  //   assertEquals(githubGraphQLService.projectId("ucsb-cs156-w22", "HappierCows", 1), "");
  // }

}
