import { render, waitFor } from "@testing-library/react";
import Footer from "main/components/Nav/Footer";

describe("Footer tests", () => {
    test("renders correctly ", async () => {
        const { getByText } = render(
            <Footer />
        );
        await waitFor(() => expect(getByText("This is a Github Kanban Populator app using React with a Spring Boot backend. Developed by https://github.com/brownfield-team.")).toBeInTheDocument());
    });
});


