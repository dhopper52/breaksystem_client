import Button from "react-bootstrap/Button";

export const CancelButton = ({ onClick, children }) => {
  return (
    <Button
      className="color-theme border-0 Cancel-button btn btn-primary Cancel-button-smallModal ms-2"
      type="button"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const SubmitButton = ({ onClick, children }) => {
  return (
    <Button
      className="color-theme border-0 Create-Account-button btn btn-primary update-button update-button-smallModal"
      type="submit"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
