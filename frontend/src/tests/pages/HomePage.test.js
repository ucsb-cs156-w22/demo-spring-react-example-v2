import { fireEvent, render, waitFor, screen, act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "main/pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("HomePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);
    axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

    const queryClient = new QueryClient();

    test("renders not logged in message when not logged in", async () => {
        axiosMock.onGet("/api/currentUser").reply(403, {});
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        await waitFor(() => expect(getByText("Not logged in. Please login to use the Kanban Populator")).toBeInTheDocument());
    });

    test("renders Source Form when logged in", async () => {
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        const { getByText } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByText("Specify Source")).toBeInTheDocument());
        await waitFor(() => expect(getByText("Specify Destination and new Kanban Board Name")).toBeInTheDocument());
    });

    test("When you fill in form and click submit, the right things happens src", async () => {
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);

        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        const { getByLabelText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByLabelText("Source Organization")).toBeInTheDocument());
        const sourceOrganizationField = getByLabelText("Source Organization");
        const sourceRepositoryField = getByLabelText("Source Repository");
        const sourceProjectNameField = getByLabelText("Source Project Number");
        const sourceButton = getByTestId("SourceForm-Submit-Button");

        fireEvent.change(sourceOrganizationField, { target: { value: 'Test source org' } })
        fireEvent.change(sourceRepositoryField, { target: { value: 'Test source repo' } })
        fireEvent.change(sourceProjectNameField, { target: { value: '9' } })
        fireEvent.click(sourceButton);

        const expectedSourceInfo = {
            org: "Test source org",
            proj: "9",
            repo: "Test source repo",
        };

        await waitFor(() => expect(consoleLogMock).toHaveBeenCalledTimes(1));
        expect(console.log.mock.calls[0][0]).toEqual(expectedSourceInfo);

        // await waitFor(() => expect(getByLabelText("Destination Organization")).toBeInTheDocument());
        // const destinationOrganizationField = getByLabelText("Destination Organization");
        // const destinationRepositoryField = getByLabelText("Destination Repository");
        // const destinationProjectNameField = getByLabelText("Destination Project Name");
        // const destinationButton = getByTestId("DestinationForm-Submit-Button");


        // fireEvent.change(destinationOrganizationField, { target: { value: 'Test destination org' } })
        // fireEvent.change(destinationRepositoryField, { target: { value: 'Test destination repo' } })
        // fireEvent.change(destinationProjectNameField, { target: { value: 'Test proj name' } })
        // fireEvent.click(destinationButton);

        // const expectedDestinationInfo = {
        //     org: "Test destination org",
        //     proj: "Test proj name",
        //     repo: "Test destination repo",
        // };

        // // await waitFor(() => expect(consoleLogMock).toHaveBeenCalledTimes(2));
        // // expect(console.log.mock.calls[0][0]).toEqual(expectedSourceInfo);
        // // expect(console.log.mock.calls[0][1]).toEqual(expectedDestinationInfo);
        // // await waitFor(() => expect(console.log).toHaveBeenCalledWith(expectedDestinationInfo));
        // // await waitFor(() => expect(consoleLogMock).toHaveBeenCalledTimes(1));
        // // expect(console.log.mock.calls[0][0]).toEqual(expectedDestinationInfo);

        consoleLogMock.mockRestore();
    });

    test("When you fill in form and click submit, the right things happens dest", async () => {
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);

        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

        // await act(async () => {
        //     render(
        //         <QueryClientProvider client={queryClient}>
        //             <MemoryRouter>
        //                 <HomePage />
        //             </MemoryRouter>
        //         </QueryClientProvider>
        //     );
        //     userEvent.type(screen.getByLabelText(/Destination Organization/), "Test org");
        //     userEvent.type(screen.getByLabelText(/Destination Repository/), "Test repo");
        //     userEvent.type(screen.getByLabelText(/Destination Project Name/), "Test proj name");
        //     userEvent.click(screen.getByText("Submit Destination"));
        // });

        const { getByText, getByLabelText, getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HomePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => expect(getByLabelText("Destination Organization")).toBeInTheDocument());
        const destinationOrganizationField = getByLabelText("Destination Organization");
        const destinationRepositoryField = getByLabelText("Destination Repository");
        const destinationProjectNameField = getByLabelText("Destination Project Name");
        const destinationButton = getByTestId("DestinationForm-Submit-Button");
        // const destinationButton = getByText("Submit Destination");


        fireEvent.change(destinationOrganizationField, { target: { value: 'Test destination org' } })
        fireEvent.change(destinationRepositoryField, { target: { value: 'Test destination repo' } })
        fireEvent.change(destinationProjectNameField, { target: { value: 'Test proj name' } })
        fireEvent.click(destinationButton);

        // expect(console.log.mock.calls[0][0]).toMatchObject({
        //     org: "Test org",
        //     proj: "Test proj name",
        //     repo: "Test repo",
        //   });

        const expectedDestinationInfo = {
            org: "Test destination org",
            proj: "Test proj name",
            repo: "Test destination repo",
        };

        // await waitFor(() => expect(consoleLogMock).toHaveBeenCalledTimes(2));
        // expect(console.log.mock.calls[0][0]).toEqual(expectedSourceInfo);
        // expect(console.log.mock.calls[0][1]).toEqual(expectedDestinationInfo);
        // await waitFor(() => expect(console.log).toHaveBeenCalledWith(expectedDestinationInfo));
        await waitFor(() => expect(consoleLogMock).toHaveBeenCalledTimes(1));
        expect(console.log.mock.calls[0][0]).toEqual(expectedDestinationInfo);

        consoleLogMock.mockRestore();
    });

});


