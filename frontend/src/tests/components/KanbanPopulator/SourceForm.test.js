import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SourceForm from "main/components/KanbanPopulator/SourceForm"

describe(SourceForm, () => {
  it("has validation errors for required fields", async () => {
    const onSubmit = jest.fn();
    await act(async () => render(<SourceForm onSubmit={onSubmit} />));

    userEvent.click(screen.getByRole("button"));

    expect(await screen.findByText(/Source Organization is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Source Repository is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Source Project Number is required/i)).toBeInTheDocument();

    expect(onSubmit).not.toBeCalled();
  });

  it("calls the onSubmit callback with valid inputs", async () => {
    const onSubmit = jest.fn();
    await act(async () => render(<SourceForm onSubmit={onSubmit} />));

    userEvent.type(screen.getByLabelText(/Source Organization/i), "Test org");
    userEvent.type(screen.getByLabelText(/Source Repository/i), "Test repo");
    userEvent.type(screen.getByLabelText(/Source Project Number/i), "9");
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(onSubmit).toBeCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      org: "Test org",
      proj: "9",
      repo: "Test repo",
    });
  });
});