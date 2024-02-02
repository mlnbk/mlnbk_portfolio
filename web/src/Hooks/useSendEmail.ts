import { useState } from 'react';

type Inputs = {
  name: string;
  email: string;
  message: string;
};

export const useSendEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const sendEmail = async (data: Inputs) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(
            'One contact request is allowed per minute for security reasons. Please try again in a minute.',
          );
        }
        throw new Error(
          'Failed to submit contact email. Please try again or check out my LinkedIn or Github.',
        );
      }
      return 'Email sent successfully. You will be contacted soon.';
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, error };
};
