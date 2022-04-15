package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.services.GithubService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Api(description = "Github API")
@RequestMapping("/api/gh")
@RestController
@Slf4j
public class GithubController extends ApiController {

    @Autowired
    ObjectMapper mapper;

    @Autowired
    private GithubService github;

    @ApiOperation(value = "Check if source org, repo, and project number is valid")
    @GetMapping("/checksource")
    public String checkSource(
        @ApiParam("org") @RequestParam String org,
        @ApiParam("repo") @RequestParam String repo, 
        @ApiParam("repo") @RequestParam int projNum ){

            
        // ObjectMapper objectMapper = new ObjectMapper();
        // String responseJson = objectMapper.writeValueAsString(MyObject);
        // response = {
        //     org: org,
        //     repo: repo,
        //     project: projNum,
        //     success: true
        // };
        
        return github.projectId(org, projNum);
    }
}
