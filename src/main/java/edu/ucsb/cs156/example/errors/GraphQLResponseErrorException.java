package edu.ucsb.cs156.example.errors;

import com.netflix.graphql.dgs.client.GraphQLError;
import com.netflix.graphql.dgs.client.GraphQLResponse;
import lombok.Getter;

import java.util.stream.Collectors;

public class GraphQLResponseErrorException extends RuntimeException {
  @Getter
  private GraphQLResponse response;

  public GraphQLResponseErrorException(GraphQLResponse response) {
    super("GraphQL errors: %s"
      .formatted(
        response.getErrors().stream()
          .map(GraphQLError::getMessage)
          .collect(Collectors.joining("\n"))
      )
    );

    this.response = response;
  }
}
