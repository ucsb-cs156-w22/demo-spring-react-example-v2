import { act, render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SourceForm from "main/components/KanbanPopulator/SourceForm"

describe(SourceForm, () => {
  it("renders correctly ", async () => {
    const { getByText } = render(<SourceForm />);
    await waitFor(() => expect(getByText(/Source Organization/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/Source Repository/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/Source Project Number/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/Submit/)).toBeInTheDocument());
  });

  it("has Correct Error messsages on bad input", async () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByLabelText } = render(<SourceForm onSubmit={onSubmit} />);

    await waitFor(() => expect(getByLabelText("Source Organization")).toBeInTheDocument());
    const sourceOrganizationField = getByLabelText("Source Organization");
    const sourceRepositoryField = getByLabelText("Source Repository");
    const sourceProjectNameField = getByLabelText("Source Project Number");
    const button = getByTestId("SourceForm-Submit-Button");

    fireEvent.change(sourceOrganizationField, { target: { value: 'Test org' } })
    fireEvent.change(sourceRepositoryField, { target: { value: 'Test repo' } })
    fireEvent.change(sourceProjectNameField, { target: { value: 'ecewc' } })
    fireEvent.click(button);

    expect(onSubmit).not.toBeCalled();
  });

  it("has Correct Error messsages on missing input", async () => {
    const onSubmit = jest.fn();
    await act(async () => render(<SourceForm onSubmit={onSubmit} />));

    userEvent.click(screen.getByRole("button"));

    expect(await screen.findByText(/Source Organization is required/)).toBeInTheDocument();
    expect(await screen.findByText(/Source Repository is required/)).toBeInTheDocument();
    expect(await screen.findByText(/Source Project Number is required/)).toBeInTheDocument();

    expect(onSubmit).not.toBeCalled();
  });

  it("calls the onSubmit callback with valid inputs", async () => {
    const onSubmit = jest.fn();
    await act(async () => render(<SourceForm onSubmit={onSubmit} />));

    userEvent.type(screen.getByLabelText(/Source Organization/), "Test org");
    userEvent.type(screen.getByLabelText(/Source Repository/), "Test repo");
    userEvent.type(screen.getByLabelText(/Source Project Number/), "9");
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(onSubmit).toBeCalledTimes(1));
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      org: "Test org",
      proj: "9",
      repo: "Test repo",
    });
  });
});