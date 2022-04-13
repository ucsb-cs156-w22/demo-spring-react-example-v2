import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function SourceRepoForm(props) {
  const { onSubmit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="org">Source Organization</Form.Label>
        <Form.Control
          id="org"
          type="text"
          isInvalid={!!errors.org}
          {...register("org", { required: "Source Organization is required" })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.org?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="repo">Source Repository</Form.Label>
        <Form.Control
          id="repo"
          type="text"
          isInvalid={!!errors.org}
          {...register("repo", { required: "Source Repository is required" })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.repo?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="proj">Source Project Number</Form.Label>
        <Form.Control
          id="proj"
          type="number"
          step="1"
          isInvalid={!!errors.proj}
          {...register("proj", { required: "Source Project Number is required" })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.proj?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" data-testid="SourceForm-Submit-Button">Submit</Button>
    </Form>
  );
}
