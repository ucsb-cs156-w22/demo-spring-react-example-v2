package edu.ucsb.cs156.example.entities;

import lombok.*;


import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "todos")
public class Todo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  // This establishes that many todos can belong to one user
  // Only the user_id is stored in the table, and through it we
  // can access the user's details

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
  private String title;
  private String details;
  private boolean done;
}
