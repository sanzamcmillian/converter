import { useState } from "react";
import {
  AppLayout,
  Container,
  Header,
  Form,
  FormField,
  Input,
  Button,
  SpaceBetween,
  Alert
} from "@cloudscape-design/components";

function App() {
  const [word, setWord] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [wordError, setWordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    let valid = true;

    // Word validation
    if (!word.trim()) {
      setWordError("Word is required.");
      valid = false;
    } else {
      setWordError("");
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setError(null);
    setResult("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://converter-api-1t50.onrender.com/webhook/sort-word",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: word })
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setResult(data.word.join(""));
    } catch (err) {
      setError("Unable to connect to API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout
      content={
        <Container
          header={<Header variant="h1">Word Sorter</Header>}
        >
          <SpaceBetween size="l">
            <Form
              actions={
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Sorted Word
                </Button>
              }
            >
              <SpaceBetween size="m">
                <FormField
                  label="Word"
                  errorText={wordError}
                >
                  <Input
                    value={word}
                    onChange={({ detail }) => setWord(detail.value)}
                    placeholder="e.g. banana"
                  />
                </FormField>

                <FormField
                  label="Email"
                  errorText={emailError}
                >
                  <Input
                    value={email}
                    onChange={({ detail }) => setEmail(detail.value)}
                    placeholder="e.g. john@email.com"
                  />
                </FormField>
              </SpaceBetween>
            </Form>

            {result && (
              <Alert type="success">
                Sorted Result: <strong>{result}</strong>
              </Alert>
            )}

            {error && (
              <Alert type="error">
                {error}
              </Alert>
            )}
          </SpaceBetween>
        </Container>
      }
      navigationHide
      toolsHide
    />
  );
}

export default App;