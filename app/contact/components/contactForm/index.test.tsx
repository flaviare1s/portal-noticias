import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./index";

describe("ContactForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows validation errors for invalid submission", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nome *"), "Jo");
    await user.type(screen.getByLabelText("E-mail *"), "email-invalido");
    await user.type(screen.getByLabelText("Mensagem *"), "Curta demais");
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(screen.getByText(/Nome deve ter no m.nimo 3 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/E-mail inv.lido/i)).toBeInTheDocument();
    expect(screen.getByText(/Mensagem deve ter no m.nimo 20 caracteres/i)).toBeInTheDocument();
  });

  it("submits valid data, resets fields and shows success feedback", async () => {
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nome *"), "Joao Silva");
    await user.type(screen.getByLabelText("E-mail *"), "joao@example.com");
    await user.type(
      screen.getByLabelText("Mensagem *"),
      "Esta mensagem tem tamanho suficiente para passar na validacao.",
    );
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(console.log).toHaveBeenCalled();
    expect(await screen.findByText("Mensagem enviada com sucesso!")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome *")).toHaveValue("");
    expect(screen.getByLabelText("E-mail *")).toHaveValue("");
    expect(screen.getByLabelText("Mensagem *")).toHaveValue("");
  });
});
