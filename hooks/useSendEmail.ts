/* eslint-disable @typescript-eslint/no-explicit-any */
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) as { error?: string };
        const errorMessage =
          errorData.error ||
          (response.status === 429
            ? 'One contact request is allowed per minute for security reasons. Please try again in a minute.'
            : 'Failed to submit contact email. Please try again or check out my LinkedIn or Github.');
        throw new Error(errorMessage);
      }
      const responseData = await response.json() as { message?: string };
      return responseData.message || 'Email sent successfully. You will be contacted soon.';
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading, error };
};
